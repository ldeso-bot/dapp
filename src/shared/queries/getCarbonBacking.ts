import { Sdk } from '@/shared/utils/subgraph.utils';
import { CarbonBacking } from '../models/ProtocolData';

// TODO: Replace with actual API call
export const getCarbonBacking = async (sdk: Sdk): Promise<CarbonBacking> => {
  if (!sdk) console.log('');
  return {
    totalTonnes: 200468322,
    marketValueUSD: 415835557,
    breakdown: [
      { category: 'Carbon Futures', tonnes: 450578 },
      { category: 'Removal - High Durability', tonnes: 518125 },
      { category: 'Removal - Biochar', tonnes: 300000 },
      { category: 'Removal - NBS', tonnes: 992048 },
      { category: 'Mitigation - NBS', tonnes: 58200 },
      { category: 'Avoidance - Energy Efficiency', tonnes: 785100 },
    ],
  };
};
