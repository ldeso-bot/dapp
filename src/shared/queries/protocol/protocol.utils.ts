import { PROTOCOL_DATA_CACHE_TIME_SECONDS } from '@/shared/constants/config.constants';
import { Token, tokens } from '@/shared/constants/tokens.constants';
import { YieldRate, YieldRates, YieldType } from '@/shared/models/ProtocolData';
import { Sdk } from '@/shared/utils/subgraph.utils';
import { Maturity_Filter } from '@generated/gql/types/protocol.types';
import { unstable_cache } from 'next/cache';
import { formatUnits } from 'viem';
import { getMockMaturationTimestamp, getMockYieldPercent } from './mocks';

const tokensEligibleForIncentives: Record<YieldType, Token[]> = {
  [YieldType.K2]: [tokens.k2.id, tokens.kvcm.id, tokens['kvcm-k2'].id],
  [YieldType.RISKY]: [
    tokens.k2.id,
    tokens['kvcm-usdc'].id,
    tokens['kvcm-k2'].id,
  ],
  [YieldType.SYNTHETIC]: [tokens.kvcm.id],
};

/**
 *
 * Gets the maturity manager from the subgraph
 * @param sdk
 * @returns
 */
const getMaturityManager = async (sdk: Sdk) => {
  return unstable_cache(
    async () => {
      const maturityManagers = await sdk.protocol.getMaturityManager();
      const maturityManager = maturityManagers.maturityManagers[0];
      if (!maturityManager) {
        console.error('❌ Maturity manager not found');
        return null;
      }
      return maturityManager;
    },
    ['maturity-manager'],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )();
};

const getActiveMaturities = async (sdk: Sdk) => {
  return unstable_cache(
    async () => {
      const maturityManager = await getMaturityManager(sdk);
      if (!maturityManager) return [];
      const maturities = await sdk.protocol.getMaturities({
        where: {
          maturityId_gte: maturityManager.firstActiveMaturityId,
          maturityId_lte: maturityManager.lastActiveMaturityId,
        } as Maturity_Filter,
      });
      return maturities.maturities;
    },
    ['active-maturities'],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )();
};

/**
 *
 * Gets active yield buckets from the subgraph
 * @param sdk
 * @param bucketId
 * @returns
 */
export const getYieldRates = async (sdk: Sdk, yieldType: YieldType) => {
  const maturities = await getActiveMaturities(sdk);

  return maturities.map((maturity, index): YieldRate => {
    let zeroCouponYieldCurve = '0';

    if (yieldType === YieldType.K2) {
      zeroCouponYieldCurve = maturity.SyntheticYieldZeroCouponYieldCurve;
    } else if (yieldType === YieldType.RISKY) {
      zeroCouponYieldCurve = maturity.RiskyYieldZeroCouponYieldCurve;
    } else if (yieldType === YieldType.SYNTHETIC) {
      zeroCouponYieldCurve = maturity.SyntheticYieldZeroCouponYieldCurve;
    }
    const yieldPercent = Number(formatUnits(BigInt(zeroCouponYieldCurve), 18));

    return {
      index,
      tokens: tokensEligibleForIncentives[yieldType],
      yieldPercent,
      maturityId: maturity.maturityId.toString(),
      maturationTimestamp: Number(maturity.timestamp),
    };
  });
};

/**
 * Returns mock yield rates for a given bucket ID
 * @param bucketId
 * @returns
 */
export const getMockLockedVcmYieldRates = async (
  yieldType: YieldType
): Promise<YieldRates> => {
  const yieldRates: YieldRates = [];
  for (let i = 0; i < 40; i++) {
    yieldRates.push({
      tokens: tokensEligibleForIncentives[yieldType],
      index: i,
      maturityId: `maturity-${i}`,
      maturationTimestamp: getMockMaturationTimestamp(i),
      yieldPercent: getMockYieldPercent(i),
    });
  }
  return yieldRates;
};
