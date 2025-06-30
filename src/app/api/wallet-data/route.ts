import { getWalletData } from '@/shared/queries/wallet/getWalletData';
import { getSdkOrError } from '@/shared/utils/subgraph.utils';
import { unstable_cache } from 'next/cache';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { response, sdk, chainId } = getSdkOrError(request);
  if (!sdk) {
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
      return getWalletData(sdk, walletAddress);
    },
    [`wallet-data-${chainId}-${walletAddress}`],
    {
      revalidate: 5,
    }
  )();

  return Response.json(data);
}
