import { Metrics } from '@/shared/models/ProtocolData';
import { Sdk } from '@/shared/utils/subgraph.utils';

export const getMetrics = async (sdk: Sdk): Promise<Metrics> => {
  // TODO: This is just a test to see if the sdk is working
  const tokens = await sdk.carbon.getTokensByIds({
    ids: ['0x004090eef602e024b2a6cb7f0c1edda992382994'],
  });
  console.log(tokens);

  return {
    klima: {
      valueUSD: 1.32,
      valueChangePercentage24h: 0.12,
      amountTonnes: 100,
    },
  };
};
