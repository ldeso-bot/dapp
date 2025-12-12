import { PROTOCOL_DATA_CACHE_TIME_SECONDS } from '@/shared/constants/config.constants';
import { DAYS_IN_YEAR } from '@/shared/constants/protocol.constants';
import { ApyInfo, ApyMidnightInfo } from '@/shared/models/ProtocolData';
import { formatStringToNumber, Sdk } from '@/shared/utils/subgraph.utils';
import { GetLatestMidnightInfoQuery } from '@generated/gql/types/protocol.types';
import { unstable_cache } from 'next/cache';
import { mapToObj } from 'remeda';

type MidnightInfo = GetLatestMidnightInfoQuery['midnightInfos'][number];

const percentageIncrease = (newValue: number, oldValue: number) =>
  oldValue > 0 ? (newValue - oldValue) / oldValue : 0;

const dailyPercentageIncrease = (
  newValue: number,
  oldValue: number,
  daysBetweenMidnights: number
) => percentageIncrease(newValue, oldValue) / daysBetweenMidnights;

export const nonCompoundedApr = (
  newValue: number,
  oldValue: number,
  daysBetweenMidnights: number
) =>
  dailyPercentageIncrease(newValue, oldValue, daysBetweenMidnights) *
  DAYS_IN_YEAR;

const compoundedApr = (
  newValue: number,
  oldValue: number,
  daysBetweenMidnights: number
) =>
  Math.pow(
    1 + dailyPercentageIncrease(newValue, oldValue, daysBetweenMidnights),
    DAYS_IN_YEAR
  ) - 1;

/**
 * Format the midnight info from the subgraph data to a more usable format
 * @param midnightInfo
 * @returns
 */
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

export type ComputedMidnightInfo = FormattedMidnightInfo &
  ApyMidnightInfo & { oldMidnightInfo: FormattedMidnightInfo | undefined };

const EMPTY_APY_INFO: ApyInfo = {
  kvcm: 0,
  k2: 0,
  'kvcm-k2': 0,
  'kvcm-usdc': 0,
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
  // Yearly Percentage yield
  const k2ApyFor = { ...EMPTY_APY_INFO };
  const kvcmApyFor = { ...EMPTY_APY_INFO };
  const k2PyFor = { ...EMPTY_APY_INFO };
  const kvcmPyFor = { ...EMPTY_APY_INFO };

  if (oldMidnightInfo) {
    const daysBetweenMidnights =
      midnightInfo.midnightIndex - oldMidnightInfo.midnightIndex;

    // APY
    // K2 APY
    k2ApyFor.k2 = nonCompoundedApr(
      midnightInfo.k2YieldAccumulatorForK2,
      oldMidnightInfo.k2YieldAccumulatorForK2,
      daysBetweenMidnights
    );

    k2ApyFor['kvcm-k2'] = nonCompoundedApr(
      midnightInfo.k2YieldAccumulatorForKVCM_K2_LP,
      oldMidnightInfo.k2YieldAccumulatorForKVCM_K2_LP,
      daysBetweenMidnights
    );

    k2ApyFor.kvcm = nonCompoundedApr(
      midnightInfo.k2YieldAccumulatorForKVCM,
      oldMidnightInfo.k2YieldAccumulatorForKVCM,
      daysBetweenMidnights
    );

    // KVCM
    kvcmApyFor.kvcm = nonCompoundedApr(
      midnightInfo.k2YieldAccumulatorForKVCM,
      oldMidnightInfo.k2YieldAccumulatorForKVCM,
      daysBetweenMidnights
    );

    kvcmApyFor['kvcm-k2'] = nonCompoundedApr(
      midnightInfo.riskyYieldAccumulatorForKVCM_K2_LP,
      oldMidnightInfo.riskyYieldAccumulatorForKVCM_K2_LP,
      daysBetweenMidnights
    );

    kvcmApyFor['kvcm-usdc'] = nonCompoundedApr(
      midnightInfo.riskyYieldAccumulatorForKVCM_USDC_LP,
      oldMidnightInfo.riskyYieldAccumulatorForKVCM_USDC_LP,
      daysBetweenMidnights
    );

    kvcmApyFor.kvcm = compoundedApr(
      midnightInfo.syntheticYieldPps,
      oldMidnightInfo.syntheticYieldPps,
      daysBetweenMidnights
    );

    // PY Between two given midnights
    // K2
    k2PyFor.k2 = percentageIncrease(
      midnightInfo.k2YieldAccumulatorForK2,
      oldMidnightInfo.k2YieldAccumulatorForK2
    );

    k2PyFor['kvcm-k2'] = percentageIncrease(
      midnightInfo.k2YieldAccumulatorForKVCM_K2_LP,
      oldMidnightInfo.k2YieldAccumulatorForKVCM_K2_LP
    );

    k2PyFor.kvcm = percentageIncrease(
      midnightInfo.k2YieldAccumulatorForKVCM,
      oldMidnightInfo.k2YieldAccumulatorForKVCM
    );

    // KVCM
    kvcmPyFor.kvcm = percentageIncrease(
      midnightInfo.k2YieldAccumulatorForKVCM,
      oldMidnightInfo.k2YieldAccumulatorForKVCM
    );

    kvcmPyFor['kvcm-k2'] = percentageIncrease(
      midnightInfo.riskyYieldAccumulatorForKVCM_K2_LP,
      oldMidnightInfo.riskyYieldAccumulatorForKVCM_K2_LP
    );

    kvcmPyFor['kvcm-usdc'] = percentageIncrease(
      midnightInfo.riskyYieldAccumulatorForKVCM_USDC_LP,
      oldMidnightInfo.riskyYieldAccumulatorForKVCM_USDC_LP
    );

    kvcmPyFor.kvcm = percentageIncrease(
      midnightInfo.syntheticYieldPps,
      oldMidnightInfo.syntheticYieldPps
    );
  }

  return {
    ...midnightInfo,
    oldMidnightInfo,
    k2ApyFor,
    kvcmApyFor,
    k2PyFor,
    kvcmPyFor,
  };
};

/**
 * Compute the midnight info with it self contain previousMidnightInfoas the old midnight info
 * @param midnightInfo
 */
export const computeMidnightInfoWithSelf = (midnightInfo: MidnightInfo) => {
  if (!midnightInfo.previousMidnightInfo) return undefined;
  return computeMidnightInfo(
    formatMidnightInfo(midnightInfo),
    formatMidnightInfo(midnightInfo.previousMidnightInfo)
  );
};

/**
 * Get the latest midnight infos for the active maturities
 * @param sdk
 * @returns
 */
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
          .map(computeMidnightInfoWithSelf)
          .filter((midnightInfo) => midnightInfo !== undefined),
        // Map by maturityId for faster lookups
        (midnightInfo) => [Number(midnightInfo.maturityId), midnightInfo]
      );
    },
    ['latest-midnight-infos-for-active-maturities'],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )();
};
