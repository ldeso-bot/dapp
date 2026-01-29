import { useWalletData } from './useWalletData';

export function useLock(lockId: string) {
  const { data: walletData, ...rest } = useWalletData();

  const lock = walletData?.locks.find((lock) => lock.id === lockId);

  return { data: lock, ...rest };
}
