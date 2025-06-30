import { Balances } from '@/shared/models/walletData';
import { Sdk } from '@/shared/utils/subgraph.utils';

export const getBalances = async (
  sdk: Sdk,
  walletAddress: string
): Promise<Balances> => {
  if (!sdk || !walletAddress) console.log('');
  return {
    usdc: 1000,
    kvcm: 1000,
    k2: 1000,
    'kvcm/usdc': 1000,
    'kvcm/k2': 1000,
  };
};
