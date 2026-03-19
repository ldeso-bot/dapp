import { PROTOCOL_DATA_CACHE_TIME_SECONDS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { getCreditTokensByIds } from '@/shared/queries/protocol/getCreditTokensByIds';
import { cached } from '@/shared/utils/cache.utils';
import { validateRequestChainId } from '@/shared/utils/request.utils';
import { isChainId } from '@/shared/utils/typeguards';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { response, chainId } = validateRequestChainId(request);
  if (!isChainId(chainId)) {
    return response;
  }

  const idsParam = request.nextUrl.searchParams.get('ids');
  if (!idsParam) {
    return Response.json(
      { error: 'ids query parameter is required' },
      { status: 400 }
    );
  }

  // Parse comma-separated IDs
  const creditTokenIds = idsParam
    .split(',')
    .map((id) => id.trim())
    .filter((id) => id.length > 0);

  if (creditTokenIds.length === 0) {
    return Response.json(
      { error: 'At least one valid credit token ID is required' },
      { status: 400 }
    );
  }
  const data = await cached(
    async (chainId: ChainId, creditTokenIds: string[]) =>
      getCreditTokensByIds(chainId, creditTokenIds),
    ['credit-tokens', chainId, ...creditTokenIds.sort()],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )(chainId, creditTokenIds);

  return Response.json(data);
}
