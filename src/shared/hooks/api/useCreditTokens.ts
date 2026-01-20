import { ApiCreditToken } from '@/shared/models/shared';
import { useQuery } from '@tanstack/react-query';
import { useApi } from './useApi';
import { useRefetchOnChainChange } from './useRefetchOnChainChange';

/**
 * Hook to fetch credit tokens by their IDs
 * @param creditTokenIds - Array of credit token IDs to fetch
 * @returns React Query result with ApiCreditToken[]
 */
export function useCreditTokens(creditTokenIds: string[]) {
  const { get } = useApi();

  const q = useQuery({
    queryKey: ['credit-tokens', creditTokenIds.sort().join(',')],
    queryFn: async () =>
      get<ApiCreditToken[]>('/api/carbon-data/credits', {
        ids: creditTokenIds.join(','),
      }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: creditTokenIds.length > 0,
  });

  useRefetchOnChainChange(q.refetch);

  return q;
}
