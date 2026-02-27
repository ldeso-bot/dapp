'use client';

import Button from '@/shared/components/Button/Button';
import { FC } from 'react';
import { AllocationsTableItemProps } from './AllocationsTable.types';

export const AllocationEditButton: FC<AllocationsTableItemProps> = (props) => {
  const { allocation } = props;

  return (
    <Button
      className="w-fit shrink-0"
      href={`?action=edit_allocation_${allocation.id}`}
    >
      Edit
    </Button>
  );
};
