import { PROTOCOL_DATA_CACHE_TIME_SECONDS } from '@/shared/constants/config.constants';
import { DAYS_IN_YEAR } from '@/shared/constants/protocol.constants';
import { Token } from '@/shared/constants/tokens.constants';
import { SDKMidnightInfo } from '@/shared/models/generated';
import {
  AllMetrics,
  ApyInfo,
  ApyMidnightInfo,
  YieldType,
} from '@/shared/models/ProtocolData';
import { computeTokenAmountValueUSD } from '@/shared/utils/protocol.utils';
import { formatStringToNumber, Sdk } from '@/shared/utils/subgraph.utils';
import { unstable_cache } from 'next/cache';
import { mapToObj } from 'remeda';
import { getTokenMetrics } from './getTokenMetrics';

const percentageIncrease = (newValue: number, oldValue: number) =>
  oldValue > 0 ? (newValue - oldValue) / oldValue : 0;

const ppsApr = (
  newPps: number,
  oldPps: number,
  daysBetweenMidnights: number
) => {
  return (
    Math.pow(
      1 + percentageIncrease(newPps, oldPps) / daysBetweenMidnights,
      DAYS_IN_YEAR
    ) - 1
  );
};

export const accumulatorApr = (
  newAccumulator: number,
  oldAccumulator: number,
  daysBetweenMidnights: number
) => {
  return (
    ((newAccumulator - oldAccumulator) / daysBetweenMidnights) * DAYS_IN_YEAR
  );
};

/**
 * Format the midnight info from the subgraph data to a more usable format
 * @param midnightInfo
 * @returns
 */
