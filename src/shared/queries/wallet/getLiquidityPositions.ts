import { LiquidityPositions } from '@/shared/models/walletData';
import { Sdk } from '@/shared/utils/subgraph.utils';

export const getLiquidityPositions = async (
  sdk: Sdk,
  walletAddress: string
): Promise<LiquidityPositions> => {
  if (!sdk || !walletAddress) console.log('');
  return [
    {
      id: '1',
      token: 'kvcm-k2',
      balance: 1500,
      valueUSD: 3500,
      apyPercent: 0.15,
      rewards: {
        k2: 100,
        kvcm: 200,
      },
    },
    {
      id: '2',
      token: 'kvcm-usdc',
      balance: 15.25,
      valueUSD: 46.75,
      apyPercent: 0.1403,
      rewards: {
        k2: 150,
        kvcm: 300,
      },
    },
  ];
};
