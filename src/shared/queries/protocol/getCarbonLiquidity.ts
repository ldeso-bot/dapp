import { Sdk } from '@/shared/utils/subgraph.utils';
import { CarbonLiquidity } from '../../models/ProtocolData';

// TODO: Replace with actual API call
export const getCarbonLiquidity = async (
  sdk: Sdk
): Promise<CarbonLiquidity> => {
  if (!sdk) console.log('');
  return {
    marketValueUSD: 98835557,
    breakdown: [
      { category: 'kVCM / K2', valueUSD: 400000 },
      { category: 'kVCM / USDC', valueUSD: 385000 },
      { category: 'veAERO', valueUSD: 798245 },
    ],
  };
};
