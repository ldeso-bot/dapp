import { PROTOCOL_DATA_CACHE_TIME_SECONDS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { getProtocolData } from '@/shared/queries/protocol/getProtocolData';
import { cached } from '@/shared/utils/cache.utils';
import { validateRequestChainId } from '@/shared/utils/request.utils';
import { isChainId } from '@/shared/utils/typeguards';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { response, chainId } = validateRequestChainId(request);
  if (!isChainId(chainId)) {
    return response;
  }

  const data = await cached(
    async (chainId: ChainId) => getProtocolData(chainId),
    ['protocol-data', chainId],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )(chainId);

  return Response.json(data);
}
