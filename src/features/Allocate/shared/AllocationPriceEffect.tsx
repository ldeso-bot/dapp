import { PriceEffect } from '@/shared/models/walletData';
import { cn } from '@/shared/utils/component.utils';
import { FC } from 'react';
import { AllocationsTableItemProps } from './AllocationsTable.types';

const priceEffectConfig: Record<
  PriceEffect,
  { label: string; activeBars: number }
> = {
  Low: { label: 'Low', activeBars: 1 },
  Medium: { label: 'Medium', activeBars: 2 },
  High: { label: 'High', activeBars: 3 },
};

export const AllocationPriceEffect: FC<AllocationsTableItemProps> = (props) => {
  const { allocation } = props;
  const config = priceEffectConfig[allocation.priceEffect];

  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[1rem] font-medium bg-white text-gray-900 border border-gray-300 border-solid">
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3].map((barIndex) => (
          <div
            key={barIndex}
            className={cn('w-[3px] h-3 rounded-full', {
              'bg-green-40': barIndex <= config?.activeBars,
              'bg-gray-300': barIndex > config?.activeBars,
            })}
          />
        ))}
      </div>
      <span>{config.label}</span>
    </div>
  );
};
