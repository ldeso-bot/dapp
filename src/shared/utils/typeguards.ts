import {
  ValidNetworkId as ValidChainId,
  validChainIds,
} from '../constants/networks.constants';

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}
export function is0xString(value: unknown): value is `0x${string}` {
  return isString(value) && value.startsWith('0x');
}
export function isChainId(value: number): value is ValidChainId {
  return validChainIds.includes(value as ValidChainId);
}
