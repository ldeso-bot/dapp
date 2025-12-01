import { CHAIN_IDS, ChainId } from '../constants/networks.constants';

export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const is0xString = (value: unknown): value is `0x${string}` =>
  isString(value) && value.startsWith('0x');

export const isChainId = (chain: unknown): chain is ChainId =>
  typeof chain === 'number' && CHAIN_IDS.includes(chain as ChainId);
