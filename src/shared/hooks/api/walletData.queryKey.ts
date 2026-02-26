export const getWalletDataQueryKey = (chainId?: number, address?: string) =>
  ['wallet-data', chainId, address] as const;
