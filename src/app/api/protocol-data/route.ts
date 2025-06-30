import { getProtocolData } from '@/shared/queries/protocol/getProtocolData';
import { getSdkOrError } from '@/shared/utils/subgraph.utils';
import { unstable_cache } from 'next/cache';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { response, sdk, chainId } = getSdkOrError(request);
  if (!sdk) {
    return response;
  }

  const data = await unstable_cache(
    async () => {
      return getProtocolData(sdk);
    },
    [`protocol-data-${chainId}`],
    {
      revalidate: 60,
    }
  )();

  return Response.json(data);
}
