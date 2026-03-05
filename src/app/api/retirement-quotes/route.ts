import { getRetirementQuotesCached } from '@/shared/queries/protocol/getRetirementQuotes';
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
  const sortedSizes = [...sizes].sort((a, b) => a - b);

  try {
    const data = await getRetirementQuotesCached(chainId, sortedSizes);
    return Response.json(data);
  } catch (error) {
    console.error('[retirement-quotes] Failed to fetch quotes:', error);
    return Response.json(
      { error: 'Failed to fetch retirement quotes' },
      { status: 500 }
    );
  }
}
