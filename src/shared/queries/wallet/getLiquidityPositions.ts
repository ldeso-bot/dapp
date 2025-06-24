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
      pair: 'klima/klimax',
      balance: 1000,
      valueUSD: 3000,
      apyPercent: 0.12,
    },
    {
      id: '2',
      pair: 'klima/usdc',
      balance: 12.25,
      valueUSD: 36.75,
      apyPercent: 0.2403,
    },
  ];
};
