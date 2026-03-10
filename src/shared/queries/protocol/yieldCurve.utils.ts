import { PROTOCOL_DATA_CACHE_TIME_SECONDS } from '@/shared/constants/config.constants';
import { ONE_YEAR } from '@/shared/constants/protocol.constants';
import { MaturityApys, MaturityId } from '@/shared/models/ProtocolData';
import { formatStringToNumber, Sdk } from '@/shared/utils/subgraph.utils';
import { getContract, getPublicClient } from '@/shared/utils/web3.utils';
import { unstable_cache } from 'next/cache';

type YieldCurvePoint = {
  maturityId: number;
  zeroCouponYield: number;
  yieldForCurrentInterval: number;
  deltaForCurrentPeriod: number;
  totalKvcmLockedForBucket: number;
};

type YieldCurveValues = {
  yieldCurve: YieldCurvePoint[];
  totalEffectiveKvcmLocked: number;
  discountParameter: number;
  rawTotalLockIssue: number;
};

/**
 * Gets the full yield curve values from the RewardManagerDiamond contract
 * @param sdk - The SDK containing the chain info
 * @returns The formatted yield curve values
 */
const getYieldCurveValues = async (sdk: Sdk): Promise<YieldCurveValues> => {
  return unstable_cache(
    async () => {
      const chainId = sdk.chain;
      const publicClient = getPublicClient(chainId);
      const rewardManagerDiamond = getContract(
        chainId,
        'RewardManagerDiamond',
        publicClient
      );

      const getFullCurveValuesFn = rewardManagerDiamond.read.getFullCurveValues;
      if (!getFullCurveValuesFn) {
        throw new Error('getFullCurveValues function not found on contract');
      }

      const [
        yieldCurve,
        totalEffectiveKvcmLocked,
        discountParameter,
        rawTotalLockIssue,
      ] = (await getFullCurveValuesFn()) as [
        {
          maturityId: bigint;
          discountFactor: bigint;
          zeroCouponYield: bigint;
          yieldForCurrentInterval: bigint;
          deltaForCurrentPeriod: bigint;
          totalKvcmLockedForBucket: bigint;
        }[],
        bigint,
        bigint,
        bigint,
      ];

      const formattedYieldCurve: YieldCurvePoint[] = yieldCurve.map(
        (point) => ({
          maturityId: Number(point.maturityId),
          discountFactor: formatStringToNumber(point.discountFactor, 18),
          zeroCouponYield: formatStringToNumber(point.zeroCouponYield, 18),
          yieldForCurrentInterval: formatStringToNumber(
            point.yieldForCurrentInterval,
            18
          ),
          deltaForCurrentPeriod: formatStringToNumber(
            point.deltaForCurrentPeriod,
            18
          ),
          totalKvcmLockedForBucket: formatStringToNumber(
            point.totalKvcmLockedForBucket,
            18
          ),
        })
      );

      return {
        yieldCurve: formattedYieldCurve,
        totalEffectiveKvcmLocked: formatStringToNumber(
          totalEffectiveKvcmLocked,
          18
        ),
        discountParameter: formatStringToNumber(discountParameter, 18),
        rawTotalLockIssue: formatStringToNumber(rawTotalLockIssue, 18),
      };
    },
    ['full-curve-values', sdk.chain.toString()],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )();
};

export const getActiveMaturitiesApys = async (
  sdk: Sdk
): Promise<Record<MaturityId, MaturityApys>> => {
  const yieldCurveValues = await getYieldCurveValues(sdk);
  const maturityApys: Record<MaturityId, MaturityApys> = {};
  for (const point of yieldCurveValues.yieldCurve) {
    const apy = Math.pow(1 + point.zeroCouponYield / ONE_YEAR, ONE_YEAR) - 1;
    maturityApys[point.maturityId] = {
      kvcm: { kvcmApy: apy, k2Apy: 0 },
      k2: { kvcmApy: 0, k2Apy: 0 },
      'kvcm-k2': { kvcmApy: 0, k2Apy: 0 },
      'kvcm-usdc': { kvcmApy: 0, k2Apy: 0 },
    };
  }
  return maturityApys;
};
