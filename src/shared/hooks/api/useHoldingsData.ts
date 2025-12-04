import { Lock } from '@/shared/models/walletData';
import { useProtocolData } from './useProtocolData';
import { useWalletData } from './useWalletData';

/**
 *
 * @returns Aggregated holdings data for the current wallet
 */
export function useHoldingsData() {
  const { data: walletData } = useWalletData();
  const { data: protocolData } = useProtocolData();

  if (!walletData || !protocolData) return null;

  const locks = walletData.locks;
  const metrics = protocolData.metrics;

  const locksSum = (func: (lock: Lock) => number): number =>
    locks.reduce((acc, lock) => acc + func(lock), 0);

  const kvcmLockedAmount = locksSum((lock) =>
    lock.token === 'kvcm' ? lock.balance : 0
  );
  const k2LockedAmount = locksSum((lock) =>
    lock.token === 'k2' ? lock.balance : 0
  );
  const kvcmUsdcLockedAmount = locksSum((lock) =>
    lock.token === 'kvcm-usdc' ? lock.balance : 0
  );
  const kvcmK2LockedAmount = locksSum((lock) =>
    lock.token === 'kvcm-k2' ? lock.balance : 0
  );

  const kvcmClaimableFromKvcmAmount = locksSum((lock) =>
    lock.token === 'kvcm' ? lock.rewards.kvcm : 0
  );
  const kvcmClaimableFromK2Amount = locksSum((lock) =>
    lock.token === 'k2' ? lock.rewards.kvcm : 0
  );
  const kvcmClaimableFromKvcmK2LpAmount = locksSum((lock) =>
    lock.token === 'kvcm-k2' ? lock.rewards.kvcm : 0
  );
  const kvcmClaimableFromKvcmUsdcLpAmount = locksSum((lock) =>
    lock.token === 'kvcm-usdc' ? lock.rewards.kvcm : 0
  );
  const kvcmClaimableAmount =
    kvcmClaimableFromKvcmAmount +
    kvcmClaimableFromK2Amount +
    kvcmClaimableFromKvcmK2LpAmount +
    kvcmClaimableFromKvcmUsdcLpAmount;

  const k2ClaimableFromKvcmAmount = locksSum((lock) =>
    lock.token === 'kvcm' ? lock.rewards.k2 : 0
  );
  const k2ClaimableFromK2Amount = locksSum((lock) =>
    lock.token === 'k2' ? lock.rewards.k2 : 0
  );
  const k2ClaimableFromKvcmK2LpAmount = locksSum((lock) =>
    lock.token === 'kvcm-k2' ? lock.rewards.k2 : 0
  );
  const k2ClaimableAmount =
    k2ClaimableFromKvcmAmount +
    k2ClaimableFromK2Amount +
    k2ClaimableFromKvcmK2LpAmount;

  const kvcmLockedValue = kvcmLockedAmount * metrics.kvcm.valueUSD;
  const k2LockedValue = k2LockedAmount * metrics.k2.valueUSD;
  const kvcmUsdcLockedValue = kvcmUsdcLockedAmount * metrics.kvcm.valueUSD;
  const kvcmK2LockedValue = kvcmK2LockedAmount * metrics.kvcm.valueUSD;
  const liquidityLockedValue = kvcmUsdcLockedValue + kvcmK2LockedValue;

  const lockedValue = kvcmLockedValue + k2LockedValue + liquidityLockedValue;

  const kvcmClaimableValue = kvcmClaimableAmount * metrics.kvcm.valueUSD;
  const k2ClaimableValue = k2ClaimableAmount * metrics.k2.valueUSD;
  const claimableValue = kvcmClaimableValue + k2ClaimableValue;

  const portfolioValue = lockedValue + claimableValue;

  const res = {
    kvcmLockedAmount,
    k2LockedAmount,
    kvcmUsdcLockedAmount,
    kvcmK2LockedAmount,
    kvcmClaimableFromKvcmAmount,
    kvcmClaimableFromK2Amount,
    kvcmClaimableFromKvcmK2LpAmount,
    kvcmClaimableFromKvcmUsdcLpAmount,
    kvcmClaimableAmount,
    k2ClaimableFromKvcmAmount,
    k2ClaimableFromK2Amount,
    k2ClaimableFromKvcmK2LpAmount,
    k2ClaimableAmount,
    kvcmLockedValue,
    k2LockedValue,
    kvcmUsdcLockedValue,
    kvcmK2LockedValue,
    liquidityLockedValue,
    lockedValue,
    claimableValue,
    portfolioValue,
  };
  return res;
}
