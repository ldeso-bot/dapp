import { subgraphs } from '@/shared/constants/subgraph.constants';
import { getSdk as getCarbonSdk } from '@generated/gql/types/carbon.types';
import { getSdk as getProtocolSdk } from '@generated/gql/types/protocol.types';
import { GraphQLClient } from 'graphql-request';
import { base, baseSepolia } from 'viem/chains';

import { isChainId } from '@/shared/utils/typeguards';
import { NextRequest } from 'next/server';

const sdkForChain = (chain: keyof typeof subgraphs) => {
  const { carbon, protocol } = subgraphs[chain];
  const carbonClient = new GraphQLClient(carbon);
  const protocolClient = new GraphQLClient(protocol);

  return {
    carbon: getCarbonSdk(carbonClient),
    protocol: getProtocolSdk(protocolClient),
  };
};

const sdks = {
  [base.id]: sdkForChain(base.id),
  [baseSepolia.id]: sdkForChain(baseSepolia.id),
};

export type Sdk = (typeof sdks)[keyof typeof sdks];

/**
 * Gets the sdk from the given request
 * If the chain name is invalid, returns a 400 response.
 * @param request - The request object.
 * @returns The sdk or null if the chain name is invalid.
 */
export const getSdkOrError = (request: NextRequest) => {
  const chainId = Number(request.nextUrl.searchParams.get('chainId'));
  let sdk: Sdk | null = null;
  const response = Response.json({ error: 'Invalid chain' }, { status: 400 });
  if (isChainId(chainId)) {
    sdk = sdks[chainId];
  }
  return { sdk, response };
};
