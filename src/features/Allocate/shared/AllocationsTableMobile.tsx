import Icon from '@/shared/components/Icon/Icon';
import { ProgressWithPercentage } from '@/shared/components/Progress/ProgressWithPercentage';
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

const LabelValue: FC<{ label: ReactNode; value: ReactNode }> = ({
  label,
  value,
}) => (
  <div className="flex flex-col">
    <div className="text-text-3 text-size-12">{label}</div>
    <div className="min-w-0">{value}</div>
  </div>
);

const AllocationRow: FC<
  AllocationsCardProps & { allocation: Allocation; isKvcm: boolean }
> = (props) => {
  const { allocation, isKvcm, tokenInfo, totalAmount } = props;

  return (
    <div className="rounded-lg border border-border-subtle bg-surface-1 p-3 flex flex-col gap-3">
      {!isKvcm ? (
        <>
          <div className="flex items-center justify-between gap-3">
            <div className="text-size-12 text-text-3">
              <AllocationClass {...props} allocation={allocation} />
            </div>
            <AllocationEditButton {...props} allocation={allocation} />
          </div>
          <div className="flex">
            <div className="text-size-14 font-semibold text-text-2">
              <AllocationAmount {...props} allocation={allocation} />
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate">
              <AllocationClass {...props} allocation={allocation} />
            </div>
            <div className="text-size-12 text-text-3 mt-1">
              <AllocationAmount {...props} allocation={allocation} />
            </div>
          </div>

          <AllocationEditButton {...props} allocation={allocation} />
        </div>
      )}

      <div className="grid grid-cols-2 gap-y-3">
        <LabelValue
          label="Price Effect"
          value={<AllocationPriceEffect {...props} allocation={allocation} />}
        />
        <LabelValue
          label={
            tokenInfo.id === 'kvcm' ? 'Indicative Price' : 'Spread Contribution'
          }
          value={<AllocationPrice {...props} allocation={allocation} />}
        />
      </div>

      {!isKvcm && totalAmount && totalAmount > 0 && (
        <ProgressWithPercentage
          progressPercent={allocation.amount / totalAmount}
        />
      )}
    </div>
  );
};

const LockGroup: FC<
  CarbonClassGroupMobileProps & {
    lockId: number;
    lockAllocations: Allocation[];
  }
> = (props) => {
  const { lockId, lockAllocations, tokenInfo } = props;

  const lockTotal = lockAllocations.reduce((sum, a) => sum + a.amount, 0);
  const lockAllocation = lockAllocations[0];

  const lockDate =
    lockAllocation?.lockedUntil &&
    formatDateDDMMYYYY(lockAllocation.lockedUntil);

  const editTarget = lockAllocation;

  return (
    <div className="rounded-lg border border-border-subtle bg-surface-1 p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-size-12 text-text-2">
            {lockDate ? `Lock until ${lockDate}` : `Lock ${lockId}`}
          </div>
          <div className="text-size-14 font-semibold text-text-2 mt-1">
            {lockTotal.toLocaleString()} {tokenInfo.symbol}
          </div>
        </div>

        {editTarget ? (
          <AllocationEditButton {...props} allocation={editTarget} />
        ) : null}
      </div>
    </div>
  );
};

const CarbonClassGroupMobile: FC<CarbonClassGroupMobileProps> = (props) => {
  const {
    allocations,
    totalAmountForClass,
    firstAllocation,
    isKvcm,
    tokenInfo,
    totalAmount,
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);

  const hasLocks = allocations.some((a) => a.contractLockId !== undefined);
  const shouldShowGrouped = allocations.length > 1 || (isKvcm && hasLocks);

  const allocationsByLock = useMemo(() => {
    const map = new Map<number | undefined, Allocation[]>();
    allocations.forEach((allocation) => {
      const lockId = allocation.contractLockId;
      const existing = map.get(lockId) ?? [];
      map.set(lockId, [...existing, allocation]);
    });
    return map;
  }, [allocations]);

  return (
    <div className="rounded-lg border border-border-subtle bg-surface-2 p-4 flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setIsExpanded((v) => !v)}
        className={cn(
          'w-full rounded-lg border border-border-subtle bg-surface-1 px-3 py-3',
          'flex items-center justify-between gap-3 text-left',
          'active:scale-[0.99] transition-transform'
        )}
        aria-expanded={isExpanded}
      >
        <div className="min-w-0 flex-1">
          <AllocationClass {...props} allocation={firstAllocation} />
          <div className="text-size-12 text-text-3 mt-1">
            {totalAmountForClass.toLocaleString()} {tokenInfo.symbol} allocated
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-size-12 font-semibold text-text-2">
            {isExpanded ? 'Hide' : 'Show'}
          </span>
          <Icon
            className={cn(
              'transition-transform',
              isExpanded ? 'rotate-180' : ''
            )}
            icon={ArrowDown}
            size={2.6}
          />
        </div>
      </button>

      <div className="grid grid-cols-2 gap-y-3">
        <LabelValue
          label="Price Effect"
          value={
            <AllocationPriceEffect {...props} allocation={firstAllocation} />
          }
        />
        <LabelValue
          label={
            tokenInfo.id === 'kvcm' ? 'Indicative Price' : 'Spread Contribution'
          }
          value={<AllocationPrice {...props} allocation={firstAllocation} />}
        />
      </div>

      <ProgressWithPercentage
        progressPercent={
          totalAmount && totalAmount > 0 ? totalAmountForClass / totalAmount : 0
        }
      />

      {isExpanded && (
        <div className="mt-1 flex flex-col gap-3">
          {shouldShowGrouped && isKvcm ? (
            <>
              {Array.from(allocationsByLock.entries())
                .filter(([lockId]) => lockId !== undefined)
                .map(([lockId, lockAllocations]) => (
                  <LockGroup
                    key={String(lockId)}
                    {...props}
                    lockId={lockId as number}
                    lockAllocations={lockAllocations}
                  />
                ))}

              {Array.from(allocationsByLock.entries())
                .filter(([lockId]) => lockId === undefined)
                .flatMap(([, unLocked]) => unLocked)
                .map((allocation) => (
                  <AllocationRow
                    key={allocation.id}
                    {...props}
                    allocation={allocation}
                    isKvcm={true}
                  />
                ))}
            </>
          ) : (
            allocations.map((allocation) => (
              <AllocationRow
                key={allocation.id}
                {...props}
                allocation={allocation}
                isKvcm={true}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export const AllocationsTableMobile: FC<AllocationsCardProps> = (props) => {
  const { className, data, tokenInfo } = props;

  const isKvcm = tokenInfo.id === 'kvcm';

  const groupedAllocations = useMemo(() => {
    if (!isKvcm || !data) return new Map<string, Allocation[]>();
    return getAllocationsByCarbonClass(data);
  }, [data, isKvcm]);

  if (!isKvcm) {
    return (
      <div className={cn('flex flex-col gap-3', className)}>
        {(data ?? []).map((allocation) => (
          <AllocationRow
            key={allocation.id}
            {...props}
            allocation={allocation}
            isKvcm={false}
          />
        ))}
      </div>
    );
  }

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
              isKvcm={true}
            />
          );
        }
      )}
    </div>
  );
};
