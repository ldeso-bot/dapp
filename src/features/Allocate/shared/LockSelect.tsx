'use client';

import { useAllocationData } from '@/features/Allocate/hooks/useAllocationData';
import InputWrapper from '@/shared/components/Form/layout/InputWrapper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/Select/Select';
import { formatDateDDMMYYYY } from '@/shared/utils/date.utils';
import { useMemo } from 'react';
import { Control, Controller, FieldError, FieldErrors, Path } from 'react-hook-form';

type LockSelectProps<T extends { contractLockId?: number }> = {
  name: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
};

export const LockSelect = <T extends { contractLockId?: number }>({
  name,
  control,
  errors,
}: LockSelectProps<T>) => {
  const { data: allocationData } = useAllocationData();

  const lockSelectItems = useMemo(() => {
    const kvcmLocks = allocationData?.kvcm.locks ?? [];
    const availableKvcm = allocationData?.kvcm.availableKvcm ?? new Map();
    
    return kvcmLocks.map((lock) => {
      const available = availableKvcm.get(lock.contractLockId) ?? 0;
      const maturityDate = formatDateDDMMYYYY(lock.lockedUntil);
      return {
        value: lock?.contractLockId?.toString() ?? '0',
        label: `${maturityDate} (${available.toLocaleString()} available)`,
        disabled: available <= 0,
      };
    });
  }, [allocationData?.kvcm.locks, allocationData?.kvcm.availableKvcm]);

  if (lockSelectItems.length === 0) {
    return null;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <InputWrapper 
          label="Lock (Maturity Date)" 
          error={errors?.contractLockId as FieldError}
        >
          <Select
            value={field.value?.toString()}
            onValueChange={(value) => field.onChange(Number(value))}
            defaultValue={field.value?.toString()}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a lock" />
            </SelectTrigger>
            <SelectContent>
              {lockSelectItems.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </InputWrapper>
      )}
    />
  );
};

