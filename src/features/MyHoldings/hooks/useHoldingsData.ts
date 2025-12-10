import { useCurrentTimestamp } from '@/shared/hooks/useCurrentTimestamp';
import { Lock } from '@/shared/models/walletData';
import { useProtocolData } from '../../../shared/hooks/api/useProtocolData';
import { useWalletData } from '../../../shared/hooks/api/useWalletData';

const filterActiveLocks = (locks: Lock[]) =>
  locks.filter((lock) => lock.status === 'active');

const filterMaturedLocks = (locks: Lock[]) =>
  locks.filter((lock) => lock.status === 'matured');

const filterSoonToBeMaturedLocks = (
  locks: Lock[],
  currentTimestamp: number
) => {
  const soonToBeMaturedTimestamp = currentTimestamp + 30 * 24 * 60 * 60;
  return locks.filter((lock) => lock.lockedUntil < soonToBeMaturedTimestamp);
};

const locksSum = (locks: Lock[], func: (lock: Lock) => number): number =>
  locks.reduce((acc, lock) => acc + func(lock), 0);

/**
 * Hook for kVCM token holdings data
 */
function useKvmHoldingsData() {
  const { data: walletData } = useWalletData();
  const { data: protocolData } = useProtocolData();
  const currentTimestamp = useCurrentTimestamp();

  if (!walletData || !protocolData) return null;

  const metrics = protocolData.metrics;

  // Balance
  const balanceValue = walletData.balances.kvcm * metrics.kvcm.valueUSD;

  // Filtered locks
  const locks = walletData.locks.filter((lock) => lock.token === 'kvcm');
  const activeLocks = filterActiveLocks(locks);
  const maturedLocks = filterMaturedLocks(locks);
  const soonToBeMaturedLocks = filterSoonToBeMaturedLocks(
    activeLocks,
    currentTimestamp
  );

  // Locked amount
  const lockedAmount = locksSum(locks, (lock) => lock.balance);

  // Locked value
  const lockedValue = lockedAmount * metrics.kvcm.valueUSD;

  // Claimable amounts
  const kvcmClaimableAmount = locksSum(locks, (lock) => lock.rewards.kvcm);
  const k2ClaimableAmount = locksSum(locks, (lock) => lock.rewards.k2);

  // Claimable values
  const kvcmClaimableValue = kvcmClaimableAmount * metrics.kvcm.valueUSD;
  const k2ClaimableValue = k2ClaimableAmount * metrics.k2.valueUSD;
  const claimableValue = kvcmClaimableValue + k2ClaimableValue;

  return {
    balanceValue,
    lockedAmount,
    locks,
    activeLocks,
    maturedLocks,
    soonToBeMaturedLocks,
    lockedValue,
    kvcmClaimableAmount,
    k2ClaimableAmount,
    kvcmClaimableValue,
    k2ClaimableValue,
    claimableValue,
  };
}

/**
 * Hook for K2 token holdings data
 */
function useK2HoldingsData() {
  const { data: walletData } = useWalletData();
  const { data: protocolData } = useProtocolData();
  const currentTimestamp = useCurrentTimestamp();

  if (!walletData || !protocolData) return null;

  const metrics = protocolData.metrics;

  // Balance
  const balanceValue = walletData.balances.k2 * metrics.k2.valueUSD;

  // Filtered locks
  const locks = walletData.locks.filter((lock) => lock.token === 'k2');
  const activeLocks = filterActiveLocks(locks);
  const maturedLocks = filterMaturedLocks(locks);
  const soonToBeMaturedLocks = filterSoonToBeMaturedLocks(
    activeLocks,
    currentTimestamp
  );

  // Locked amount
  const lockedAmount = locksSum(locks, (lock) => lock.balance);

  // Locked value
  const lockedValue = lockedAmount * metrics.k2.valueUSD;

  // Claimable amounts
  const k2ClaimableAmount = locksSum(locks, (lock) => lock.rewards.k2);
  const kvcmClaimableAmount = locksSum(locks, (lock) => lock.rewards.kvcm);

  // Claimable values
  const k2ClaimableValue = k2ClaimableAmount * metrics.k2.valueUSD;
  const kvcmClaimableValue = kvcmClaimableAmount * metrics.kvcm.valueUSD;
  const claimableValue = k2ClaimableValue + kvcmClaimableValue;

  return {
    balanceValue,
    lockedAmount,
    locks,
    activeLocks,
    maturedLocks,
    soonToBeMaturedLocks,
    lockedValue,
    k2ClaimableAmount,
    kvcmClaimableAmount,
    k2ClaimableValue,
    kvcmClaimableValue,
    claimableValue,
  };
}

/**
 * Hook for KVCM-K2 LP token holdings data
 */
