import { CHAIN_IDS, ChainId } from '../constants/networks.constants';
import { LpToken, lpTokens } from '../constants/tokens.constants';

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}
export function is0xString(value: unknown): value is `0x${string}` {
  return isString(value) && value.startsWith('0x');
}

export const isChainId = (chain: unknown): chain is ChainId => {
  return typeof chain === 'number' && CHAIN_IDS.includes(chain as ChainId);
};

export const isLpToken = (token: unknown): token is LpToken => {
  return typeof token === 'string' && Object.keys(lpTokens).includes(token);
};
