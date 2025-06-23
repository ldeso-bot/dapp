import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

let savedChainId: number | undefined = undefined;

/**
 * Hook that triggers a refetch when the connected chain changes
 * @param refetch The refetch function from a react-query hook
 */
export function useRefetchOnChainChange<T>(
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<T, Error>>
) {
  const { chain } = useAccount();
  useEffect(() => {
    if (savedChainId != chain?.id) {
      savedChainId = chain?.id;
      refetch();
    }
  }, [chain?.id, refetch]);
}
