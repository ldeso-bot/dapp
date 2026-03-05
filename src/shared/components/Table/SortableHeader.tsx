'use client';

import Icon from '@/shared/components/Icon/Icon';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { SortConfig } from '@/shared/hooks/useSortableData';
import helpIcon from '@/shared/images/help.svg';
import { cn } from '@/shared/utils/component.utils';
import { TableHead } from './table';

type SortableHeaderProps<TData> = {
  sortKey: keyof TData;
  sortConfig?: SortConfig<TData>;
  onSort?: (key: keyof TData) => void;
  label: string;
  className?: string;
  infoIcon?: string;
};

export const SortableHeader = <TData,>(props: SortableHeaderProps<TData>) => {
  const { sortKey, sortConfig, onSort, label, className, infoIcon } = props;
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
        {infoIcon && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center"
          >
            <Tooltip
              trigger={
                <Icon
                  icon={helpIcon}
                  alt="Info"
                  size={1.6}
                  className="text-gray-400"
                />
              }
              content={infoIcon}
            />
          </div>
        )}
      </div>
    </TableHead>
  );
};
