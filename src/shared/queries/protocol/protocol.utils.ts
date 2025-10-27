import { Token, tokens } from '@/shared/constants/tokens.constants';
import { YieldRate, YieldRates } from '@/shared/models/ProtocolData';
import { Sdk } from '@/shared/utils/subgraph.utils';
import {
  GetYieldBucketsQuery,
  YieldBucket_Filter,
} from '@generated/gql/types/protocol.types';
import { formatUnits } from 'viem';
import { getMockMaturationTimestamp, getMockYieldPercent } from './mocks';

/**
 * Hardcoded bucket IDs
 * TODO: To be updated when things are settled AAM side
 */
export const BUCKET_IDS = {
  BOND: 0,
  CARBON: 1,
  RISKY: 2,
};

const tokensEligibleForIncentives: Record<number, Token[]> = {
  [BUCKET_IDS.BOND]: [tokens.kvcm.id],
  [BUCKET_IDS.CARBON]: [tokens.k2.id],
  [BUCKET_IDS.RISKY]: [tokens['kvcm-usdc'].id, tokens['kvcm-k2'].id],
};

/**
 * Maps yield buckets to yield rates
 * @param yieldBucket
 * @param index
 * @returns
 */
const mapYieldBucketsToYieldRates = (
  yieldBucket: GetYieldBucketsQuery['yieldBuckets'][number],
  index: number
): YieldRate => {
  return {
    index,
    tokens: tokensEligibleForIncentives[Number(yieldBucket.bucketId)],
    yieldPercent: Number(
      formatUnits(BigInt(yieldBucket.zeroCouponYieldCurve), 18)
    ),
    maturityId: yieldBucket.maturityId.toString(),
    maturationTimestamp: Number(yieldBucket.maturity.timestamp),
  };
};

/**
 *
 * Gets active yield buckets from the subgraph
 * @param sdk
 * @param bucketId
 * @returns
 */
export const getActiveYieldBuckets = async (sdk: Sdk, bucketId: number) => {
  const maturityManager = (await sdk.protocol.getMaturityManager())
    .maturityManagers[0];
  if (!maturityManager) throw new Error('Maturity manager not found');

  const yieldBuckets = await sdk.protocol.getYieldBuckets({
    where: {
      bucketId: bucketId.toString(),
      maturityId_gte: maturityManager.firstActiveMaturityId,
      maturityId_lte: maturityManager.lastActiveMaturityId,
    } as YieldBucket_Filter,
  });

  return yieldBuckets.yieldBuckets.map((yieldBucket, index) =>
    mapYieldBucketsToYieldRates(yieldBucket, index)
  );
};

/**
 * Returns mock yield rates for a given bucket ID
 * @param bucketId
 * @returns
 */
export const getMockLockedVcmYieldRates = async (
  bucketId: number
): Promise<YieldRates> => {
  const yieldRates: YieldRates = [];
  for (let i = 0; i < 40; i++) {
    yieldRates.push({
      tokens: tokensEligibleForIncentives[bucketId],
      index: i,
      maturityId: `maturity-${i}`,
      maturationTimestamp: getMockMaturationTimestamp(i),
      yieldPercent: getMockYieldPercent(i),
    });
  }
  return yieldRates;
};
