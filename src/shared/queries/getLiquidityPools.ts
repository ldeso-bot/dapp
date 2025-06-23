import { LiquidityPools } from '@/shared/models/ProtocolData';
import { Sdk } from '@/shared/utils/subgraph.utils';

export const getLiquidityPools = async (sdk: Sdk): Promise<LiquidityPools> => {
  console.log(sdk);
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
      description: 'Lorem Ipsum Dolor',
      tvl: 1200000,
      apy: 0.174,
    },
  ];
};
