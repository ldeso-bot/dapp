import { Sdk } from '@/shared/utils/subgraph.utils';
import { CarbonMarket } from '../models/ProtocolData';

// TODO: Replace with actual API call
export const getCarbonMarket = async (sdk: Sdk): Promise<CarbonMarket> => {
  if (!sdk) console.log('');
  return [
    { category: 'Removal - High Durability', capacity: 2000, price: 70 },
    { category: 'Removal - Biochar', capacity: 9000, price: 3 },
    { category: 'Removal - NBS', capacity: 8000, price: 10 },
    { category: 'Mitigation - NBS', capacity: 115000, price: 1 },
    {
      category: 'Avoidance - Energy Efficiency',
      capacity: 3000,
      price: 9,
    },
  ];
};
