import { DEFAULT_TO_TESTNET } from '@/shared/constants/config.constants';
import { useCallback } from 'react';
import { base, baseSepolia } from 'viem/chains';
import { useAccount } from 'wagmi';

export function useApi() {
  const { chain } = useAccount();

  const get = useCallback(
    async <T>(
      path: string,
      queryParams: Record<string, string> = {}
    ): Promise<T> => {
      const defaultChainId = DEFAULT_TO_TESTNET ? baseSepolia.id : base.id;
      const query = new URLSearchParams(queryParams ?? {});
      query.set('chainId', (chain?.id ?? defaultChainId).toString());
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
