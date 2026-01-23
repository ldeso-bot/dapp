import { useAllocationData } from '@/features/Allocate/hooks/useAllocationData';
import { Allocation } from '@/shared/models/walletData';
import { computeMaxAllocationForPosition } from '@/shared/utils/allocation.utils';
import { useMemo } from 'react';

type ValidationProps = {
  allocation: Allocation | null | undefined;
  newAmount: number;
  originalAmount: number;
};

export const useEditAllocationValidation = (props: ValidationProps) => {
  const { allocation, newAmount, originalAmount } = props;
  const { data: allocationData } = useAllocationData();

  const isKvcm = allocation?.token.name === 'kvcm';
  const isK2 = allocation?.token.name === 'k2';
  
  const availableKvcm = useMemo(
    () => allocationData?.kvcm.availableKvcm ?? new Map<number, number>(),
    [allocationData?.kvcm.availableKvcm]
  );
  const lockedK2 = allocationData?.k2.locked ?? 0;
  const totalAllocatedK2 = allocationData?.k2.allocated ?? 0;
  const maxK2ForThisAllocation = computeMaxAllocationForPosition({
    balance: lockedK2,
    totalAllocated: totalAllocatedK2,
    currentAllocationAmount: isK2 ? originalAmount : 0,
  });

  const errorMessage = useMemo(() => {
    if (!allocation) {
      return null;
    }

    if (newAmount < 0) {
      return 'Amount cannot be negative.';
    }

    const amountDiff = Math.abs(newAmount - originalAmount);
    if (amountDiff < 0.01) {
      return null;
    }

    if (isKvcm && allocation.contractLockId && amountDiff > 0) {
      const availableForLock =
        availableKvcm.get(allocation.contractLockId) ?? 0;
      const totalAvailable = availableForLock + originalAmount;

      if (newAmount > totalAvailable) {
        return `You cannot allocate more tokens than are available in the selected lock.`;
      }
    }
    if (isK2 && newAmount > maxK2ForThisAllocation) {
      return 'You cannot allocate more K2 than is deposited.';
    }
    return null;
  }, [
    allocation,
    availableKvcm,
    isK2,
    isKvcm,
    maxK2ForThisAllocation,
    newAmount,
    originalAmount,
  ]);

  return {
    errorMessage,
    availableKvcm,
    maxK2ForThisAllocation,
    isKvcm,
    isK2,
  };
};

