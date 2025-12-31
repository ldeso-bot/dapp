import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

type RefetchOptions = {
  queryKey: string[];
  maxRetries?: number;
  retryDelay?: number;
  validate?: (data: unknown) => boolean;
};

/**
 * Hook to refetch query data with retry logic.
 * Useful for waiting for subgraph to index blockchain data.
 */
export const useRefetchWithRetry = () => {
  const queryClient = useQueryClient();

  const refetchWithRetry = useCallback(
    async (options: RefetchOptions): Promise<boolean> => {
      const {
        queryKey,
        maxRetries = 10,
        retryDelay = 1000,
        validate,
      } = options;

      let attempts = 0;

      while (attempts < maxRetries) {
        if (attempts > 0) {
          const delay = retryDelay * Math.pow(1.5, attempts - 1);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
        await queryClient.refetchQueries({ queryKey, type: 'active' });
        const data = queryClient.getQueryData(queryKey);
        if (validate && validate(data)) {
          return true;
        }
        attempts++;
      }
      // Max retries exhausted, invalidate to mark as stale
      await queryClient.invalidateQueries({ queryKey });
      return false;
    },
    [queryClient]
  );
  return { refetchWithRetry };
};
