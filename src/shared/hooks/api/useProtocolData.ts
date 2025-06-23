import { ProtocolData } from '@/shared/models/ProtocolData';
import { useQuery } from '@tanstack/react-query';
import { useApi } from './useApi';
import { useRefetchOnChainChange } from './useRefetchOnChainChange';

export function useProtocolData() {
  const { get } = useApi();

  const q = useQuery({
    queryKey: ['protocol-data'],
    queryFn: async () => get<ProtocolData>('/api/protocol-data'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useRefetchOnChainChange(q.refetch);

  return q;
}
