import { Allocation, Lock } from '../models/walletData';

/**
 * Calculates the available (unallocated) amount for each lock
 * @param locks - Array of user's locks
 * @param allocations - Array of allocations (should be filtered by token type)
 * @returns Map of contractLockId to available amount
 */
export const calculateAvailableKvcmPerLock = (
  locks: Lock[],
  allocations: Allocation[]
): Map<number, number> => {
  const availableKvcm = new Map<number, number>();

  // Initialize with locked amounts, keyed by contractLockId
  locks.forEach((lock) => {
    availableKvcm.set(lock.contractLockId, lock.lockedAmount);
  });

  // Subtract allocated amounts
  allocations.forEach((allocation) => {
    if (allocation.contractLockId !== undefined) {
      const current = availableKvcm.get(allocation.contractLockId) ?? 0;
      availableKvcm.set(
        allocation.contractLockId,
        Math.max(0, current - allocation.amount)
      );
    }
  });

  return availableKvcm;
};

/**
 * Groups allocations by carbon class
 * @param allocations - Array of allocations
 * @returns Map of carbon class to array of allocations
 */
export const getAllocationsByCarbonClass = (
  allocations: Allocation[]
): Map<string, Allocation[]> => {
  const allocationsByClass = new Map<string, Allocation[]>();

  allocations.forEach((allocation) => {
    const existing = allocationsByClass.get(allocation.carbonClass) ?? [];
    allocationsByClass.set(allocation.carbonClass, [...existing, allocation]);
  });

  return allocationsByClass;
};

/**
 * Gets the total allocated amount for a carbon class
 * @param allocations - Array of allocations for a carbon class
 * @returns Total allocated amount
 */
export const getTotalAllocatedForCarbonClass = (
  allocations: Allocation[]
): number => {
  return allocations.reduce((sum, allocation) => sum + allocation.amount, 0);
};
