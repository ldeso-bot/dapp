import { AllMetrics } from '@/shared/models/ProtocolData';
import { Sdk } from '@/shared/utils/subgraph.utils';

export const getTokenMetrics = async (sdk: Sdk): Promise<AllMetrics> => {
  // TODO: This is just a test to see if the sdk is working
  const tokens = await sdk.carbon.getTokensByIds({
    ids: ['0x004090eef602e024b2a6cb7f0c1edda992382994'],
  });
  if (!tokens) console.log('');
  return {
    klimaBonded: {
      valueUSD: 1.32,
      valueChangePercent24h: 0.12,
      amountTonnes: 100,
      amountChangePercent24h: 0.05,
    },
    klimaXLocked: {
      valueUSD: 5.88,
      valueChangePercent24h: -0.01,
      amountTonnes: 80,
      amountChangePercent24h: 0.08,
    },
  };
};
