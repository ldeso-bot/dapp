import { subgraphs } from '@/shared/constants/subgraph.constants';
import { getSdk as getCarbonSdk } from '@generated/gql/types/carbon.types';
import { getSdk as getProtocolSdk } from '@generated/gql/types/protocol.types';
import { GraphQLClient } from 'graphql-request';
import { base, baseSepolia } from 'viem/chains';

import { ChainId } from '@/shared/constants/networks.constants';
import { isChainId } from '@/shared/utils/typeguards';
import { formatUnits } from 'viem';

/**
 * Gets the sdk for the given chain
 * @param chain - The chain to get the sdk for
 * @returns The sdk for the given chain
 */
const sdkForChain = (chain: keyof typeof subgraphs) => {
  const { carbon, protocol } = subgraphs[chain];
  /** Very short SDK queries cache. Caching is done at route level */
  const options = {
    next: {
      revalidate: 1,
    },
  };
  const carbonClient = new GraphQLClient(carbon, options);
  const protocolClient = new GraphQLClient(protocol, options);

  return {
    carbon: getCarbonSdk(carbonClient),
    protocol: getProtocolSdk(protocolClient),
  };
};

/**
 * The sdks for the different chains
 */
const sdks = {
  [base.id]: sdkForChain(base.id),
  [baseSepolia.id]: sdkForChain(baseSepolia.id),
};

export type Sdk = (typeof sdks)[keyof typeof sdks];

/**
 * Gets the SDK for the given chain ID
 * @param chainId - The chain ID
 * @returns The SDK for the given chain
 * @throws Error if chainId is invalid
 */
export const getSdk = (chainId: ChainId): Sdk => {
  if (!isChainId(chainId)) {
    throw new Error(`Invalid chain ID: ${chainId}`);
  }
  return sdks[chainId];
};

export const formatStringToNumber = (
  value: string | undefined,
  decimals: number
) => {
  return Number(formatUnits(BigInt(value ?? '0'), decimals));
};
