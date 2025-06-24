import { Bonds } from '@/shared/models/walletData';
import { Sdk } from '@/shared/utils/subgraph.utils';

export const getBonds = async (
  sdk: Sdk,
  walletAddress: string
): Promise<Bonds> => {
  if (!sdk || !walletAddress) console.log('');
  return [
    {
      id: '1',
      balance: 1000,
      valueUSD: 3000,
      apyPercent: 0.12,
    },
    {
      id: '2',
      balance: 12.25,
      valueUSD: 36.75,
      apyPercent: 0.2403,
    },
  ];
};
