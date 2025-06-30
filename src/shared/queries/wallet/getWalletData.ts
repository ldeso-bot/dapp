import { WalletData } from '@/shared/models/walletData';
import { getAllocations } from '@/shared/queries/wallet/getAllocations';
import { getBalances } from '@/shared/queries/wallet/getBalances';
import { getKVcmLocks } from '@/shared/queries/wallet/getBonds';
import { getK2Locks } from '@/shared/queries/wallet/getKlimaXLocks';
import { getLiquidityPositions } from '@/shared/queries/wallet/getLiquidityPositions';
import { Sdk } from '@/shared/utils/subgraph.utils';

export async function getWalletData(sdk: Sdk, walletAddress: string) {
  /** We enforce the data type to make sure the endpoint respects the interface */
  const [kvcmLocks, liquidityPositions, k2Locks, balances, allocations] =
    await Promise.all([
      getKVcmLocks(sdk, walletAddress),
      getLiquidityPositions(sdk, walletAddress),
      getK2Locks(sdk, walletAddress),
      getBalances(sdk, walletAddress),
      getAllocations(sdk, walletAddress),
    ]);

  const data: WalletData = {
    kvcmLocks,
    liquidityPositions,
    k2Locks,
    balances,
    allocations,
  };

  return data;
}
