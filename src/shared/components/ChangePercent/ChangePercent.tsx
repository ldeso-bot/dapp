"use client";

import { cn } from '@/shared/utils/component.utils';
import { formatPercentage } from '@/shared/utils/string.utils';

export default function ChangePercent({ value }: { value: number }) {
  const arrow = value > 0 ? '↑' : '↓';
  const className = value > 0 ? 'bg-green-10' : value === 0 ? 'bg-void-10' : 'bg-red-100';
  return (
    <div className={cn('flex flex-row gap-1 px-2 py-1 rounded-3xl', className)}>
      {arrow} {formatPercentage(value, { decimals: 0 })}
    </div>
  );
}