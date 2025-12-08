'use client';

import { cn } from '@/shared/utils/component.utils';
import { Progress as ProgressPrimitive } from 'radix-ui';
import { type FC } from 'react';

type Props = {
  className?: string;
  progressPercent: number;
  showProgressLabel?: boolean;
};

export const Progress: FC<Props> = (props) => {
  const { progressPercent, showProgressLabel = true, className } = props;

  return (
    <div className="flex justify-between items-center gap-2">
      <ProgressPrimitive.Root
        max={1}
        value={progressPercent}
        className={cn(
          'w-[90%] relative h-[0.4rem] bg-gray-200 overflow-hidden rounded-full',
          className
        )}
      >
        <ProgressPrimitive.Indicator
          className="w-full h-full bg-green-40 rounded-full"
          style={{
            transform: `translateX(-${Math.floor((1 - progressPercent) * 100)}%)`,
          }}
        />
      </ProgressPrimitive.Root>
      {showProgressLabel && (
        <div className="w-[10%] text-size-10 text-gray-500 font-medium">
          {progressPercent * 100}%
        </div>
      )}
    </div>
  );
};
