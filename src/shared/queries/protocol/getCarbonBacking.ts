import { Sdk } from '@/shared/utils/subgraph.utils';
import { CarbonBacking } from '../../models/ProtocolData';

// TODO: Replace with actual API call
export const getCarbonBacking = async (sdk: Sdk): Promise<CarbonBacking> => {
  if (!sdk) console.log('');
  return {
    totalTonnes: 200468322,
    marketValueUSD: 415835557,
    breakdown: [
      { category: 'Carbon Futures', amountTonnes: 450578 },
      { category: 'Removal - High Durability', amountTonnes: 518125 },
      { category: 'Removal - Biochar', amountTonnes: 300000 },
      { category: 'Removal - NBS', amountTonnes: 992048 },
      { category: 'Mitigation - NBS', amountTonnes: 58200 },
      { category: 'Avoidance - Energy Efficiency', amountTonnes: 785100 },
    ],
  };
};
