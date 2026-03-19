// TODO: rename this file
import { PROTOCOL_DATA_CACHE_TIME_SECONDS } from '@/shared/constants/config.constants';
import { DAYS_IN_YEAR } from '@/shared/constants/protocol.constants';
import { LockableToken } from '@/shared/constants/tokens.constants';
import { Maturity, MaturityId, Yield } from '@/shared/models/ProtocolData';
import { cached } from '@/shared/utils/cache.utils';
import {
  BetaLambdas,
  CarbonClassesInformation,
  computeK2IncentivesDistribution,
  computeKvcmProtocolDistribution,
  computeSyntheticYieldDistribution,
  MaturitiesBaseInformation,
  PoolStats,
} from '@/shared/utils/liveAprMaths.utils';
import { computeTokenAmountValueUSD } from '@/shared/utils/protocol.utils';
import { formatStringToNumber, Sdk } from '@/shared/utils/subgraph.utils';
import { getContract, getPublicClient } from '@/shared/utils/web3.utils';
import Decimal from 'decimal.js';
import { getTokenMetrics } from './getTokenMetrics';
import {
  getActiveMaturities,
  getProtocolState,
  getSdkCarbonClasses,
} from './protocol.utils';

interface ContractYieldCurvePoint {
  maturityId: bigint;
  discountFactor: bigint;
  zeroCouponYield: bigint;
  yieldForCurrentInterval: bigint;
  deltaForCurrentPeriod: bigint;
  totalKvcmLockedForBucket: bigint;
}

interface FinalizationValues {
  finalGG: bigint;
  finalG: bigint;
  finalQ: bigint;
}

const getMaturityInformationUncached = async (
  sdk: Sdk
): Promise<MaturitiesBaseInformation> => {
  const publicClient = getPublicClient(sdk.chain);
  const contract = getContract(sdk.chain, 'RewardManagerDiamond', publicClient);

  if (!contract.read.getFullCurveValues) {
    throw new Error('getFullCurveValues function not found on contract');
  }

  const [maturities, [yieldCurve]] = await Promise.all([
    getActiveMaturities(sdk),
    contract.read.getFullCurveValues() as Promise<
      [readonly ContractYieldCurvePoint[], bigint, bigint, bigint]
    >,
  ]);

  const kvcmLockedMap: Record<number, Decimal> = {};
  yieldCurve.forEach((point) => {
    kvcmLockedMap[Number(point.maturityId)] = new Decimal(
      formatStringToNumber(point.totalKvcmLockedForBucket, 18)
    );
  });

  const maturityInformation: MaturitiesBaseInformation = {};
  maturities.forEach((maturity) => {
    const maturityId = Number(maturity.maturityId);
    maturityInformation[maturityId] = {
      maturityId: maturityId,
      maturationTimestamp: Number(maturity.timestamp),
      kvcmLocked: kvcmLockedMap[maturityId] ?? new Decimal(0),
      kvcmUsdcLPLocked: new Decimal(
        formatStringToNumber(maturity.kvcmUsdcLockedAmount, 18)
      ),
      kvcmK2LPLocked: new Decimal(
        formatStringToNumber(maturity.kvcmK2LockedAmount, 18)
      ),
    };
  });
  return maturityInformation;
};

const getMaturityInformation = async (
  sdk: Sdk
): Promise<MaturitiesBaseInformation> => {
  return cached(
    async () => await getMaturityInformationUncached(sdk),
    ['maturity-information', sdk.chain],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )();
};

const getBetaLambdasUncached = async (sdk: Sdk): Promise<BetaLambdas> => {
  const protocolState = await getProtocolState(sdk);
  if (!protocolState) {
    console.error('❌ Protocol state not found while fetching final lambdas');
  } else if (!protocolState.midnightIndex) {
    console.error('❌ Unexpected protocol state while fetching final lambdas');
  }
  const midnightIndex = protocolState!.midnightIndex!;

  const publicClient = getPublicClient(sdk.chain);
  const contract = getContract(sdk.chain, 'RewardManagerDiamond', publicClient);

  if (!contract.read.computeFinalizedLambdas) {
    throw new Error('computeFinalizedLambdas function not found on contract');
  }

  const { finalGG, finalG, finalQ } =
    await (contract.read.computeFinalizedLambdas([
      midnightIndex + 1,
    ]) as Promise<FinalizationValues>);

  const betaLambdaCache: BetaLambdas = {
    betaLambdaGG: new Decimal(formatStringToNumber(finalGG, 9)),
    betaLambdaG: new Decimal(formatStringToNumber(finalG, 9)),
    betaLambdaQ: new Decimal(formatStringToNumber(finalQ, 9)),
  };

  return betaLambdaCache;
};

