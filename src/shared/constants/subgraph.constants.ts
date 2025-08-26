import { base, baseSepolia } from 'viem/chains';

export const subgraphs = {
  [base.id]: {
    carbon:
      'https://api.studio.thegraph.com/query/78559/polygon-digital-carbon/version/latest',
    protocol:
      'https://api.studio.thegraph.com/query/78559/klimadao-carbonmark/version/latest',
  },
  [baseSepolia.id]: {
    carbon:
      'https://api.studio.thegraph.com/query/78559/polygon-digital-carbon/version/latest',
    protocol:
      'https://api.studio.thegraph.com/query/78559/klimadao-carbonmark/version/latest',
  },
};
