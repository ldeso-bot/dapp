import { WalletData } from '@/shared/models/walletData';
import { getAllocations } from '@/shared/queries/wallet/getAllocations';
import { getBalances } from '@/shared/queries/wallet/getBalances';
import { getLiquidityPositions } from '@/shared/queries/wallet/getLiquidityPositions';
import { getLocks } from '@/shared/queries/wallet/getLocks';
import { Sdk } from '@/shared/utils/subgraph.utils';

export async function getWalletData(sdk: Sdk, walletAddress: string) {
  /** We enforce the data type to make sure the endpoint respects the interface */
  const [locks, liquidityPositions, balances, allocations] = await Promise.all([
    getLocks(sdk, walletAddress),
    getLiquidityPositions(sdk, walletAddress),
    getBalances(sdk, walletAddress),
    getAllocations(sdk, walletAddress),
  ]);

  const data: WalletData = {
    locks,
    liquidityPositions,
    balances,
    allocations,
  };

  return data;
}
