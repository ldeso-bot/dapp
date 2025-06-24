import { Balances } from '@/shared/models/walletData';
import { Sdk } from '@/shared/utils/subgraph.utils';

export const getBalances = async (
  sdk: Sdk,
  walletAddress: string
): Promise<Balances> => {
  if (!sdk || !walletAddress) console.log('');
  return {
    usdc: 1000,
    klima: 1000,
    klimax: 1000,
    'klima/usdc': 1000,
    'klima/klimax': 1000,
  };
};
