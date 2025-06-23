import { Sdk } from '@/shared/utils/subgraph.utils';
import { KlimaBondYieldRates } from '../models/ProtocolData';

// TODO: Replace with actual API call
export const getKlimaBondYieldRates = async (
  sdk: Sdk
): Promise<KlimaBondYieldRates> => {
  console.log(sdk);
  return [
    { durationDays: 1, yieldPercentage: 5.2 },
    { durationDays: 2, yieldPercentage: 5.5 },
    { durationDays: 3, yieldPercentage: 5.8 },
    { durationDays: 4, yieldPercentage: 6.1 },
    { durationDays: 5, yieldPercentage: 6.3 },
    { durationDays: 6, yieldPercentage: 6.5 },
    { durationDays: 7, yieldPercentage: 6.7 },
  ];
};
