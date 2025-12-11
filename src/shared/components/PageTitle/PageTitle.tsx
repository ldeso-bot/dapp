'use client';

import { cn } from '@/shared/utils/component.utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const PageTitle = ({ children, className }: Props) => (
  <h1 className={cn('text-[2.4rem] font-bold tracking-tight', className)}>
    {children}
  </h1>
);
