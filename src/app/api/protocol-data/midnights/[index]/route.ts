import { PROTOCOL_DATA_CACHE_TIME_SECONDS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { getTokenMetrics } from '@/shared/queries/protocol/getTokenMetrics';
import { mapMidnightInfosToComputedDiffs } from '@/shared/queries/protocol/midnightInfo.utils';
import { validateRequestChainId } from '@/shared/utils/request.utils';
import { getSdk } from '@/shared/utils/subgraph.utils';
import { isChainId } from '@/shared/utils/typeguards';
import { MidnightInfo_Filter } from '@generated/gql/types/protocol.types';
import { unstable_cache } from 'next/cache';
import { NextRequest } from 'next/server';

type Params = { params: Promise<{ index: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const { response, chainId } = validateRequestChainId(request);
  if (!isChainId(chainId)) {
    return response;
  }

  const { index } = await params;
  const midnightIndex = Number(index);

  if (isNaN(midnightIndex)) {
    return Response.json({ error: 'Invalid midnight index' }, { status: 400 });
  }

  const maturityIdParam = request.nextUrl.searchParams.get('maturityId');
  const maturityId = maturityIdParam ? Number(maturityIdParam) : undefined;

  if (maturityIdParam && isNaN(maturityId!)) {
    return Response.json({ error: 'Invalid maturity id' }, { status: 400 });
  }

  const data = await unstable_cache(
    async (
      chainId: ChainId,
      midnightIndex: number,
      maturityId: number | undefined
    ) => {
      const sdk = getSdk(chainId);

      const where: MidnightInfo_Filter = {
        midnightIndex: midnightIndex.toString(),
        ...(maturityId !== undefined && { maturityId: maturityId.toString() }),
      } as MidnightInfo_Filter;

      const [midnightInfosResponse] = await Promise.all([
        sdk.protocol.getMidnightInfo({ where }),
        getTokenMetrics(chainId),
      ]);

      return mapMidnightInfosToComputedDiffs(
        midnightInfosResponse.midnightInfos
      );
    },
    [`midnight-info-${chainId}-${midnightIndex}-${maturityId ?? 'all'}`],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )(chainId, midnightIndex, maturityId);

  if (Object.keys(data).length === 0) {
    return Response.json(
      { error: 'No midnight info found for the given index' },
      { status: 404 }
    );
  }

  return Response.json(data);
}
