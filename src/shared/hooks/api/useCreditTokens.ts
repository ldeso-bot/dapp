import { ApiCreditToken, CarbonClass } from '@/shared/models/shared';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useApi } from './useApi';
import { useRefetchOnChainChange } from './useRefetchOnChainChange';

/**
 * Hook to fetch credit tokens by their IDs
 * @param creditTokenIds - Array of credit token IDs to fetch
 * @returns React Query result with ApiCreditToken[]
 */
function useCreditTokens(creditTokenIds: string[]) {
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

type RegisteredCreditToken = ApiCreditToken & {
  amount: number;
};
/**
 * Hook to fetch information about carbon class registered tokens by their IDs
 * @param carbonClass - Carbon class
 * @returns React Query result with RegisteredCreditToken[]
 */
export const useCarbonClassRegisteredCreditTokens = (
  carbonClass?: CarbonClass
) => {
  const { data, ...rest } = useCreditTokens(
    carbonClass?.registeredTokens.map((t) => t.creditTokenId) ?? []
  );

  const registeredCreditTokens = useMemo(() => {
    if (!carbonClass) {
      return;
    }
    return data?.map((t) => {
      const registeredToken = carbonClass.registeredTokens.find(
        (r) => r.creditTokenId === t.creditTokenId
      );

      return {
        ...t,
        amount: registeredToken?.amount ?? 0,
      } satisfies RegisteredCreditToken;
    });
  }, [data, carbonClass]);

  return { data: registeredCreditTokens, ...rest };
};
