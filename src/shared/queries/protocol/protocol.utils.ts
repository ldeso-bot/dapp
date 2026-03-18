import {
  PROTOCOL_DATA_CACHE_TIME_SECONDS,
  USE_LOCAL_GRAPH_NODE,
} from '@/shared/constants/config.constants';
import { ONE_DAY } from '@/shared/constants/protocol.constants';
import { Token, tokens } from '@/shared/constants/tokens.constants';
import { SDKCreditToken } from '@/shared/models/generated';
import { YieldType } from '@/shared/models/ProtocolData';
import { ApiCreditToken, TOKEN_STANDARDS } from '@/shared/models/shared';
import { formatStringToNumber, Sdk } from '@/shared/utils/subgraph.utils';
import { GetCreditTokensQuery } from '@generated/gql/types/carbon.types';
import { Maturity_Filter } from '@generated/gql/types/protocol.types';
import { unstable_cache } from 'next/cache';
import { mapToObj } from 'remeda';
import { base } from 'viem/chains';
import { getLatestMidnightInfoDiffs } from './midnightInfo.utils';
import { getActiveMaturitiesApys } from './yieldCurve.utils';

export const tokensEligibleForIncentives: Record<YieldType, Token[]> = {
  [YieldType.K2]: [
    tokens.k2.id,
    tokens.kvcm.id,
    tokens['kvcm-k2'].id,
    tokens['kvcm-usdc'].id,
  ],
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
      const [protocolStates, lastestMidnightInfos] = await Promise.all([
        sdk.protocol.getProtocolState(),
        getLatestMidnightInfoDiffs(sdk),
      ]);
      const lastProcessedMidnightIndex =
        lastestMidnightInfos[0]?.midnightIndex ?? 0;
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
      const midnightIndex = Math.floor(
        (now - protocolStartTimestamp) / ONE_DAY
      );
      const firstActiveMaturityId =
        Math.floor((now - protocolStartTimestamp) / maturityPeriod) + 1;
      const lastActiveMaturityId = firstActiveMaturityId + (40 - 1);

      const res = {
        ...protocolState,
        midnightIndex,
        protocolStartTimestamp,
        maturityPeriod,
        firstActiveMaturityId,
        lastActiveMaturityId,
        lastProcessedMidnightIndex,
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
      const [protocolState, midnightInfos, activeMaturitiesApys] =
        await Promise.all([
          getProtocolState(sdk),
          getLatestMidnightInfoDiffs(sdk),
          getActiveMaturitiesApys(sdk),
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
        const liveApys = activeMaturitiesApys[Number(maturity.maturityId)];
        return {
          ...maturity,
          midnightInfo,
          liveApys,
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
      return mapToObj(credits.creditTokens, (credit: SDKCreditToken) => [
        credit.creditTokenId,
        credit,
      ]);
    },
    ['credits-map'],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )();
};

/**
 * Maps a credit token to an ApiCreditToken. Mocks Credits on testnet if they are not found in the subgraph.
 * @param sdk
 * @param creditTokenId
 * @param token
 * @returns
 */
export const mapToApiCreditToken = (
  sdk: Sdk,
  creditTokenId: string,
  token?: GetCreditTokensQuery['creditTokens'][number]
): ApiCreditToken | null => {
  if (!token) {
    if (sdk.chain == base.id) return null;
    const address = creditTokenId.split('-').at(1);
    if (!address) return null;
    // Mock testnet credit
    const id = address.substring(2, 5);
    const name = `Test Credit ${id}`;
    // Sneak in a PURO credit for testing the retirement form
    const registry = id == '2d4' ? 'PURO' : 'TEST';
    const symbol = `${registry}-0-${id}`;
    // On, testnet, we mock the credits if they are not found in the subgraph
    return {
      creditTokenId: creditTokenId,
      tokenId: 0,
      batchId: 0,
      address,
      symbol,
      decimals: 18,
      standard: TOKEN_STANDARDS.ERC20,
      project: {
        name,
      },
    } satisfies ApiCreditToken;
  }

  const projectSymbol = `${token.registry.id}-${token.registryProjectId}`;
  const creditSymbol = `${projectSymbol}-${token.vintage}`;
  const projectName = token.project.metadata?.name ?? projectSymbol;
  return {
    creditTokenId: token.creditTokenId,
    tokenId: token.tokenId,
    batchId: parseInt(token.batchId),
    address: token.tokenAddress,
    symbol: creditSymbol,
    decimals: token.decimals,
    // TODO: use token.standard when available
    standard: TOKEN_STANDARDS.ERC20,
    project: {
      name: projectName,
    },
  };
};
