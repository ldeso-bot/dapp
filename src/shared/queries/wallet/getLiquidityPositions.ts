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
      token1: 'klima',
      token2: 'klimax',
      balance: 1500,
      valueUSD: 3500,
      apyPercent: 0.15,
    },
    {
      id: '2',
      token1: 'klima',
      token2: 'usdc',
      balance: 15.25,
      valueUSD: 46.75,
      apyPercent: 0.1403,
    },
  ];
};
