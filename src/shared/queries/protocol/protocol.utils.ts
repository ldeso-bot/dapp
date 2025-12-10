import {
  PROTOCOL_DATA_CACHE_TIME_SECONDS,
  USE_LOCAL_GRAPH_NODE,
} from '@/shared/constants/config.constants';
import { DAYS_IN_YEAR } from '@/shared/constants/protocol.constants';
import { Token, tokens } from '@/shared/constants/tokens.constants';
import { YieldRate, YieldRates, YieldType } from '@/shared/models/ProtocolData';
import { formatStringToNumber, Sdk } from '@/shared/utils/subgraph.utils';
import {
  GetLatestMidnightInfoQuery,
  Maturity_Filter,
} from '@generated/gql/types/protocol.types';
import { unstable_cache } from 'next/cache';
import { mapToObj } from 'remeda';
import { getMockMaturationTimestamp, getMockYieldPercent } from './mocks';

export const tokensEligibleForIncentives: Record<YieldType, Token[]> = {
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
 * Gets the protocol state from the subgraph
 * @param sdk
 * @returns
 */
export const getProtocolState = async (sdk: Sdk) => {
  return unstable_cache(
    async () => {
      const protocolStates = await sdk.protocol.getProtocolState();
      const protocolState = protocolStates.protocolStates[0];
      if (!protocolState) {
        console.error('❌ Maturity manager not found');
        return null;
      }
      return protocolState;
    },
    ['maturity-manager'],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )();
};

export type ProtocolState = NonNullable<
  Awaited<ReturnType<typeof getProtocolState>>
>;

const getActiveMaturities = async (sdk: Sdk) => {
  return unstable_cache(
    async () => {
      const maturityManager = await getProtocolState(sdk);
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
    const yieldPercent = formatStringToNumber(zeroCouponYieldCurve, 18);

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

export const getHoursSinceEpoch24HoursAgo = () => {
  let hoursSinceEpoch = Math.floor(Date.now() / 1000 / 3600);

  // Local graph node does not have previous data (but mey has future data thanks to time travel)
  if (!USE_LOCAL_GRAPH_NODE) {
    hoursSinceEpoch = hoursSinceEpoch - 24;
  }
  return hoursSinceEpoch;
};

type MidnightInfo = GetLatestMidnightInfoQuery['midnightInfos'][number];

export const formatMidnightInfo = (
  midnightInfo: MidnightInfo | NonNullable<MidnightInfo['previousMidnightInfo']>
) => {
  return {
    midnightIndex: Number(midnightInfo.midnightIndex),
    maturityId: Number(midnightInfo.maturityId),
    lastUpdated: Number(midnightInfo.lastUpdated),

    k2YieldAccumulatorForK2: formatStringToNumber(
      midnightInfo.k2YieldAccumulatorForK2,
      18
    ),
    k2YieldAccumulatorForKVCM_K2_LP: formatStringToNumber(
      midnightInfo.k2YieldAccumulatorForKVCM_K2_LP,
      18
    ),
    k2YieldAccumulatorForKVCM: formatStringToNumber(
      midnightInfo.k2YieldAccumulatorForKVCM,
      18
    ),

    riskyYieldAccumulatorForKVCM_K2_LP: formatStringToNumber(
      midnightInfo.riskyYieldAccumulatorForKVCM_K2_LP,
      18
    ),
    riskyYieldAccumulatorForKVCM_USDC_LP: formatStringToNumber(
      midnightInfo.riskyYieldAccumulatorForKVCM_USDC_LP,
      18
    ),
    riskyYieldAccumulatorForK2: formatStringToNumber(
      midnightInfo.riskyYieldAccumulatorForK2,
      18
    ),
    syntheticYieldPps: formatStringToNumber(midnightInfo.syntheticYieldPps, 18),
    syntheticYieldTotalShares: formatStringToNumber(
      midnightInfo.syntheticYieldTotalShares,
      18
    ),
  };
};

type FormattedMidnightInfo = ReturnType<typeof formatMidnightInfo>;

type ComputedMidnightInfo = FormattedMidnightInfo & {
  k2Apy: number;
  riskyYieldApy: number;
  syntheticYieldApy: number;
  k2py: number;
  riskyYieldPy: number;
  syntheticYieldPy: number;
};

/**
 * Map the the new midnight info by formatting data and calculating APYs
 * @param newRawMidnightInfo - The new midnight info
 * @param oldRawMidnightInfo - The old midnight info
 * @returns
 */
export const computeMidnightInfo = (
  midnightInfo: FormattedMidnightInfo,
  oldMidnightInfo: FormattedMidnightInfo | undefined
) => {
  // TODO: Can someone check the maths?
  // Percentage yield independant of time between midnights
  let k2Py = 0;
  let riskyYieldPy = 0;
  let syntheticYieldPy = 0;
  // Yearly Percentage yield
  let k2Apy = 0;
  let riskyYieldApy = 0;
  let syntheticYieldApy = 0;

  if (oldMidnightInfo) {
    const daysBetweenMidnights =
      midnightInfo.midnightIndex - oldMidnightInfo.midnightIndex;

    if (oldMidnightInfo.k2YieldAccumulatorForK2 > 0) {
      k2Py =
        (midnightInfo.k2YieldAccumulatorForK2 -
          oldMidnightInfo.k2YieldAccumulatorForK2) /
        oldMidnightInfo.k2YieldAccumulatorForK2;
    }

    if (oldMidnightInfo.riskyYieldAccumulatorForK2 > 0) {
      riskyYieldPy =
        (midnightInfo.riskyYieldAccumulatorForK2 -
          oldMidnightInfo.riskyYieldAccumulatorForK2) /
        oldMidnightInfo.riskyYieldAccumulatorForK2;
    }

    if (oldMidnightInfo.syntheticYieldPps > 0) {
      syntheticYieldPy =
        (midnightInfo.syntheticYieldPps - oldMidnightInfo.syntheticYieldPps) /
        oldMidnightInfo.syntheticYieldPps;
    }

    // Daily percentage yield
    const syntheticYieldDpy = syntheticYieldPy / daysBetweenMidnights;
    const riskyYieldDpy = riskyYieldPy / daysBetweenMidnights;
    const k2Dpy = k2Py / daysBetweenMidnights;

    // K2 and risky yield does not compound
    k2Apy = k2Dpy * DAYS_IN_YEAR;
    riskyYieldApy = riskyYieldDpy * DAYS_IN_YEAR;

    // Sinthetic yield compounds daily
    syntheticYieldApy = Math.pow(1 + syntheticYieldDpy, DAYS_IN_YEAR) - 1;
  }

  return {
    ...midnightInfo,
    k2Apy,
    riskyYieldApy,
    syntheticYieldApy,
    k2py: k2Py,
    riskyYieldPy,
    syntheticYieldPy,
  };
};

export const getLatestMidnightInfos = async (
  sdk: Sdk
): Promise<Record<string, ComputedMidnightInfo>> => {
  return unstable_cache(
    async () => {
      const midnightInfos = (await sdk.protocol.getLatestMidnightInfo())
        .midnightInfos;
      if (!midnightInfos) return {};
      const midnightIndex = midnightInfos[0].midnightIndex;
      return mapToObj(
        // Ensure that we only return midnightInfo for the same mmidnightIndex
        midnightInfos
          .filter(
            (midnightInfo) => midnightInfo.midnightIndex === midnightIndex
            // Map so it can be serialized
          )
          .map((midnightInfo) =>
            computeMidnightInfo(
              formatMidnightInfo(midnightInfo),
              midnightInfo.previousMidnightInfo
                ? formatMidnightInfo(midnightInfo.previousMidnightInfo)
                : undefined
            )
          ),
        // Map by maturityId for faster lookups
        (midnightInfo) => [midnightInfo.maturityId, midnightInfo]
      );
    },
    ['latest-midnight-infos-for-active-maturities'],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )();
};
