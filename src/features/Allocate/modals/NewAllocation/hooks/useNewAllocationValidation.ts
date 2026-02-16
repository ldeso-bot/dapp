import { useAllocationData } from '@/features/Allocate/hooks/useAllocationData';
import { useMemo } from 'react';
import { isNonNullish } from 'remeda';

type ValidationProps = {
  isK2: boolean;
  isKvcm: boolean;
  amount: number | string;
  isAmountTouched?: boolean;
  contractLockId: number | undefined;
};

export const useNewAllocationValidation = (props: ValidationProps) => {
  const { amount, contractLockId, isKvcm, isK2, isAmountTouched } = props;
  const { data: allocationData } = useAllocationData();

  const lockedK2 = allocationData?.k2.locked ?? 0;
  const allocatedK2 = allocationData?.k2.allocated ?? 0;
  const availableK2 = Math.max(0, lockedK2 - allocatedK2);

  const availableKvcm = useMemo(
    () => allocationData?.kvcm.availableKvcm ?? new Map(),
    [allocationData?.kvcm.availableKvcm]
  );

  const hasKvcmLocksAvailable = useMemo(() => {
    if (!isKvcm) return true;
    const kvcmLocks = allocationData?.kvcm.locks ?? [];
    return kvcmLocks.some((lock) => {
      if (lock.status === 'matured' || lock.status === 'claimed') return false;
      const available = availableKvcm.get(lock.contractLockId) ?? 0;
      return available > 0;
    });
  }, [isKvcm, allocationData?.kvcm.locks, availableKvcm]);

  const errorMessage = useMemo(() => {
    const numAmount = Number(amount);

    if (isAmountTouched && (isNaN(numAmount) || numAmount <= 0)) {
      return 'Amount must be greater than 0';
    }

    if (isKvcm && isNonNullish(contractLockId) && numAmount > 0) {
      const availableForLock = availableKvcm.get(Number(contractLockId)) ?? 0;
      if (numAmount > availableForLock) {
        return 'You cannot allocate more tokens than are available in the selected lock.';
      }
    }

    if (isK2 && numAmount > 0) {
      if (numAmount > availableK2) {
        return 'You cannot allocate more K2 than is available.';
      }
    }
    return null;
  }, [
    amount,
    contractLockId,
    isKvcm,
    isK2,
    availableKvcm,
    availableK2,
    isAmountTouched,
  ]);

  return {
    errorMessage,
    availableKvcm,
    availableK2,
    hasKvcmLocksAvailable,
  };
};
