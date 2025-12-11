'use client';

import { cn } from '@/shared/utils/component.utils';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const PageDescription = ({ children, className }: Props) => (
  <p className={cn('text-size-14 text-gray-500', className)}>{children}</p>
);
