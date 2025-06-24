import { Sdk } from '@/shared/utils/subgraph.utils';
import { CarbonMarket } from '../../models/ProtocolData';

// TODO: Replace with actual API call
export const getCarbonMarket = async (sdk: Sdk): Promise<CarbonMarket> => {
  if (!sdk) console.log('');
  return [
    {
      category: 'Removal - High Durability',
      capacityTonnes: 2000,
      priceUSD: 70,
    },
    { category: 'Removal - Biochar', capacityTonnes: 9000, priceUSD: 3 },
    { category: 'Removal - NBS', capacityTonnes: 8000, priceUSD: 10 },
    { category: 'Mitigation - NBS', capacityTonnes: 115000, priceUSD: 1 },
    {
      category: 'Avoidance - Energy Efficiency',
      capacityTonnes: 3000,
      priceUSD: 9,
    },
  ];
};
