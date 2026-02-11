import { useAllocationData } from '@/features/Allocate/hooks/useAllocationData';
import Icon from '@/shared/components/Icon/Icon';
import { Progress } from '@/shared/components/Progress/Progress';
import { SortableHeader } from '@/shared/components/Table/SortableHeader';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/Table/table';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import ArrowDown from '@/shared/images/arrow_down.svg';
import LockIcon from '@/shared/images/lock_icon.svg';
import { Allocation } from '@/shared/models/walletData';
import {
  getAllocationsByCarbonClass,
  getTotalAllocatedForCarbonClass,
} from '@/shared/utils/allocationLock.utils';
import { cn } from '@/shared/utils/component.utils';
import {
  formatAmountWithCommas,
  formatPriceUSDWithCommas,
  formatTimestamp,
} from '@/shared/utils/string.utils';
import { FC, useMemo, useState } from 'react';
import { AllocationAmount } from './AllocationAmount';
import { AllocationCategory } from './AllocationCategory';
import { AllocationClass } from './AllocationClass';
import { AllocationEditButton } from './AllocationEditButton';
import { AllocationPrice } from './AllocationPrice';
import { AllocationPriceEffect } from './AllocationPriceEffect';
import { AllocationsCardProps } from './AllocationsTable.types';
import { UnallocatedRow } from './UnallocatedRow';

