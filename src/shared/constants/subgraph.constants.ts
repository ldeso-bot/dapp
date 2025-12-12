import { base, baseSepolia } from 'viem/chains';
import { USE_LOCAL_GRAPH_NODE } from './config.constants';

const GOLDSKY_BASE_URL = `https://api.goldsky.com/api/private/project_cmgzise2h00195np2gbp35g3d/subgraphs`;
const GOLDSKY_API_KEY = process.env.GOLDSKY_API_KEY;

let subgraphs = {
  [base.id]: {
    carbon: `${GOLDSKY_BASE_URL}/cm-base-carbon-production/latest/gn`,
    // TODO: update to latest before going to production
    protocol: `${GOLDSKY_BASE_URL}/cm-base-protocol-production/20251211-145248-139dfdb/gn`,
  },
  [baseSepolia.id]: {
    carbon: `${GOLDSKY_BASE_URL}/cm-base-sepolia-carbon-staging/latest/gn`,
    protocol: `${GOLDSKY_BASE_URL}/cm-base-sepolia-protocol-staging/latest/gn`,
  },
};

let subgraphHeaders: Record<string, string> = {
  Authorization: `Bearer ${GOLDSKY_API_KEY}`,
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
  subgraphHeaders = {};
}

export { subgraphHeaders, subgraphs };
