import { getWalletData } from '@/shared/queries/wallet/getWalletData';
import { validateRequestChainId } from '@/shared/utils/request.utils';
import { isChainId } from '@/shared/utils/typeguards';
import { unstable_cache } from 'next/cache';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { response, chainId } = validateRequestChainId(request);
  if (!isChainId(chainId)) {
    return response;
  }

  const walletAddress = request.nextUrl.searchParams.get('walletAddress');
  if (!walletAddress) {
    return Response.json(
      { error: 'Wallet address is required' },
      { status: 400 }
    );
  }

  const data = await unstable_cache(
    async () => {
      return getWalletData(chainId, walletAddress);
    },
    [`wallet-data-${chainId}-${walletAddress}`],
    {
      revalidate: 1,
    }
  )();

  return Response.json(data);
}
