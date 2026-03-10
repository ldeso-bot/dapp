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
      apys: {
        k2: {
          kvcmApy: maturity.midnightInfo?.kvcmApyFor.k2 ?? 0,
          k2Apy: maturity.midnightInfo?.k2ApyFor.k2 ?? 0,
        },
        kvcm: {
          kvcmApy: maturity.liveApys?.kvcm.kvcmApy ?? 0,
          k2Apy: maturity.midnightInfo?.k2ApyFor.kvcm ?? 0,
        },
        'kvcm-k2': {
          kvcmApy: maturity.midnightInfo?.kvcmApyFor['kvcm-k2'] ?? 0,
          k2Apy: maturity.midnightInfo?.k2ApyFor['kvcm-k2'] ?? 0,
        },
        'kvcm-usdc': {
          kvcmApy: maturity.midnightInfo?.kvcmApyFor['kvcm-usdc'] ?? 0,
          k2Apy: maturity.midnightInfo?.k2ApyFor['kvcm-usdc'] ?? 0,
        },
      },
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
      apys: {
        kvcm: {
          kvcmApy: getMockYieldPercent(i),
          k2Apy: getMockYieldPercent(i),
        },
        'kvcm-k2': {
          kvcmApy: getMockYieldPercent(i),
          k2Apy: getMockYieldPercent(i),
        },
        k2: {
          kvcmApy: getMockYieldPercent(i),
          k2Apy: getMockYieldPercent(i),
        },
        'kvcm-usdc': {
          kvcmApy: getMockYieldPercent(i),
          k2Apy: getMockYieldPercent(i),
        },
      },
    });
  }
  return maturities;
};
