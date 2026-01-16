import { useCallback } from 'react';
import { useChainId } from '../web3/useChainId';

export function useApi() {
  const chainId = useChainId();

  const get = useCallback(
    async <T>(
      path: string,
      queryParams: Record<string, string> = {}
    ): Promise<T> => {
      const query = new URLSearchParams(queryParams ?? {});
      query.set('chainId', chainId.toString());
      const url = `${path}?${query.toString()}`;
      const response = await fetch(url);
      return response.json();
    },
    [chainId]
  );

  return {
    get,
  };
}
