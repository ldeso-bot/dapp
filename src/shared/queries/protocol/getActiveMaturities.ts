import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { Maturity } from '@/shared/models/ProtocolData';
import { getSdk } from '@/shared/utils/subgraph.utils';
import { getMockMaturationTimestamp, getMockYieldPercent } from './mocks';
import { getActiveMaturitiesWithDistribution } from './yieldCurve.utils';

export const getMaturities = async (chainId: ChainId): Promise<Maturity[]> => {
  const sdk = getSdk(chainId);
  if (USE_MOCKS) {
    return getMockMaturities();
  }
  const activeMaturitiesDistribution =
    await getActiveMaturitiesWithDistribution(sdk);

  const maturities = Object.values(activeMaturitiesDistribution);

  return maturities;
};

/**
 * Returns mock maturities
 * @returns
 */
const getMockMaturities = async (): Promise<Maturity[]> => {
  const maturities: Maturity[] = [];
  for (let i = 0; i < 40; i++) {
    maturities.push({
      maturityId: i,
      maturationTimestamp: getMockMaturationTimestamp(i),
      kvcmUsdcLPLocked: 0,
      kvcmK2LPLocked: 0,
      kvcmLocked: 0,
      apys: {
        kvcm: {
          kvcmApy: getMockYieldPercent(i),
          k2Apy: getMockYieldPercent(i),
          kvcmEquivalentLocked: 0,
          k2EquivalentLocked: 0,
          k2Distributed: 0,
          kvcmDistributed: 0,
        },
        'kvcm-k2': {
          kvcmApy: getMockYieldPercent(i),
          k2Apy: getMockYieldPercent(i),
          kvcmEquivalentLocked: 0,
          k2EquivalentLocked: 0,
          k2Distributed: 0,
          kvcmDistributed: 0,
        },
        k2: {
          kvcmApy: getMockYieldPercent(i),
          k2Apy: getMockYieldPercent(i),
          kvcmEquivalentLocked: 0,
          k2EquivalentLocked: 0,
          k2Distributed: 0,
          kvcmDistributed: 0,
        },
        'kvcm-usdc': {
          kvcmApy: getMockYieldPercent(i),
          k2Apy: getMockYieldPercent(i),
          kvcmEquivalentLocked: 0,
          k2EquivalentLocked: 0,
          k2Distributed: 0,
          kvcmDistributed: 0,
        },
      },
    });
  }
  return maturities;
};
