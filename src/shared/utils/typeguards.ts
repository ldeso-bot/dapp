import { CHAIN_IDS, ChainId } from '../constants/networks.constants';

export const isChainId = (chain: unknown): chain is ChainId =>
  typeof chain === 'number' && CHAIN_IDS.includes(chain as ChainId);
