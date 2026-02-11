import Icon from '@/shared/components/Icon/Icon';
import { Progress } from '@/shared/components/Progress/Progress';
import { Separator } from '@/shared/components/Separator/Separator';
import ArrowDown from '@/shared/images/arrow_down.svg';
import { Allocation } from '@/shared/models/walletData';
import {
  getAllocationsByCarbonClass,
  getTotalAllocatedForCarbonClass,
} from '@/shared/utils/allocationLock.utils';
import { cn } from '@/shared/utils/component.utils';
import { formatDateDDMMYYYY } from '@/shared/utils/date.utils';
import { FC, ReactNode, useMemo, useState } from 'react';
import { AllocationAmount } from './AllocationAmount';
import { AllocationClass } from './AllocationClass';
import { AllocationEditButton } from './AllocationEditButton';
import { AllocationPrice } from './AllocationPrice';
import { AllocationPriceEffect } from './AllocationPriceEffect';
import { AllocationsCardProps } from './AllocationsTable.types';

type CarbonClassGroupMobileProps = AllocationsCardProps & {
  carbonClass: string;
  allocations: Allocation[];
  totalAmountForClass: number;
  firstAllocation: Allocation;
  isKvcm: boolean;
};

const CarbonClassGroupMobile: FC<CarbonClassGroupMobileProps> = (props) => {
  const {
    carbonClass,
    allocations,
    totalAmountForClass,
    firstAllocation,
    isKvcm,
    tokenInfo,
    totalAmount,
  } = props;
  const [isExpanded, setIsExpanded] = useState(true);

  const hasLocks = allocations.some((a) => a.contractLockId !== undefined);
  const shouldShowGrouped = allocations.length > 1 || (isKvcm && hasLocks);

  // Group by lock for kVCM
  const allocationsByLock = useMemo(() => {
    const map = new Map<number | undefined, typeof allocations>();
    allocations.forEach((allocation) => {
      const lockId = allocation.contractLockId;
      const existing = map.get(lockId) ?? [];
      map.set(lockId, [...existing, allocation]);
    });
    return map;
  }, [allocations]);

  const labelAndValue = (label: ReactNode, value: ReactNode) => (
    <div className="flex flex-col">
      <div className="text-void-50 text-size-12">{label}</div>
      {value}
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {shouldShowGrouped && (
        <div className="flex flex-col gap-3 bg-gray-50 p-4 rounded-lg">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex-1">
              <AllocationClass allocation={firstAllocation} {...props} />
            </div>
            <Icon
              className={cn(
                'transition-transform',
                isExpanded ? 'rotate-180' : ''
              )}
              icon={ArrowDown}
              size={2.2}
            />
          </div>
          <div className="grid grid-cols-2 gap-y-3">
            {labelAndValue(
              'Amount Allocated',
              <span className="font-semibold">
                {totalAmountForClass.toLocaleString()} {tokenInfo.symbol}
              </span>
            )}
            {labelAndValue(
              'Price Effect',
              <AllocationPriceEffect allocation={firstAllocation} {...props} />
            )}
            {labelAndValue(
              tokenInfo.id === 'kvcm'
                ? 'Indicative Price'
                : 'Spread Contribution',
              <AllocationPrice allocation={firstAllocation} {...props} />
            )}
          </div>
          <div>
            <Progress
              progressPercent={
                totalAmount && totalAmount > 0
                  ? totalAmountForClass / totalAmount
                  : 0
              }
            />
          </div>
        </div>
      )}
      {shouldShowGrouped &&
        isExpanded &&
        isKvcm &&
        Array.from(allocationsByLock.entries())
          .filter(([lockId]) => lockId !== undefined)
          .map(([lockId, lockAllocations]) => {
            const lockTotal = lockAllocations.reduce(
              (sum, a) => sum + a.amount,
              0
            );
            const lockAllocation = lockAllocations[0];
            if (!lockAllocation) return null;
            const lockDate =
              lockAllocation.lockedUntil &&
              formatDateDDMMYYYY(lockAllocation.lockedUntil);

            return (
              <div
                key={`${carbonClass}-${lockId}`}
                className="flex flex-col gap-3 pl-8 border-l-2 border-gray-200 ml-2"
              >
                <div className="text-size-12 text-gray-600">
                  {lockDate ? `Lock: ${lockDate}` : 'Lock'}
                </div>
                <div className="text-size-14 text-gray-700">
                  {lockTotal.toLocaleString()} {tokenInfo.symbol}
                </div>
                <div className="flex flex-col gap-2">
                  {lockAllocations.map((allocation) => (
                    <AllocationEditButton
                      key={allocation.id}
                      allocation={allocation}
                      {...props}
                    />
                  ))}
                </div>
              </div>
            );
          })}
      {!shouldShowGrouped &&
        allocations.map((allocation) => (
          <div key={allocation.id} className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-y-3">
                {labelAndValue(
                  'Class',
                  <AllocationClass allocation={allocation} {...props} />
                )}
                {labelAndValue(
                  'Amount Allocated',
                  <AllocationAmount allocation={allocation} {...props} />
                )}
                {labelAndValue(
                  'Price Effect',
                  <AllocationPriceEffect allocation={allocation} {...props} />
                )}
                {labelAndValue(
                  tokenInfo.id === 'kvcm'
                    ? 'Indicative Price'
                    : 'Spread Contribution',
                  <AllocationPrice allocation={allocation} {...props} />
                )}
              </div>
              <div>
                <Progress
                  progressPercent={
                    totalAmount && totalAmount > 0
                      ? allocation.amount / totalAmount
                      : 0
                  }
                />
              </div>
              <AllocationEditButton allocation={allocation} {...props} />
            </div>
            <Separator />
          </div>
        ))}

      {shouldShowGrouped && <Separator />}
    </div>
  );
};

export const AllocationsTableMobile: FC<AllocationsCardProps> = (props) => {
  const { className, data, tokenInfo } = props;

  // Group allocations by carbon class
  const groupedAllocations = useMemo(() => {
    if (!data) return new Map<string, Allocation[]>();
    return getAllocationsByCarbonClass(data);
  }, [data]);

  const isKvcm = tokenInfo.id === 'kvcm';

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {Array.from(groupedAllocations.entries()).map(
        ([carbonClass, allocations]) => {
          const totalAmountForClass =
            getTotalAllocatedForCarbonClass(allocations);
          const firstAllocation = allocations[0];
          if (!firstAllocation) return null;

          return (
            <CarbonClassGroupMobile
              key={carbonClass}
              {...props}
              carbonClass={carbonClass}
              allocations={allocations}
              totalAmountForClass={totalAmountForClass}
              firstAllocation={firstAllocation}
              isKvcm={isKvcm}
            />
          );
        }
      )}
    </div>
  );
};
