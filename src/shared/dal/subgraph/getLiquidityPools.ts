import { Token } from '@/shared/constants/tokens.constants';

export type LiquidityPoolInfo = {
  id: string;
  token1: Token; // e.g., 'klima'
  token2: Token; // e.g., 'usdc'
  tvl: number; // Total Value Locked in USD
  description: string; // e.g., 'Basic Volatile 1.0%'
  apy: number; // Annual Percentage Yield
};

export const getLiquidityPools = async () => {
  return [
    {
      id: '1',
      token1: 'klima',
      token2: 'usdc',
      description: 'Basic Volatile 1.0%',
      tvl: 1200000,
      apy: 0.174,
    },
    {
      id: '2',
      token1: 'klima',
      token2: 'klimax',
      description: 'Lorem Ipsum Dolor Sit Amet',
      tvl: 1200000,
      apy: 0.174,
    },
  ];
};
