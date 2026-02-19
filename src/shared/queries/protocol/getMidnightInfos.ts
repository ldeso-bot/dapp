import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { MidnightInfos } from '@/shared/models/ProtocolData';
import { getSdk } from '@/shared/utils/subgraph.utils';
import { NumberKeysOf } from '@/shared/utils/typescript.utils';
import { mapValues, pick, sumBy } from 'remeda';
import {
  accumulatorApr,
  ComputedMidnightInfo,
  getLatestMidnightInfoDiffs,
} from './midnightInfo.utils';

export const getMidnightInfos = async (
  chainId: ChainId
): Promise<MidnightInfos> => {
  const sdk = getSdk(chainId);
  if (USE_MOCKS) {
    return {
      midnightIndex: 2,
      k2ApyForK2: 0.01,
      k2ApyForKVCM_K2_LP: 0.02,
      k2ApyForKVCM: 0.03,
      kvcmApyForKVCM_K2_LP: 0.015,
      kvcmApyForKVCM_USDC_LP: 0.025,
      kvcmApyForK2: 0.035,
      maturityApys: {},
    };
  }

  // Fetch maturityApys
  const midnightInfos = await getLatestMidnightInfoDiffs(sdk);

  const midnightInfosWithPreviousInfo = Object.values(midnightInfos).filter(
    (midnightInfo) => midnightInfo.oldMidnightInfo !== undefined
  );

  /**
   * Utility to compute APR for a given field across all midnightInfos
   * @param field
   * @returns
   */
  const computeGlobalApr = (field: NumberKeysOf<ComputedMidnightInfo>) => {
    const summedField = sumBy(
      midnightInfosWithPreviousInfo,
      (midnightInfo) => midnightInfo[field]
    );
    const summedPreviousField = sumBy(
      midnightInfosWithPreviousInfo,
      (midnightInfo) => midnightInfo.oldMidnightInfo?.[field] ?? 0
    );
    return accumulatorApr(summedField, summedPreviousField, 1);
  };

  const k2ApyForK2 = computeGlobalApr('k2YieldAccumulatorForK2');
  const k2ApyForKVCM_K2_LP = computeGlobalApr(
    'k2YieldAccumulatorForKVCM_K2_LP'
  );
  const k2ApyForKVCM = computeGlobalApr('k2YieldAccumulatorForKVCM');
  const kvcmApyForKVCM_K2_LP = computeGlobalApr(
    'riskyYieldAccumulatorForKVCM_K2_LP'
  );
  const kvcmApyForKVCM_USDC_LP = computeGlobalApr(
    'riskyYieldAccumulatorForKVCM_USDC_LP'
  );
  const kvcmApyForK2 = computeGlobalApr('riskyYieldAccumulatorForK2');

  // Transform to only include the fields we want to expose
  const maturityApys = mapValues(midnightInfos, (maturityApy) =>
    pick(maturityApy, [
      'maturityId',
      'k2ApyFor',
      'kvcmApyFor',
      'k2PyFor',
      'kvcmPyFor',
    ])
  );

  return {
    midnightIndex: Object.values(midnightInfos)[0]?.midnightIndex ?? 0,
    k2ApyForK2,
    k2ApyForKVCM_K2_LP,
    k2ApyForKVCM,
    kvcmApyForKVCM_K2_LP,
    kvcmApyForKVCM_USDC_LP,
    kvcmApyForK2,
    maturityApys,
  };
};
