import { Sdk } from '@/shared/utils/subgraph.utils';
import { YieldRates } from '../../models/ProtocolData';

// TODO: Replace with actual API call
export const getCarbonYieldRates = async (sdk: Sdk): Promise<YieldRates> => {
  if (!sdk) console.log('');
  return [
    { durationDays: 30, yieldPercent: 0.1 },
    { durationDays: 60, yieldPercent: 0.4 },
    { durationDays: 180, yieldPercent: 0.6 },
    { durationDays: 365, yieldPercent: 0.425 },
    { durationDays: 365 * 3, yieldPercent: 0.158 },
    { durationDays: 365 * 5, yieldPercent: 0.2 },
    { durationDays: 365 * 10, yieldPercent: 0.85 },
  ];
};
