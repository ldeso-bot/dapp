import './init-env';

import { TypeScriptPluginConfig } from '@graphql-codegen/typescript';
import { TypeScriptDocumentsPluginConfig } from '@graphql-codegen/typescript-operations';

import { base } from 'viem/chains';
import {
  subgraphHeaders,
  subgraphs,
} from '../../shared/constants/subgraph.constants';

const tsConfig: TypeScriptPluginConfig = {
  namingConvention: { enumValues: 'keep' },
};

const tsOperationsConfig: TypeScriptDocumentsPluginConfig = {};

const endpoints = subgraphs[base.id];

const GENERATED_TYPES_DIR = `.generated/gql/types`;
const DOCUMENTS_DIR = `src/scripts/codegen`;

// Generate configuration for each schema entry
const generates = Object.entries(endpoints).reduce(
  (acc, [key, url]) => ({
    ...acc,
    [`${GENERATED_TYPES_DIR}/${key}.types.ts`]: {
      schema: [
        {
          [url]: {
            headers: subgraphHeaders,
          },
        },
      ],
      documents: [
        `${DOCUMENTS_DIR}/${key}.gql`,
        `${DOCUMENTS_DIR}/${key}.fragments.gql`,
      ],
      plugins: [
        {
          typescript: tsConfig,
        },
        {
          'typescript-operations': tsOperationsConfig,
        },
        {
          'typescript-graphql-request': {},
        },
      ],
    },
  }),
  {}
);

const config = {
  overwrite: true,
  generates,
  config: {
    scalars: { BigInt: 'string', ID: 'string' },
    avoidOptionals: true,
  },
};

export default config;
