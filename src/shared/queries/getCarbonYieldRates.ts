import { Sdk } from '@/shared/utils/subgraph.utils';
import { YieldRates } from '../models/ProtocolData';

// TODO: Replace with actual API call
export const getCarbonYieldRates = async (sdk: Sdk): Promise<YieldRates> => {
  if (!sdk) console.log('');
  return [
    { durationDays: 30, yieldPercentage: 0.1 },
    { durationDays: 60, yieldPercentage: 0.4 },
    { durationDays: 180, yieldPercentage: 0.6 },
    { durationDays: 365, yieldPercentage: 0.425 },
    { durationDays: 365 * 3, yieldPercentage: 0.158 },
    { durationDays: 365 * 5, yieldPercentage: 0.2 },
    { durationDays: 365 * 10, yieldPercentage: 0.85 },
  ];
};
