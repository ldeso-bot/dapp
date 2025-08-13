import { Locks } from '@/shared/models/walletData';
import { Sdk } from '@/shared/utils/subgraph.utils';

export const getLocks = async (
  sdk: Sdk,
  walletAddress: string
): Promise<Locks> => {
  if (!sdk || !walletAddress) console.log('');
  return [
    {
      id: '1',
      balance: 1000,
      valueUSD: 3000,
      apyPercent: 0.12,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
      endTimestamp: 1719859200,
      token: 'kvcm',
    },
    {
      id: '2',
      balance: 12.25,
      valueUSD: 36.75,
      apyPercent: 0.2403,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
      endTimestamp: 1719859200,
      token: 'kvcm',
    },
    {
      id: '1',
      balance: 1000,
      valueUSD: 3000,
      apyPercent: 0.1797,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
      endTimestamp: 1719859200,
      token: 'k2',
    },
    {
      id: '2',
      balance: 1000,
      valueUSD: 3000,
      apyPercent: 0.1797,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
      endTimestamp: 1719859200,
      token: 'k2',
    },
    {
      id: '3',
      balance: 1000,
      valueUSD: 3000,
      apyPercent: 0.1797,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
      endTimestamp: 1719859200,
      token: 'k2',
    },
    {
      id: '4',
      balance: 1000,
      valueUSD: 3000,
      apyPercent: 0.1797,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
      endTimestamp: 1719859200,
      token: 'k2',
    },
    {
      id: '5',
      balance: 12.25,
      valueUSD: 36.75,
      apyPercent: 0.2403,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
      endTimestamp: 1719859200,
      token: 'k2',
    },
  ];
};
