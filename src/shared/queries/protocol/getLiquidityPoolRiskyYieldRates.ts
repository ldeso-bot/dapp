import { Sdk } from '@/shared/utils/subgraph.utils';
import { YieldRates } from '../../models/ProtocolData';
import { getMockMaturationTimestamp, getMockYieldPercent } from './mocks';

// TODO: Replace with actual API call
export const getLiquidityPoolRiskyYieldRates = async (
  sdk: Sdk
): Promise<YieldRates> => {
  if (!sdk) console.log('');
  const yieldRates: YieldRates = [];
  for (let i = 0; i < 40; i++) {
    yieldRates.push({
      index: i,
      maturityId: `maturity-${i}`,
      maturationTimestamp: getMockMaturationTimestamp(i),
      yieldPercent: getMockYieldPercent(i),
      token: 'kvcm-usdc',
    });
  }
  return yieldRates;
};
