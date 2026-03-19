import { DEFAULT_TO_TESTNET } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { base, baseSepolia } from 'viem/chains';

export function useChainId(): ChainId {
  return DEFAULT_TO_TESTNET ? baseSepolia.id : base.id;
}
