'use client';

import { Progress } from '@/shared/components/Progress/Progress';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { formatPercentage } from '@/shared/utils/string.utils';
import { type FC } from 'react';
import { scrollToAllocationsTable } from '../allocate.utils';

type HighestInfluence = {
  category: string;
  sharePercent: number;
};

type Props = {
  tokenName: string;
  allocatedPercent: number;
  highestInfluence?: HighestInfluence | null;
};

export const AllocatedTokenDisplay: FC<Props> = (props) => {
  const { tokenName, allocatedPercent, highestInfluence } = props;
  return (
    <div>
      <div className="cursor-pointer hover:bg-gray-50/50 transition-colors p-2 rounded-lg -m-2">
        <div className="text-center mb-1.5">
          <span className="text-size-12 text-gray-800 tabular-nums">
            {tokenName} allocated · {formatPercentage(allocatedPercent)}
          </span>
        </div>
        <Progress
          className="h-2 w-full"
          showProgressLabel={false}
          progressPercent={allocatedPercent}
        />
      </div>
      {highestInfluence && highestInfluence.category && highestInfluence.sharePercent > 0 && (
        <div
          onClick={() => scrollToAllocationsTable(tokenName)}
          className="flex items-center justify-center gap-1 mt-1.5 cursor-pointer hover:underline"
        >
          <span className="text-size-12 text-gray-500">
            Highest influence: {highestInfluence.category} ·{' '}
            {(highestInfluence.sharePercent * 100).toFixed(1)}%
          </span>
          <Tooltip content="Your share of this class's total allocation. Click to view." />
        </div>
      )}
    </div>
  );
};
