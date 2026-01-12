import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { Maturity } from '@/shared/models/ProtocolData';
import { getSdk } from '@/shared/utils/subgraph.utils';
import { getMockMaturationTimestamp, getMockYieldPercent } from './mocks';
import { getActiveMaturities } from './protocol.utils';

export const getMaturities = async (chainId: ChainId): Promise<Maturity[]> => {
  const sdk = getSdk(chainId);
  if (USE_MOCKS) {
    return getMockMaturities();
  }
  const maturities = await getActiveMaturities(sdk);

  return maturities.map((maturity, index): Maturity => {
    return {
      index,
      maturityId: Number(maturity.maturityId),
      maturationTimestamp: Number(maturity.timestamp),
      syntheticYieldZeroCouponYieldCurve:
        maturity.syntheticYieldZeroCouponYieldCurve,
      riskyYieldZeroCouponYieldCurve: maturity.riskyYieldZeroCouponYieldCurve,
    };
  });
};

/**
 * Returns mock maturities
 * @returns
 */
const getMockMaturities = async (): Promise<Maturity[]> => {
  const maturities: Maturity[] = [];
  for (let i = 0; i < 40; i++) {
    maturities.push({
      index: i,
      maturityId: i,
      maturationTimestamp: getMockMaturationTimestamp(i),
      syntheticYieldZeroCouponYieldCurve: 0.01 + getMockYieldPercent(i),
      riskyYieldZeroCouponYieldCurve: getMockYieldPercent(i),
    });
  }
  return maturities;
};
