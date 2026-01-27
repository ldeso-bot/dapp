'use client';

import { cn } from '@/shared/utils/component.utils';
import { type FC, type HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {
  title: string;
  value: number;
  label?: string;
};

export const AllocationMetric: FC<Props> = (props) => {
  const { title, value, label, className, ...rest } = props;
  return (
    <div className={cn('flex flex-col gap-1 text-center', className)} {...rest}>
      <div className="text-size-14 font-medium text-gray-900">{title}</div>
      <div className="text-size-12 text-gray-500">
        {value} {label || (value === 1 ? 'class' : 'classes')}
      </div>
    </div>
  );
};
