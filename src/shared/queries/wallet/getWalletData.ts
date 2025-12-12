import { FORCE_WALLET_ADDRESS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { WalletData } from '@/shared/models/walletData';
import { getAllocations } from '@/shared/queries/wallet/getAllocations';
import { getBalances } from '@/shared/queries/wallet/getBalances';
import { getLocks } from '@/shared/queries/wallet/getLocks';

export async function getWalletData(
  chainId: ChainId,
  walletAddress: string
): Promise<WalletData> {
  // In dev we can force the wallet address to fetch the data for
  const walletAddressLowerCase = (
    FORCE_WALLET_ADDRESS ? FORCE_WALLET_ADDRESS : walletAddress
  ).toLowerCase();

  const [locks, balances, allocations] = await Promise.all([
    getLocks(chainId, walletAddressLowerCase),
    getBalances(chainId, walletAddressLowerCase),
    getAllocations(chainId, walletAddressLowerCase),
  ]);

  return {
    address: walletAddressLowerCase,
    chainId,
    locks,
    balances,
    allocations,
  };
}
