import { ProtocolData } from '@/shared/models/ProtocolData';
import { getDefaultChainId } from '@/shared/utils/environment.utils';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { useApi } from './useApi';
import { useRefetchOnChainChange } from './useRefetchOnChainChange';

export function useProtocolData() {
  const { get } = useApi();
  const { chain } = useAccount();
  const chainId = chain?.id ?? getDefaultChainId();

  const q = useQuery({
    queryKey: ['protocol-data', chainId],
    queryFn: async () => get<ProtocolData>('/api/protocol-data'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useRefetchOnChainChange(q.refetch);

  return q;
}
