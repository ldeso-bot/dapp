import { PROTOCOL_DATA_CACHE_TIME_SECONDS } from '@/shared/constants/config.constants';
import { getProtocolData } from '@/shared/queries/protocol/getProtocolData';
import { validateRequestChainId } from '@/shared/utils/request.utils';
import { isChainId } from '@/shared/utils/typeguards';
import { unstable_cache } from 'next/cache';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { response, chainId } = validateRequestChainId(request);
  if (!isChainId(chainId)) {
    return response;
  }

  const data = await unstable_cache(
    async () => getProtocolData(chainId),
    [`protocol-data-${chainId}`],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )();

  return Response.json(data);
}
