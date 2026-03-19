import { WALLET_DATA_CACHE_TIME_SECONDS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { getWalletData } from '@/shared/queries/wallet/getWalletData';
import { cached } from '@/shared/utils/cache.utils';
import { validateRequestChainId } from '@/shared/utils/request.utils';
import { isChainId } from '@/shared/utils/typeguards';
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

  const data = await cached(
    async (chainId: ChainId, walletAddress: string) =>
      getWalletData(chainId, walletAddress),
    ['wallet-data', chainId, walletAddress],
    { revalidate: WALLET_DATA_CACHE_TIME_SECONDS }
  )(chainId, walletAddress);

  return Response.json(data);
}
