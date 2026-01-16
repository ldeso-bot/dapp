import {
  PROTOCOL_DATA_CACHE_TIME_SECONDS,
  USE_LOCAL_GRAPH_NODE,
} from '@/shared/constants/config.constants';
import { Token, tokens } from '@/shared/constants/tokens.constants';
import { YieldType } from '@/shared/models/ProtocolData';
import { ApiCreditToken, TOKEN_STANDARDS } from '@/shared/models/shared';
import { formatStringToNumber, Sdk } from '@/shared/utils/subgraph.utils';
import { GetCreditTokensQuery } from '@generated/gql/types/carbon.types';
import { Maturity_Filter } from '@generated/gql/types/protocol.types';
import { unstable_cache } from 'next/cache';
import { mapToObj } from 'remeda';
import { getLatestMidnightInfoDiffs } from './midnightInfo.utils';

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
        console.error('❌ Protocol state not found');
        return null;
      }
      const protocolStartTimestamp = formatStringToNumber(
        protocolState.protocolStartTimestamp,
        0
      );
      const maturityPeriod = formatStringToNumber(
        protocolState.maturityPeriod,
        0
      );

      // Compute active maturities based on the protocol start timestamp and maturity period
      const now = Math.floor(Date.now() / 1000);
      const firstActiveMaturityId =
        Math.floor((now - protocolStartTimestamp) / maturityPeriod) + 1;
      const lastActiveMaturityId = firstActiveMaturityId + (40 - 1);

      const res = {
        ...protocolState,
        protocolStartTimestamp,
        maturityPeriod,
        firstActiveMaturityId,
        lastActiveMaturityId,
      };

      return res;
    },
    ['protocol-state'],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )();
};

export type ProtocolState = NonNullable<
  Awaited<ReturnType<typeof getProtocolState>>
>;

export const getActiveMaturities = async (sdk: Sdk) => {
  return unstable_cache(
    async () => {
      const [protocolState, midnightInfos] = await Promise.all([
        getProtocolState(sdk),
        getLatestMidnightInfoDiffs(sdk),
      ]);
      if (!protocolState) return [];
      const maturities = await sdk.protocol.getMaturities({
        where: {
          maturityId_gte: protocolState.firstActiveMaturityId,
          maturityId_lte: protocolState.lastActiveMaturityId,
        } as unknown as Maturity_Filter,
      });
      return maturities.maturities.map((maturity) => {
        // Add yield curve info to maturity
        const midnightInfo = midnightInfos[Number(maturity.maturityId)];
        const syntheticYieldZeroCouponYieldCurve = midnightInfo
          ? midnightInfo.kvcmApyFor.kvcm
          : 0;
        const riskyYieldZeroCouponYieldCurve = midnightInfo
          ? midnightInfo.kvcmPyFor['kvcm-k2']
          : 0;
        return {
          ...maturity,
          syntheticYieldZeroCouponYieldCurve,
          riskyYieldZeroCouponYieldCurve,
        };
      });
    },
    ['active-maturities'],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )();
};

export const getHoursSinceEpoch24HoursAgo = () => {
  let hoursSinceEpoch = Math.floor(Date.now() / 1000 / 3600);

  // Local graph node does not have previous data (but mey has future data thanks to time travel)
  if (!USE_LOCAL_GRAPH_NODE) {
    hoursSinceEpoch = hoursSinceEpoch - 24;
  }
  return hoursSinceEpoch;
};

/**
 * Gets a map of all credit tokens by their credit token ID
 * Cached for 1 minute
 * @param sdk
 * @returns
 */
export const getCreditsTokenMap = async (sdk: Sdk) => {
  return unstable_cache(
    async () => {
      const credits = await sdk.carbon.getCreditTokens();
      return mapToObj(
        credits.creditTokens,
        (credit: GetCreditTokensQuery['creditTokens'][number]) => [
          credit.creditTokenId,
          credit,
        ]
      );
    },
    ['credits-map'],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )();
};

export const mapToApiCreditToken = (
  token?: GetCreditTokensQuery['creditTokens'][number]
): ApiCreditToken | null => {
  if (!token) return null;

  return {
    creditTokenId: token.creditTokenId,
    tokenId: token.tokenId,
    address: token.tokenAddress,
    name: token.project.metadata?.name ?? token.creditTokenId,
    decimals: token.decimals,
    // TODO: use token.standard when available
    standard: TOKEN_STANDARDS.ERC20,
    project: {
      name: token.project?.metadata?.name ?? token.creditTokenId,
    },
  };
};
