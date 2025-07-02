'use client';

import { cn } from '@/shared/utils/component.utils';

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse rounded-lg bg-void-20', className)} />
  );
}
