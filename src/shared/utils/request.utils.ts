import { ChainId } from '@/shared/constants/networks.constants';
import { isChainId } from '@/shared/utils/typeguards';
import { NextRequest } from 'next/server';

/**
 * Validates the chain ID from the request
 * If the chain name is invalid, returns a 400 response.
 * @param request - The request object.
 * @returns The chainId or null if the chain name is invalid, and a response object.
 */
export const validateRequestChainId = (request: NextRequest) => {
  const chainIdParam = Number(request.nextUrl.searchParams.get('chainId'));
  let chainId: ChainId | null = null;
  const response = Response.json({ error: 'Invalid chain' }, { status: 400 });
  if (isChainId(chainIdParam)) {
    const validChainId = chainIdParam;
    chainId = validChainId;
  }
  return { response, chainId };
};