export const AllocationsTableDesktop: FC<AllocationsCardProps> = (props) => {
  const {
    className,
    data,
    noAllocationComponent,
    sortConfig,
    onSort,
    tokenInfo,
    unallocatedAmount,
    totalAmount,
  } = props;

  const showUnallocatedRow =
    (tokenInfo.id === 'kvcm' || tokenInfo.id === 'k2') &&
    unallocatedAmount !== undefined &&
    unallocatedAmount > 0 &&
    totalAmount !== undefined;

  const isK2 = tokenInfo.id === 'k2';

  const groupedAllocations = useMemo(() => {
    if (!data) return new Map<string, Allocation[]>();
    return getAllocationsByCarbonClass(data);
  }, [data]);

  return (
    <Table className={cn('w-full mt-6', className)}>
      <TableHeader>
        <TableRow>
          <SortableHeader
            sortKey="carbonClass"
            sortConfig={sortConfig}
            onSort={onSort}
            label="Carbon class"
            className="text-left"
            infoIcon={`Bar shows the share of your total ${tokenInfo.symbol} in this class. Rows (including Unallocated) sum to 100%.`}
          />
          <SortableHeader
            sortKey="amount"
            sortConfig={sortConfig}
            onSort={onSort}
            label="Allocated"
            className="text-right justify-end"
          />
          {!isK2 && (
            <SortableHeader
              sortKey="priceEffect"
              sortConfig={sortConfig}
              onSort={onSort}
              label="Estimated impact"
              className="text-center justify-center"
              infoIcon="How strong your kVCM allocation contributes to the protocol's buying pressure in this class. Higher price effect means the system is more willing to bid up the price to acquire this carbon."
            />
          )}
          <SortableHeader
            sortKey="priceUSD"
            sortConfig={sortConfig}
            onSort={onSort}
            label={!isK2 ? `Indicative price` : `Capacity effect`}
            infoIcon={
              !isK2
                ? 'Informational estimate of the price per tonne the protocol is currently targeting for this carbon class, based on portfolio state and allocations. Not a guarantee and may change as markets and allocations update.'
                : 'How much your K2 helps the system maintain the target price for this carbon class. Higher capacity means more volume can be bought or retired before the price needs to move.'
            }
            className="text-center justify-center"
          />
          <TableHead className="min-w-[14rem]">&nbsp;</TableHead>
          <TableHead className="min-w-[2rem]">&nbsp;</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody borders="between">
        {Array.from(groupedAllocations.entries()).map(
          ([carbonClass, allocations]: [string, Allocation[]]) => {
            const totalAmount = getTotalAllocatedForCarbonClass(allocations);
            const firstAllocation = allocations[0];
            if (!firstAllocation) return null;
            return (
              <CarbonClassGroup
                key={carbonClass}
                {...props}
                carbonClass={carbonClass}
                allocations={allocations}
                totalAmount={totalAmount}
                allocationPercent={
                  props.totalAmount && props.totalAmount > 0
                    ? Math.min(1, Math.max(0, totalAmount / props.totalAmount))
                    : 0
                }
                firstAllocation={firstAllocation}
              />
            );
          }
        )}
        {showUnallocatedRow && (
          <UnallocatedRow
            amount={unallocatedAmount}
            totalAmount={totalAmount}
            tokenSymbol={tokenInfo.id === 'kvcm' ? 'kVCM' : 'K2'}
            isK2={isK2}
          />
        )}
        {data?.length === 0 && !showUnallocatedRow && (
          <TableRow>
            <TableCell colSpan={isK2 ? 5 : 6} className="border-0">
              {noAllocationComponent}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

type CarbonClassGroupProps = AllocationsCardProps & {
  carbonClass: string;
  allocations: Allocation[];
  totalAmount: number;
  allocationPercent: number;
  firstAllocation: Allocation;
};

const CarbonClassGroup: FC<CarbonClassGroupProps> = (props) => {
  const {
    carbonClass,
    allocations,
    totalAmount,
    allocationPercent,
    firstAllocation,
    tokenInfo,
  } = props;
  const isK2 = tokenInfo.id === 'k2';
  const isKvcm = tokenInfo.id === 'kvcm';
  const { data: protocolData } = useProtocolData();
  const { data: allocationData } = useAllocationData();

  const hasLocks = allocations.some((a) => a.contractLockId !== undefined);
  const [isExpanded, setIsExpanded] = useState(!hasLocks);

  const usdValue = useMemo(() => {
    if (!isKvcm && !isK2) return 0;
    const tokenPrice = isK2
      ? protocolData?.metrics.k2.valueUSD || 0
      : protocolData?.metrics.kvcm.valueUSD || 0;
    return totalAmount * tokenPrice;
  }, [totalAmount, isK2, isKvcm, protocolData]);

  const allocationsByLock = useMemo(() => {
    const map = new Map<number | undefined, Allocation[]>();
    allocations.forEach((allocation) => {
      const lockId = allocation.contractLockId;
      const existing = map.get(lockId) ?? [];
      map.set(lockId, [...existing, allocation]);
    });
    return map;
  }, [allocations]);
  const shouldShowGrouped = allocations.length > 1 || (isKvcm && hasLocks);

  if (!allocations || allocations.length === 0) {
    return null;
  }

  return (
    <>
      {shouldShowGrouped && (
        <TableRow>
          <TableCell className="text-left border-0">
            <div className="flex items-center gap-2">
              <div
                className="cursor-pointer flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                <Icon
                  size={2.2}
                  icon={ArrowDown}
                  className={cn(
                    'transition-transform',
                    isExpanded ? 'rotate-0' : '-rotate-90'
                  )}
                />
              </div>
              <div className="flex flex-col gap-0.5 flex-1">
                <AllocationClass {...props} allocation={firstAllocation} />
                <AllocationCategory {...props} allocation={firstAllocation} />
                <Progress progressPercent={allocationPercent} />
              </div>
            </div>
          </TableCell>
          <TableCell className="text-right border-0">
            <div className="flex flex-col items-end">
              <div className="font-medium text-gray-900 tabular-nums">
                {formatAmountWithCommas(totalAmount)}{' '}
                <span className="text-void-50 text-size-12">
                  {tokenInfo.symbol}
                </span>
              </div>
              {(isKvcm || isK2) && (
                <div className="text-size-12 text-void-50 tabular-nums">
                  ≈ {formatPriceUSDWithCommas(usdValue)}
                </div>
              )}
            </div>
          </TableCell>
          {!isK2 && (
            <TableCell className="text-center border-0">
              <div className="flex justify-center">
                <AllocationPriceEffect
                  {...props}
                  allocation={firstAllocation}
                />
              </div>
            </TableCell>
          )}
          <TableCell className="text-left border-0">
            <div className="flex justify-center">
              <AllocationPrice {...props} allocation={firstAllocation} />
            </div>
          </TableCell>
          <TableCell className="border-0">
            {/* Edit button removed from main row */}
          </TableCell>
          <TableCell className="border-0" />
        </TableRow>
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
            const lockDate = lockAllocation.lockedUntil
              ? formatTimestamp(lockAllocation.lockedUntil * 1000)
              : null;

            // Calculate USD value for this lock's total
            const lockUsdValue = (() => {
              const tokenPrice = isKvcm
                ? protocolData?.metrics.kvcm.valueUSD || 0
                : protocolData?.metrics.k2.valueUSD || 0;
              return lockTotal * tokenPrice;
            })();

            const availableAmount =
              allocationData?.kvcm.availableKvcm.get(Number(lockId)) ?? 0;

            return (
              <LockSubRow
                key={`${carbonClass}-${lockId}`}
                lockDate={lockDate}
                lockTotal={lockTotal}
                lockUsdValue={lockUsdValue}
                lockAllocations={lockAllocations}
                lockAllocation={lockAllocation}
                isK2={isK2}
                availableAmount={availableAmount}
                {...props}
              />
            );
          })}
      {shouldShowGrouped &&
        isExpanded &&
        isKvcm &&
        hasLocks &&
        (() => {
          const allocationsWithoutLocks = allocations.filter(
            (a) => a.contractLockId === undefined
          );
          if (allocationsWithoutLocks.length === 0) return null;

          const totalWithoutLocks = allocationsWithoutLocks.reduce(
            (sum, a) => sum + a.amount,
            0
          );

          return (
            <TableRow className="bg-white">
              <TableCell className="text-left border-0 pl-16">
                <div className="flex flex-col gap-1">
                  <span className="text-size-14 text-gray-600">No Lock</span>
                </div>
              </TableCell>
              <TableCell className="text-right border-0">
                <span className="text-size-14 text-gray-600">
                  {formatAmountWithCommas(totalWithoutLocks)} {tokenInfo.symbol}
                </span>
              </TableCell>
              {!isK2 && (
                <TableCell className="text-center border-0">
                  <span className="text-size-12 text-void-50">—</span>
                </TableCell>
              )}
              <TableCell className="text-left border-0">
                <div className="flex justify-center">
                  <span className="text-size-12 text-void-50">—</span>
                </div>
              </TableCell>
              <TableCell className="border-0">
                <div className="flex justify-end gap-2">
                  {allocationsWithoutLocks.map((allocation) => (
                    <AllocationEditButton
                      key={allocation.id}
                      {...props}
                      allocation={allocation}
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell className="border-0" />
            </TableRow>
          );
        })()}
      {shouldShowGrouped &&
        !isKvcm &&
        allocations.map((allocation) => (
          <AllocationTableRow
            key={allocation.id}
            allocation={allocation}
            {...props}
          />
        ))}
      {!shouldShowGrouped &&
        allocations.length > 0 &&
        allocations.map((allocation) => (
          <AllocationTableRow
            key={allocation.id}
            allocation={allocation}
            {...props}
          />
        ))}
    </>
  );
};

type LockSubRowProps = AllocationsCardProps & {
  lockDate: string | null;
  lockTotal: number;
  lockUsdValue: number;
  lockAllocations: Allocation[];
  lockAllocation: Allocation;
  isK2: boolean;
  tokenInfo: AllocationsCardProps['tokenInfo'];
  availableAmount: number;
};

const LockSubRow: FC<LockSubRowProps> = (props) => {
  const {
    lockDate,
    lockTotal,
    lockUsdValue,
    lockAllocations,
    lockAllocation,
    isK2,
    tokenInfo,
    totalAmount,
    availableAmount,
  } = props;
  const isKvcm = tokenInfo.id === 'kvcm';

  const lockPercent =
    totalAmount && totalAmount > 0
      ? Math.min(1, Math.max(0, lockTotal / totalAmount))
      : 0;

  return (
    <TableRow
      key={`lock-${lockAllocation.contractLockId}`}
      className="bg-white border-b border-gray-200/30"
    >
      <TableCell className="text-left border-0">
        <div className="flex items-center pl-[25px] gap-[10px]">
          <Icon
            size={2.4}
            icon={LockIcon}
            className="text-gray-400 flex-shrink-0 mt-1.5"
          />
          <div className="flex flex-col gap-0.5 flex-1">
            <div className="flex flex-col gap-0 flex-1">
              <span className="text-size-14 text-gray-600 font-medium">
                {lockDate ? `Lock: ${lockDate}` : 'Lock'}
              </span>
              <span className="text-size-12 text-gray-500 font-normal">
                {formatAmountWithCommas(availableAmount)} {tokenInfo.symbol}{' '}
                available
              </span>
            </div>
            <Progress progressPercent={lockPercent} />
          </div>
        </div>
      </TableCell>
      <TableCell className="text-right border-0">
        <div className="flex flex-col items-end">
          <div className="font-medium text-gray-900 tabular-nums">
            {formatAmountWithCommas(lockTotal)}{' '}
            <span className="text-void-50 text-size-12">
              {tokenInfo.symbol}
            </span>
          </div>
          {(isKvcm || isK2) && (
            <span className="text-size-12 text-void-50 tabular-nums">
              ≈ {formatPriceUSDWithCommas(lockUsdValue)}
            </span>
          )}
        </div>
      </TableCell>
      {!isK2 && (
        <TableCell className="text-center border-0">
          <span className="text-size-12 text-void-50">—</span>
        </TableCell>
      )}
      <TableCell className="text-left border-0">
        <div className="flex justify-center">
          <span className="text-size-12 text-void-50">—</span>
        </div>
      </TableCell>
      <TableCell colSpan={2} className="border-0 justify-end !pr-6">
        <div className="flex justify-end">
          {lockAllocations.length > 0 && (
            <div className="flex gap-2">
              {lockAllocations.map((allocation) => (
                <AllocationEditButton
                  key={allocation.id}
                  {...props}
                  allocation={allocation}
                />
              ))}
            </div>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

const AllocationTableRow = (
  props: AllocationsCardProps & { allocation: Allocation }
) => {
  const { tokenInfo, totalAmount, allocation } = props;
  const isK2 = tokenInfo.id === 'k2';

  const allocationPercent =
    totalAmount && totalAmount > 0
      ? Math.min(1, Math.max(0, allocation.amount / totalAmount))
      : 0;

  return (
    <TableRow>
      <TableCell className="text-left border-0">
        <div className="flex flex-col gap-1">
          <AllocationClass {...props} />
          <AllocationCategory {...props} />
          <Progress progressPercent={allocationPercent} />
        </div>
      </TableCell>
      <TableCell className="text-right border-0">
        <AllocationAmount {...props} />
      </TableCell>
      {!isK2 && (
        <TableCell className="text-center border-0 ">
          <div className="flex justify-center">
            <AllocationPriceEffect {...props} />
          </div>
        </TableCell>
      )}
      <TableCell className="text-left border-0">
        <div className="flex justify-center">
          <AllocationPrice {...props} />
        </div>
      </TableCell>
      <TableCell colSpan={2} className="border-0 justify-end !pr-6">
        <div className="flex justify-end">
          <AllocationEditButton {...props} />
        </div>
      </TableCell>
    </TableRow>
  );
};
