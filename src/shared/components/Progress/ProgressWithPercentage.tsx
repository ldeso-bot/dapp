'use client';

import { cn } from '@/shared/utils/component.utils';
import { formatPercentage } from '@/shared/utils/string.utils';
import { type FC } from 'react';
import { Progress } from './Progress';

type Props = {
  progressPercent: number;
  indeterminate?: boolean;
  className?: string;
};

export const ProgressWithPercentage: FC<Props> = (props) => {
  const { progressPercent, indeterminate = false, className } = props;
  return (
    <div className={cn('flex items-center gap-2 w-full', className)}>
      <div className="flex-1 min-w-0">
        <Progress
          className="w-full"
          showProgressLabel={false}
          indeterminate={indeterminate}
          progressPercent={progressPercent}
        />
      </div>
      <span className="text-size-12 text-void-50 tabular-nums shrink-0">
        {formatPercentage(progressPercent)}
      </span>
    </div>
  );
};
