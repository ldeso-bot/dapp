import { LiquidityPools } from '@/shared/models/ProtocolData';
import { Sdk } from '@/shared/utils/subgraph.utils';

export const getLiquidityPools = async (sdk: Sdk): Promise<LiquidityPools> => {
  if (!sdk) console.log('');
  return [
    {
      id: '1',
      token1: 'kvcm',
      token2: 'usdc',
      description: 'Basic Volatile 1.0%',
      tvl: 1200000,
      apyPercent: 0.174,
    },
    {
      id: '2',
      token1: 'kvcm',
      token2: 'k2',
      description: 'Lorem Ipsum Dolor',
      tvl: 1200000,
      apyPercent: 0.174,
    },
  ];
};
