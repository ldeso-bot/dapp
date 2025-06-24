import { Sdk } from '@/shared/utils/subgraph.utils';
import { CarbonBacking } from '../models/ProtocolData';

// TODO: Replace with actual API call
export const getCarbonBacking = async (sdk: Sdk): Promise<CarbonBacking> => {
  if (!sdk) console.log('');
  return {
    totalTonnes: 200468322,
    marketValueUSD: 415835557,
    breakdown: [
      { label: 'Carbon Futures', value: 450578 },
      { label: 'Removal - High Durability', value: 518125 },
      { label: 'Removal - Biochar', value: 300000 },
      { label: 'Removal - NBS', value: 992048 },
      { label: 'Mitigation - NBS', value: 58200 },
      { label: 'Avoidance - Energy Efficiency', value: 785100 },
    ],
  };
};