export const formatMidnightInfo = (
  midnightInfo:
    | SDKMidnightInfo
    | NonNullable<SDKMidnightInfo['previousMidnightInfo']>
) => {
  return {
    midnightIndex: Number(midnightInfo.midnightIndex),
    maturityId: Number(midnightInfo.maturityId),
    lastUpdated: Number(midnightInfo.lastUpdated),
    keeperUpdated: midnightInfo.keeperUpdated,

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
    k2YieldAccumulatorForKVCM_USDC_LP: formatStringToNumber(
      midnightInfo.k2YieldAccumulatorForKVCM_USDC_LP,
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

export type FormattedMidnightInfo = ReturnType<typeof formatMidnightInfo>;

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
const computeMidnightInfoDiff = (
  midnightInfo: FormattedMidnightInfo,
  oldMidnightInfo: FormattedMidnightInfo | undefined,
  tokenMetrics: AllMetrics
) => {
  // Yearly Percentage yield
  const k2ApyFor = { ...EMPTY_APY_INFO };
  const kvcmApyFor = { ...EMPTY_APY_INFO };
  const k2PyFor = { ...EMPTY_APY_INFO };
  const kvcmPyFor = { ...EMPTY_APY_INFO };

  const kvcmK2LpValueUSD = computeTokenAmountValueUSD(
    'kvcm-k2',
    1,
    tokenMetrics
  );
  const kvcmUsdcLpValueUSD = computeTokenAmountValueUSD(
    'kvcm-usdc',
    1,
    tokenMetrics
  );
  const kvcmValueUSD = computeTokenAmountValueUSD('kvcm', 1, tokenMetrics);
  const k2ValueUSD = computeTokenAmountValueUSD('k2', 1, tokenMetrics);

  if (oldMidnightInfo) {
    const daysBetweenMidnights =
      midnightInfo.midnightIndex - oldMidnightInfo.midnightIndex;

    // APY
    // K2 APY
    k2ApyFor.k2 = accumulatorApr(
      midnightInfo.k2YieldAccumulatorForK2,
      oldMidnightInfo.k2YieldAccumulatorForK2,
      daysBetweenMidnights
    );

    k2ApyFor['kvcm-k2'] =
      (accumulatorApr(
        midnightInfo.k2YieldAccumulatorForKVCM_K2_LP,
        oldMidnightInfo.k2YieldAccumulatorForKVCM_K2_LP,
        daysBetweenMidnights
      ) *
        k2ValueUSD) /
      kvcmK2LpValueUSD;

    k2ApyFor.kvcm =
      (accumulatorApr(
        midnightInfo.k2YieldAccumulatorForKVCM,
        oldMidnightInfo.k2YieldAccumulatorForKVCM,
        daysBetweenMidnights
      ) *
        k2ValueUSD) /
      kvcmValueUSD;

    // KVCM
    kvcmApyFor['kvcm-k2'] =
      (accumulatorApr(
        midnightInfo.riskyYieldAccumulatorForKVCM_K2_LP,
        oldMidnightInfo.riskyYieldAccumulatorForKVCM_K2_LP,
        daysBetweenMidnights
      ) *
        kvcmValueUSD) /
      kvcmK2LpValueUSD;

    kvcmApyFor['kvcm-usdc'] =
      (accumulatorApr(
        midnightInfo.riskyYieldAccumulatorForKVCM_USDC_LP,
        oldMidnightInfo.riskyYieldAccumulatorForKVCM_USDC_LP,
        daysBetweenMidnights
      ) *
        kvcmValueUSD) /
      kvcmUsdcLpValueUSD;

    kvcmApyFor.kvcm = ppsApr(
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

    k2PyFor['kvcm-k2'] =
      (percentageIncrease(
        midnightInfo.k2YieldAccumulatorForKVCM_K2_LP,
        oldMidnightInfo.k2YieldAccumulatorForKVCM_K2_LP
      ) *
        k2ValueUSD) /
      kvcmK2LpValueUSD;

    k2PyFor.kvcm =
      (percentageIncrease(
        midnightInfo.k2YieldAccumulatorForKVCM,
        oldMidnightInfo.k2YieldAccumulatorForKVCM
      ) *
        k2ValueUSD) /
      kvcmValueUSD;

    // KVCM
    kvcmPyFor.k2 =
      (percentageIncrease(
        midnightInfo.riskyYieldAccumulatorForK2,
        oldMidnightInfo.riskyYieldAccumulatorForK2
      ) *
        k2ValueUSD) /
      kvcmValueUSD;

    kvcmPyFor['kvcm-k2'] =
      (percentageIncrease(
        midnightInfo.riskyYieldAccumulatorForKVCM_K2_LP,
        oldMidnightInfo.riskyYieldAccumulatorForKVCM_K2_LP
      ) *
        kvcmValueUSD) /
      kvcmK2LpValueUSD;

    kvcmPyFor['kvcm-usdc'] =
      (percentageIncrease(
        midnightInfo.riskyYieldAccumulatorForKVCM_USDC_LP,
        oldMidnightInfo.riskyYieldAccumulatorForKVCM_USDC_LP
      ) *
        kvcmValueUSD) /
      kvcmUsdcLpValueUSD;

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
export const computeMidnightInfoDiffWithPrevious = (
  midnightInfo: SDKMidnightInfo,
  tokenMetrics: AllMetrics
) => {
  if (!midnightInfo.previousMidnightInfo) {
    console.warn(
      `MidnightInfo (midnightIndex: ${midnightInfo.midnightIndex}, maturityId: ${midnightInfo.maturityId}) has no previousMidnightInfo.`
    );
    return undefined;
  }
  return computeMidnightInfoDiff(
    formatMidnightInfo(midnightInfo),
    formatMidnightInfo(midnightInfo.previousMidnightInfo),
    tokenMetrics
  );
};

/**
 * Maps raw midnight infos to computed diffs keyed by maturityId
 * @param midnightInfos - The raw midnight infos from the subgraph
 * @param tokenMetrics - The token metrics for APY calculations
 * @returns Record of maturityId to ComputedMidnightInfo
 */
export const mapMidnightInfosToComputedDiffs = (
  midnightInfos: SDKMidnightInfo[],
  tokenMetrics: AllMetrics
) => {
  if (!midnightInfos || midnightInfos.length === 0) return {};

  const computedMidnightInfos = midnightInfos
    .map((midnightInfo) =>
      computeMidnightInfoDiffWithPrevious(midnightInfo, tokenMetrics)
    )
    .filter((midnightInfo) => midnightInfo !== undefined);

  // Map by maturityId for faster lookups
  return mapToObj(computedMidnightInfos, (midnightInfo) => [
    Number(midnightInfo.maturityId),
    midnightInfo,
  ]);
};

/**
 * Get the latest midnight infos for the active maturities
 * @param sdk
 * @returns
 */
export const getLatestMidnightInfoDiffs = async (
  sdk: Sdk
): Promise<Record<number, ComputedMidnightInfo>> => {
  return unstable_cache(
    async () => {
      const tokenMetrics = await getTokenMetrics(sdk.chain);
      const [midnightInfos] = await Promise.all([
        (await sdk.protocol.getLatestMidnightInfo()).midnightInfos,
        getTokenMetrics(sdk.chain),
      ]);

      if (!midnightInfos || midnightInfos.length === 0 || !midnightInfos[0])
        return {};

      // Filter to only include midnight infos for the latest midnight index
      const midnightIndex = midnightInfos[0].midnightIndex;
      const filteredMidnightInfos = midnightInfos.filter(
        (midnightInfo) => midnightInfo.midnightIndex === midnightIndex
      );

      return mapMidnightInfosToComputedDiffs(
        filteredMidnightInfos,
        tokenMetrics
      );
    },
    ['latest-midnight-infos-for-active-maturities'],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )();
};

export const getFormattedMidnightInfoAccumulator = (
  midnightInfo: FormattedMidnightInfo,
  type: YieldType,
  token: Token
) => {
  let rawAccumulator = 0;
  if (type === YieldType.K2) {
    rawAccumulator =
      token === 'k2'
        ? midnightInfo.k2YieldAccumulatorForK2
        : token === 'kvcm-k2'
          ? midnightInfo.k2YieldAccumulatorForKVCM_K2_LP
          : token === 'kvcm-usdc'
            ? midnightInfo.k2YieldAccumulatorForKVCM_USDC_LP
            : token === 'kvcm'
              ? midnightInfo.k2YieldAccumulatorForKVCM
              : 0;
  } else if (type === YieldType.RISKY) {
    rawAccumulator =
      token === 'k2'
        ? midnightInfo.riskyYieldAccumulatorForK2
        : token === 'kvcm-k2'
          ? midnightInfo.riskyYieldAccumulatorForKVCM_K2_LP
          : token === 'kvcm-usdc'
            ? midnightInfo.riskyYieldAccumulatorForKVCM_USDC_LP
            : 0;
  } else {
    console.error(`Yield type does not have an accumulator: ${type}`);
  }

  return rawAccumulator;
};
