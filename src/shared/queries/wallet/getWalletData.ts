import { ChainId } from '@/shared/constants/networks.constants';
import { WalletData } from '@/shared/models/walletData';
import { getAllocations } from '@/shared/queries/wallet/getAllocations';
import { getBalances } from '@/shared/queries/wallet/getBalances';
import { getLocks } from '@/shared/queries/wallet/getLocks';

export async function getWalletData(
  chainId: ChainId,
  walletAddress: string
): Promise<WalletData> {
  const [locks, balances, allocations] = await Promise.all([
    getLocks(chainId, walletAddress),
    getBalances(chainId, walletAddress),
    getAllocations(chainId, walletAddress),
  ]);

  return {
    locks,
    balances,
    allocations,
  };
}
