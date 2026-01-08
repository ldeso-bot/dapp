'use client';

import { cn } from '@/shared/utils/component.utils';
import { type FC, type HTMLAttributes } from 'react';

type DividerProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: 'vertical' | 'horizontal';
};

export const Divider: FC<DividerProps> = ({
  className,
  orientation = 'vertical',
  ...props
}) => {
  const baseClasses =
    orientation === 'vertical'
      ? 'h-8 w-px bg-gray-200'
      : 'w-full h-px bg-gray-200';

  return (
    <div
      className={cn(baseClasses, className)}
      role="separator"
      aria-orientation={orientation}
      {...props}
    />
  );
};
