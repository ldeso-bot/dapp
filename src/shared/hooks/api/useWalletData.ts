import { WalletData } from '@/shared/models/walletData';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { useApi } from './useApi';
import { useRefetchOnChainChange } from './useRefetchOnChainChange';

export function useWalletData() {
  const { get } = useApi();
  const { address } = useAccount();

  const q = useQuery({
    queryKey: [`wallet-data-${address}`],
    queryFn: async () =>
      get<WalletData>('/api/wallet-data', {
        walletAddress: address ?? '',
      }),
    staleTime: 60 * 1000, // 1 minute
    enabled: !!address,
  });

  useRefetchOnChainChange(q.refetch);

  return q;
}
