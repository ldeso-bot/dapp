'use client';

import { cn } from '@/shared/utils/component.utils';
import { Progress as ProgressPrimitive } from 'radix-ui';
import { type FC } from 'react';

type Props = {
  className?: string;
  progressPercent: number;
  showProgressLabel?: boolean;
  indeterminate?: boolean;
};

export const Progress: FC<Props> = (props) => {
  const {
    progressPercent,
    showProgressLabel = true,
    className,
    indeterminate = false,
  } = props;

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
          className={cn(
            'w-full h-full rounded-full',
            indeterminate ? '' : 'bg-green-40'
          )}
          style={{
            transform: `translateX(-${Math.floor((1 - progressPercent) * 100)}%)`,
            ...(indeterminate && {
              backgroundColor: '#000',
              backgroundImage:
                'repeating-linear-gradient(90deg, #9ca3af 0, #9ca3af 4px, transparent 4px, transparent 8px)', // gray-400 for dashes
            }),
          }}
        />
      </ProgressPrimitive.Root>
      {showProgressLabel && (
        <div className="w-[10%] text-size-10 text-gray-500 font-medium">
          {(progressPercent * 100).toFixed(2)}%
        </div>
      )}
    </div>
  );
};
