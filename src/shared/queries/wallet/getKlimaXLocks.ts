import { KlimaXLocks } from '@/shared/models/walletData';
import { Sdk } from '@/shared/utils/subgraph.utils';

export const getKlimaXLocks = async (
  sdk: Sdk,
  walletAddress: string
): Promise<KlimaXLocks> => {
  if (!sdk || !walletAddress) console.log('');
  return [
    {
      id: '1',
      balance: 1000,
      valueUSD: 3000,
      apyPercent: 0.1797,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
    },
    {
      id: '2',
      balance: 1000,
      valueUSD: 3000,
      apyPercent: 0.1797,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
    },
    {
      id: '3',
      balance: 1000,
      valueUSD: 3000,
      apyPercent: 0.1797,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
    },
    {
      id: '4',
      balance: 1000,
      valueUSD: 3000,
      apyPercent: 0.1797,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
    },
    {
      id: '5',
      balance: 12.25,
      valueUSD: 36.75,
      apyPercent: 24.03,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
    },
  ];
};