function useKvcmK2HoldingsData() {
  const { data: walletData } = useWalletData();
  const { data: protocolData } = useProtocolData();
  const currentTimestamp = useCurrentTimestamp();

  if (!walletData || !protocolData) return null;

  const metrics = protocolData.metrics;

  // Balance
  const balanceValue =
    walletData.balances['kvcm-k2'] * metrics['kvcm-k2'].valueUSD;

  // Filtered locks
  const locks = walletData.locks.filter((lock) => lock.token === 'kvcm-k2');
  const activeLocks = filterActiveLocks(locks);
  const maturedLocks = filterMaturedLocks(locks);
  const soonToBeMaturedLocks = filterSoonToBeMaturedLocks(
    activeLocks,
    currentTimestamp
  );

  // Locked amount
  const lockedAmount = locksSum(locks, (lock) => lock.balance);

  // Locked value
  const lockedValue = lockedAmount * metrics.kvcm.valueUSD;

  // Claimable amounts
  const kvcmClaimableAmount = locksSum(locks, (lock) => lock.rewards.kvcm);
  const k2ClaimableAmount = locksSum(locks, (lock) => lock.rewards.k2);

  // Claimable values
  const kvcmClaimableValue = kvcmClaimableAmount * metrics.kvcm.valueUSD;
  const k2ClaimableValue = k2ClaimableAmount * metrics.k2.valueUSD;
  const claimableValue = kvcmClaimableValue + k2ClaimableValue;

  return {
    balanceValue,
    lockedAmount,
    locks,
    activeLocks,
    maturedLocks,
    soonToBeMaturedLocks,
    lockedValue,
    kvcmClaimableAmount,
    k2ClaimableAmount,
    kvcmClaimableValue,
    k2ClaimableValue,
    claimableValue,
  };
}

/**
 * Hook for KVCM-USDC LP token holdings data
 */
function useKvcmUsdcHoldingsData() {
  const { data: walletData } = useWalletData();
  const { data: protocolData } = useProtocolData();
  const currentTimestamp = useCurrentTimestamp();

  if (!walletData || !protocolData) return null;

  const metrics = protocolData.metrics;

  // Balance value
  const balanceValue =
    walletData.balances['kvcm-usdc'] * metrics['kvcm-usdc'].valueUSD;

  // Filtered locks
  const locks = walletData.locks.filter((lock) => lock.token === 'kvcm-usdc');
  const activeLocks = filterActiveLocks(locks);
  const maturedLocks = filterMaturedLocks(locks);
  const soonToBeMaturedLocks = filterSoonToBeMaturedLocks(
    activeLocks,
    currentTimestamp
  );

  // Locked amount
  const lockedAmount = locksSum(locks, (lock) => lock.balance);

  // Locked value
  const lockedValue = lockedAmount * metrics.kvcm.valueUSD;

  // Claimable amounts
  const kvcmClaimableAmount = locksSum(locks, (lock) => lock.rewards.kvcm);

  // Claimable values
  const kvcmClaimableValue = kvcmClaimableAmount * metrics.kvcm.valueUSD;
  const claimableValue = kvcmClaimableValue;

  return {
    balanceValue,
    lockedAmount,
    locks,
    activeLocks,
    maturedLocks,
    soonToBeMaturedLocks,
    lockedValue,
    kvcmClaimableAmount,
    kvcmClaimableValue,
    claimableValue,
  };
}

/**
 *
 * @returns Aggregated holdings data for the current wallet
 */
export function useHoldingsData() {
  const kvcmData = useKvmHoldingsData();
  const k2Data = useK2HoldingsData();
  const kvcmK2Data = useKvcmK2HoldingsData();
  const kvcmUsdcData = useKvcmUsdcHoldingsData();

  if (!kvcmData || !k2Data || !kvcmK2Data || !kvcmUsdcData) return null;

  // Aggregate balances
  const balanceValue =
    kvcmData.balanceValue +
    k2Data.balanceValue +
    kvcmUsdcData.balanceValue +
    kvcmK2Data.balanceValue;

  // Aggregate liquidity locks
  const liquidityActiveLocks = kvcmK2Data.activeLocks.concat(
    kvcmUsdcData.activeLocks
  );
  const liquidityMaturedLocks = kvcmK2Data.maturedLocks.concat(
    kvcmUsdcData.maturedLocks
  );
  const liquiditySoonToBeMaturedLocks = kvcmK2Data.soonToBeMaturedLocks.concat(
    kvcmUsdcData.soonToBeMaturedLocks
  );

  // Aggregate locked values
  const liquidityLockedValue =
    kvcmUsdcData.lockedValue + kvcmK2Data.lockedValue;
  const lockedValue =
    kvcmData.lockedValue + k2Data.lockedValue + liquidityLockedValue;

  // Aggregate claimable amounts
  const kvcmClaimableAmount =
    kvcmData.kvcmClaimableAmount +
    k2Data.kvcmClaimableAmount +
    kvcmK2Data.kvcmClaimableAmount +
    kvcmUsdcData.kvcmClaimableAmount;

  const k2ClaimableAmount =
    kvcmData.k2ClaimableAmount +
    k2Data.k2ClaimableAmount +
    kvcmK2Data.k2ClaimableAmount;

  // Aggregate claimable values
  const claimableValueFromLiquidity =
    kvcmK2Data.claimableValue + kvcmUsdcData.claimableValue;

  const claimableValue =
    kvcmData.claimableValue +
    k2Data.claimableValue +
    claimableValueFromLiquidity;

  const portfolioValue = lockedValue + claimableValue + balanceValue;

  const nbPoolsWithLocks =
    (kvcmK2Data.locks.length > 0 ? 1 : 0) +
    (kvcmUsdcData.locks.length > 0 ? 1 : 0);

  return {
    kvcm: kvcmData,
    k2: k2Data,
    kvcmK2: kvcmK2Data,
    kvcmUsdc: kvcmUsdcData,
    // Aggregated data
    liquidityActiveLocks,
    liquidityMaturedLocks,
    liquiditySoonToBeMaturedLocks,
    nbPoolsWithLocks,
    balanceValue,
    kvcmClaimableAmount,
    k2ClaimableAmount,
    liquidityLockedValue,
    lockedValue,
    claimableValueFromLiquidity,
    claimableValue,
    portfolioValue,
  };
}
