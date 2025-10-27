import { base, baseSepolia } from 'viem/chains';
import { USE_LOCAL_GRAPH_NODE } from './config.constants';

let subgraphs = {
  [base.id]: {
    carbon:
      'https://api.studio.thegraph.com/query/88565/biwano-carbon/version/latest',
    protocol:
      'https://api.studio.thegraph.com/query/88565/biwano-protocol/version/latest',
  },
  [baseSepolia.id]: {
    carbon:
      'https://api.studio.thegraph.com/query/88565/biwano-carbon/version/latest',
    protocol:
      'https://api.studio.thegraph.com/query/88565/biwano-protocol/version/latest',
  },
};

if (USE_LOCAL_GRAPH_NODE) {
  console.warn('Using local graph node');
  subgraphs = {
    [base.id]: {
      carbon: 'http://localhost:8000/subgraphs/name/carbon',
      protocol: 'http://localhost:8000/subgraphs/name/protocol',
    },
    [baseSepolia.id]: {
      carbon: 'http://localhost:8000/subgraphs/name/carbon',
      protocol: 'http://localhost:8000/subgraphs/name/protocol',
    },
  };
}

export { subgraphs };
