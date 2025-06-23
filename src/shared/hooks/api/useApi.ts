import { useCallback } from 'react';
import { base } from 'viem/chains';
import { useAccount } from 'wagmi';

export function useApi() {
  const { chain } = useAccount();

  const get = useCallback(
    async <T>(path: string): Promise<T> => {
      const query = new URLSearchParams();
      query.set('chainId', (chain?.id ?? base.id).toString());
      const url = `${path}?${query.toString()}`;
      const response = await fetch(url);
      return response.json();
    },
    [chain]
  );

  return {
    get,
  };
}
