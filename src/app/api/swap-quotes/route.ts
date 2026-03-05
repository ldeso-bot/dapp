import { getSwapQuotesCached } from '@/shared/queries/protocol/getSwapQuotes';
import { validateRequestChainId } from '@/shared/utils/request.utils';
import { isChainId } from '@/shared/utils/typeguards';
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

  try {
    const data = getSwapQuotesCached(chainId, sizes);
    return Response.json(data);
  } catch (error) {
    console.error('[swap-quotes] Failed to fetch quotes:', error);
    return Response.json(
      { error: 'Failed to fetch swap quotes' },
      { status: 500 }
    );
  }
}
