import { CHAIN_IDS, ChainId } from '../constants/networks.constants';
import {
  AllocatableToken,
  allocatableTokens,
  LockableToken,
  lockableTokens,
  LpToken,
  lpTokens,
  Token,
  tokens,
} from '../constants/tokens.constants';

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

export const isToken = (token: unknown): token is Token => {
  return typeof token === 'string' && Object.keys(tokens).includes(token);
};

export const isAllocatableToken = (
  token: unknown
): token is AllocatableToken => {
  return isToken(token) && Object.keys(allocatableTokens).includes(token);
};

export const isLockableToken = (token: unknown): token is LockableToken => {
  return isToken(token) && Object.keys(lockableTokens).includes(token);
};
