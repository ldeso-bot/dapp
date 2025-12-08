'use client';

import { SortConfig } from '@/shared/hooks/useSortableData';
import { cn } from '@/shared/utils/component.utils';
import { TableHead } from './table';

type SortableHeaderProps<TData> = {
  sortKey: keyof TData;
  sortConfig?: SortConfig<TData>;
  onSort?: (key: keyof TData) => void;
  label: string;
  className?: string;
};

export const SortableHeader = <TData,>(props: SortableHeaderProps<TData>) => {
  const { sortKey, sortConfig, onSort, label, className } = props;
  const isActive = sortConfig?.key === sortKey;
  const direction = isActive ? sortConfig?.direction : null;

  const handleClick = () => {
    if (!onSort) return;
    onSort(sortKey);
  };

  return (
    <TableHead
      onClick={handleClick}
      className={cn('cursor-pointer select-none', className)}
    >
      <div className={cn('flex items-center gap-2', className)}>
        <span>{label}</span>
        <div className="flex flex-col text-[0.75rem] leading-normal">
          <span
            className={cn(
              'transition-colors',
              isActive && direction === 'asc'
                ? 'text-gray-500 opacity-100'
                : 'text-gray-500 opacity-40'
            )}
          >
            ▲
          </span>
          <span
            className={cn(
              'transition-colors -mt-1',
              isActive && direction === 'desc'
                ? 'text-gray-500 opacity-100'
                : 'text-gray-500 opacity-40'
            )}
          >
            ▼
          </span>
        </div>
      </div>
    </TableHead>
  );
};
