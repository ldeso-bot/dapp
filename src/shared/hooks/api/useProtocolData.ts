import { ProtocolData } from '@/shared/models/ProtocolData';
import { useQuery } from '@tanstack/react-query';
import { useChainId } from '../web3/useChainId';
import { useApi } from './useApi';
import { useRefetchOnChainChange } from './useRefetchOnChainChange';

export function useProtocolData() {
  const { get } = useApi();
  const chainId = useChainId();

  const q = useQuery({
    queryKey: ['protocol-data', chainId],
    queryFn: async () => get<ProtocolData>('/api/protocol-data'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useRefetchOnChainChange(q.refetch);

  return q;
}
