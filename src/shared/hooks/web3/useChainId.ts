import { DEFAULT_TO_TESTNET } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { isChainId } from '@/shared/utils/typeguards';
import { base, baseSepolia } from 'viem/chains';
import { useAccount } from 'wagmi';

export function useChainId(): ChainId {
  const { chain } = useAccount();

  const defaultChainId = DEFAULT_TO_TESTNET ? baseSepolia.id : base.id;

  const chainId: ChainId = isChainId(chain?.id) ? chain?.id : defaultChainId;

  return chainId;
}
