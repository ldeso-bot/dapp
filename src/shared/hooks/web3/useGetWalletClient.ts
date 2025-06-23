import { DEFAULT_CHAIN_ID } from '@/shared/constants/networks.constants';
import { useWalletClient } from 'wagmi';

export const useGetWalletClient = () => {
  return useWalletClient({
    chainId: DEFAULT_CHAIN_ID,
  });
};
