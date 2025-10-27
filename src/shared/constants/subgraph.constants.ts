import { base, baseSepolia } from 'viem/chains';
import { USE_LOCAL_GRAPH_NODE } from './config.constants';

let subgraphs = {
  [base.id]: {
    carbon: `https://subgraph.satsuma-prod.com/${process.env.SATSUMA_API_KEY}/carbonmark--273197/cm-base-sepolia-carbon-staging/api`,
    protocol: `https://subgraph.satsuma-prod.com/${process.env.SATSUMA_API_KEY}/carbonmark--273197/cm-base-sepolia-protocol-staging/api`,
  },
  [baseSepolia.id]: {
    carbon: `https://subgraph.satsuma-prod.com/${process.env.SATSUMA_API_KEY}/carbonmark--273197/cm-base-sepolia-carbon-staging/api`,
    protocol: `https://subgraph.satsuma-prod.com/${process.env.SATSUMA_API_KEY}/carbonmark--273197/cm-base-sepolia-protocol-staging/api`,
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