const getBetaLambdas = async (sdk: Sdk): Promise<BetaLambdas> => {
  return cached(
    async () => await getBetaLambdasUncached(sdk),
    ['beta-lambdas', sdk.chain],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )();
};

export type ExtraLockInfo = {
  token: LockableToken;
  maturityId: MaturityId;
  amount: Decimal;
};

export const getActiveMaturitiesWithDistribution = async (
  sdk: Sdk,
  extraLockInfo?: ExtraLockInfo
): Promise<Record<MaturityId, Maturity>> => {
  // Fetch metrics
  const [
    maturitiesInformation,
    tokenMetrics,
    protocolState,
    carbonClasses,
    betaLambdas,
  ] = await Promise.all([
    getMaturityInformation(sdk),
    getTokenMetrics(sdk.chain),
    getProtocolState(sdk),
    getSdkCarbonClasses(sdk),
    getBetaLambdas(sdk),
  ]);

  const maturitiesMap: Record<MaturityId, Maturity> = {};

  if (!protocolState) {
    console.error(
      '❌ Protocol state not found while computing maturities APYs'
    );
    return maturitiesMap;
  }

  // Prepare metrics

  const poolStats: PoolStats = {
    kvcmInKvcmUsdcPool: new Decimal(tokenMetrics['kvcm-usdc'].kvcmLocked),
    kvcmInKvcmK2Pool: new Decimal(tokenMetrics['kvcm-k2'].kvcmLocked),
    k2InKvcmK2Pool: new Decimal(tokenMetrics['kvcm-k2'].k2Locked),
    totalKvcmK2LP: new Decimal(tokenMetrics['kvcm-k2'].supply),
    totalKvcmUsdcLP: new Decimal(tokenMetrics['kvcm-usdc'].supply),
  };

  const carbonClassesInformation: CarbonClassesInformation = carbonClasses.map(
    (carbonClass) => ({
      carbonClassId: carbonClass.id,
      k2Allocated: new Decimal(
        formatStringToNumber(carbonClass.k2Allocated, 18)
      ),
      kvcmAllocated: new Decimal(
        formatStringToNumber(carbonClass.kvcmAllocated, 18)
      ),
    })
  );

  const midnightIndex = protocolState?.midnightIndex ?? 0;

  const kvcmSupply = Decimal(tokenMetrics.kvcm.supply);
  const k2Supply = Decimal(tokenMetrics.k2.supply);
  let k2Locked = Decimal(tokenMetrics.k2.supplyLocked);

  // If extra lock info is provided, update metrics accordingly
  if (extraLockInfo) {
    const targetedMaturityInformation =
      maturitiesInformation[extraLockInfo.maturityId];
    const { token, amount } = extraLockInfo;
    if (targetedMaturityInformation) {
      if (token == 'kvcm') {
        targetedMaturityInformation.kvcmLocked =
          targetedMaturityInformation.kvcmLocked.plus(amount);
      } else if (token == 'kvcm-usdc') {
        targetedMaturityInformation.kvcmUsdcLPLocked =
          targetedMaturityInformation.kvcmUsdcLPLocked.plus(amount);
      } else if (token == 'kvcm-k2') {
        targetedMaturityInformation.kvcmK2LPLocked =
          targetedMaturityInformation.kvcmK2LPLocked.plus(amount);
      }
    }
    if (token == 'k2') {
      k2Locked = k2Locked.plus(amount);
    }
  }

  const tokenValues = {
    kvcm: new Decimal(computeTokenAmountValueUSD('kvcm', 1, tokenMetrics)),
    k2: new Decimal(computeTokenAmountValueUSD('k2', 1, tokenMetrics)),
    'kvcm-k2': new Decimal(
      computeTokenAmountValueUSD('kvcm-k2', 1, tokenMetrics)
    ),
    'kvcm-usdc': new Decimal(
      computeTokenAmountValueUSD('kvcm-usdc', 1, tokenMetrics)
    ),
  };

  const syntheticYieldDistribution = computeSyntheticYieldDistribution({
    kvcmSupply,
    maturitiesInformation: maturitiesInformation,
    midnightIndex,
  });

  const kvcmProtocolDistribution = computeKvcmProtocolDistribution({
    kvcmSupply,
    k2Locked,
    maturitiesInformation: maturitiesInformation,
    midnightIndex,
    betaLambdas,
  });

  const k2IncentivesDistribution = computeK2IncentivesDistribution({
    kvcmSupply,
    k2Supply,
    k2Locked,
    maturitiesInformation: maturitiesInformation,
    poolStats,
    midnightIndex,
    carbonClassesInformation,
  });

  // Assign maturities to the map
  for (
    let i = protocolState.firstActiveMaturityId;
    i <= protocolState.lastActiveMaturityId;
    i++
  ) {
    const k2Incentives = k2IncentivesDistribution[i];
    const kvcmIncentives = kvcmProtocolDistribution[i];
    const syntheticYield = syntheticYieldDistribution[i];

    const maturityInformation = maturitiesInformation[i];
    if (!maturityInformation) {
      console.error(`❌ Maturity information not found for maturity id ${i}`);
      continue;
    }

    /**
     * Utility function to format the distribution metrics for a given lock token
     * @param lockToken
     * @returns
     */
    const formatDistributionMetrics = (lockToken: LockableToken): Yield => {
      if (!syntheticYield || !k2Incentives || !kvcmIncentives) {
        return {
          kvcmApy: 0,
          k2Apy: 0,
          kvcmEquivalentLocked: 0,
          k2EquivalentLocked: 0,
          k2Distributed: 0,
          kvcmDistributed: 0,
        };
      }

      // K2 yield computation
      const k2EquivalentLocked = k2Incentives[lockToken].tokensLockedForBucket
        .mul(tokenValues[lockToken])
        .div(tokenValues.k2);

      const k2Apy = k2Incentives[lockToken].tokensDistributed
        .div(k2EquivalentLocked)
        .mul(DAYS_IN_YEAR);
      const k2Distributed = k2Incentives[lockToken].tokensDistributed;

      // KVCM yield computation
      let kvcmApy = new Decimal(0);
      let kvcmDistributed = new Decimal(0);

      let kvcmEquivalentLocked = new Decimal(0);

      if (lockToken == 'kvcm') {
        // Synthetic yield computation
        kvcmEquivalentLocked = syntheticYield.kvcm.tokensLockedForBucket;
        const dailyApr =
          syntheticYield.kvcm.tokensDistributed.div(kvcmEquivalentLocked);
        kvcmApy = Decimal.pow(dailyApr.plus(1), DAYS_IN_YEAR).minus(1);
        kvcmDistributed = syntheticYield.kvcm.tokensDistributed;
      } else {
        // Protocol incentives yield computation
        kvcmEquivalentLocked = kvcmIncentives[lockToken].tokensLockedForBucket
          .mul(tokenValues[lockToken])
          .div(tokenValues.kvcm);

        kvcmApy = kvcmIncentives[lockToken].tokensDistributed
          .div(kvcmEquivalentLocked)
          .mul(DAYS_IN_YEAR);
        kvcmDistributed = kvcmIncentives[lockToken].tokensDistributed;
      }

      return {
        kvcmApy: kvcmApy.toNumber(),
        k2Apy: k2Apy.toNumber(),
        kvcmEquivalentLocked: kvcmEquivalentLocked.toNumber(),
        k2EquivalentLocked: k2EquivalentLocked.toNumber(),
        k2Distributed: k2Distributed.toNumber(),
        kvcmDistributed: kvcmDistributed.toNumber(),
      };
    };

    maturitiesMap[i] = {
      maturationTimestamp: maturityInformation.maturationTimestamp,
      maturityId: maturityInformation.maturityId,
      kvcmUsdcLPLocked: maturityInformation.kvcmUsdcLPLocked.toNumber(),
      kvcmK2LPLocked: maturityInformation.kvcmK2LPLocked.toNumber(),
      kvcmLocked: maturityInformation.kvcmLocked.toNumber(),
      apys: {
        kvcm: formatDistributionMetrics('kvcm'),
        k2: formatDistributionMetrics('k2'),
        'kvcm-k2': formatDistributionMetrics('kvcm-k2'),
        'kvcm-usdc': formatDistributionMetrics('kvcm-usdc'),
      },
    } satisfies Maturity;
  }

  return maturitiesMap;
};
