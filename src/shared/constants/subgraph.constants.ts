import { base, baseSepolia } from 'viem/chains';

export const subgraphs = {
  [base.id]: {
    carbon:
      'https://api.studio.thegraph.com/query/88565/biwano-polygon-digital-carbon/version/latest',
    protocol:
      'https://api.studio.thegraph.com/query/88565/biwano-carbonmark/version/latest',
  },
  [baseSepolia.id]: {
    carbon:
      'https://api.studio.thegraph.com/query/88565/biwano-polygon-digital-carbon/version/latest',
    protocol:
      'https://api.studio.thegraph.com/query/88565/biwano-carbonmark/version/latest',
  },
};
