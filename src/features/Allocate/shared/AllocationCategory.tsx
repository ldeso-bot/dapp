'use client';

import { cn } from '@/shared/utils/component.utils';
import { type FC } from 'react';
import { AllocationsTableItemProps } from './AllocationsTable.types';

export const AllocationCategory: FC<AllocationsTableItemProps> = (props) => {
  const { allocation, className } = props;
  return (
    <div className={cn('text-text-3 text-[1.3rem]', className)}>
      {allocation.category}
    </div>
  );
};
