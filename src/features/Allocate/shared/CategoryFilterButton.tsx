'use client';

import Button from '@/shared/components/Button/Button';
import { cn } from '@/shared/utils/component.utils';
import { type FC } from 'react';

type Props = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export const CategoryFilterButton: FC<Props> = (props) => {
  const { label, isActive, onClick } = props;

  return (
    <Button
      onClick={onClick}
      colors="secondary"
      className={cn(
        'px-3 py-1 rounded-lg text-text-static-light text-[1.2rem] font-medium border border-border-default',
        {
          'bg-surface-1 text-text-1 hover:bg-surface-3': !isActive,
          'bg-surface-inverse text-text-static-light border-border-strong':
            isActive,
        }
      )}
    >
      {label}
    </Button>
  );
};
