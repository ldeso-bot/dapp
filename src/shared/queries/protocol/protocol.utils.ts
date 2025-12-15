import {
  PROTOCOL_DATA_CACHE_TIME_SECONDS,
  USE_LOCAL_GRAPH_NODE,
} from '@/shared/constants/config.constants';
import { Token, tokens } from '@/shared/constants/tokens.constants';
import { YieldRate, YieldRates, YieldType } from '@/shared/models/ProtocolData';
import { formatStringToNumber, Sdk } from '@/shared/utils/subgraph.utils';
import { Maturity_Filter } from '@generated/gql/types/protocol.types';
import { unstable_cache } from 'next/cache';
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
      return {
        ...protocolState,
        protocolStartTimestamp: formatStringToNumber(
          protocolState.protocolStartTimestamp,
          0
        ),
        firstActiveMaturityId: formatStringToNumber(
          protocolState.firstActiveMaturityId,
          0
        ),
        lastActiveMaturityId: formatStringToNumber(
          protocolState.lastActiveMaturityId,
          0
        ),
      };
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
      const protocolState = await getProtocolState(sdk);
      if (!protocolState) return [];
      const maturities = await sdk.protocol.getMaturities({
        where: {
          maturityId_gte: protocolState.firstActiveMaturityId,
          maturityId_lte: protocolState.lastActiveMaturityId,
        } as unknown as Maturity_Filter,
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
      zeroCouponYieldCurve = maturity.syntheticYieldZeroCouponYieldCurve;
    } else if (yieldType === YieldType.RISKY) {
      zeroCouponYieldCurve = maturity.riskyYieldZeroCouponYieldCurve;
    } else if (yieldType === YieldType.SYNTHETIC) {
      zeroCouponYieldCurve = maturity.syntheticYieldZeroCouponYieldCurve;
    }
    const yieldPercent = formatStringToNumber(zeroCouponYieldCurve, 18);

    return {
      index,
      tokens: tokensEligibleForIncentives[yieldType],
      yieldPercent,
      maturityId: Number(maturity.maturityId),
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
      maturityId: i,
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
