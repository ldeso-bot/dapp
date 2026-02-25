import { QUOTES_CACHE_TIME_SECONDS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { getSwapQuotes } from '@/shared/queries/protocol/getSwapQuotes';
import { validateRequestChainId } from '@/shared/utils/request.utils';
import { isChainId } from '@/shared/utils/typeguards';
import { unstable_cache } from 'next/cache';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { response, chainId } = validateRequestChainId(request);
  if (!isChainId(chainId)) {
    return response;
  }

  const sizesParam = request.nextUrl.searchParams.get('sizes');
  const sizes = sizesParam
    ? sizesParam
        .split(',')
        .map(Number)
        .filter((n) => Number.isFinite(n) && n > 0)
    : [1];
  const sortedSizes = [...sizes].sort((a, b) => a - b);

  try {
    const data = await unstable_cache(
      async (chainId: ChainId, sizes: number[]) => getSwapQuotes(chainId, sizes),
      [`swap-quotes-${chainId}-${sortedSizes.join(',')}`],
      { revalidate: QUOTES_CACHE_TIME_SECONDS }
    )(chainId, sortedSizes);
    return Response.json(data);
  } catch (error) {
    console.error('[swap-quotes] Failed to fetch quotes:', error);
    return Response.json(
      { error: 'Failed to fetch swap quotes' },
      { status: 500 }
    );
  }
}
