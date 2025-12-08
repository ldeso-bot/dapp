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
        'px-3 py-1 rounded-lg text-[1.2rem] font-medium border border-gray-300',
        {
          'bg-white text-void-50 hover:bg-void-10': !isActive,
          'bg-gray-800 text-white border-void-50': isActive,
        }
      )}
    >
      {label}
    </Button>
  );
};
