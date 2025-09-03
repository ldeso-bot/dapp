import { Sdk } from '@/shared/utils/subgraph.utils';
import { YieldRates } from '../../models/ProtocolData';
import { getMockMaturationTimestamp, getMockYieldPercent } from './mocks';

// TODO: Replace with actual API call
export const getLockedKVcmYieldRates = async (
  sdk: Sdk
): Promise<YieldRates> => {
  if (!sdk) console.log('');
  const yieldRates: YieldRates = [];
  for (let i = 0; i < 40; i++) {
    const lockDuration = Math.max(0, Math.ceil((getMockMaturationTimestamp(i) * 1000 - new Date().getTime()) / (1000 * 60 * 60 * 1000)))
    yieldRates.push({
      days: (i + 1) * 90 || 0,
      index: i,
      maturityId: `maturity-${i}`,
      maturationTimestamp: getMockMaturationTimestamp(i),
      yieldPercent: getMockYieldPercent(i),
      lockDuration,
      token: 'kvcm',
    });
  }
  return yieldRates;
};
