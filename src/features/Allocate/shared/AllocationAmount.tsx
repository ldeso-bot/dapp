'use client';

import { formatAmountWithCommas } from '@/shared/utils/string.utils';
import { type FC } from 'react';
import { AllocationsTableItemProps } from './AllocationsTable.types';

export const AllocationAmount: FC<AllocationsTableItemProps> = (props) => {
  const { allocation, tokenInfo } = props;
  const isK2 = tokenInfo.id === 'k2';
  const isKvcm = tokenInfo.id === 'kvcm';

  if (isK2 || isKvcm) {
    const sharePercent = allocation.sharePercent * 100;
    const tokenSymbol = isK2 ? 'K2' : 'kVCM';

    return (
      <div className="text-right">
        <div className="font-medium text-gray-900 tabular-nums">
          {formatAmountWithCommas(allocation.amount)}{' '}
          <span className="text-void-50 text-size-12">{tokenSymbol}</span>
        </div>
        {sharePercent > 0 && (
          <div className="text-size-12 text-void-50 mt-0.5 tabular-nums">
            Your share of class: {sharePercent.toFixed(1)}%
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="font-bold flex flex-row gap-2 items-center">
      {tokenInfo.icon(1.6)}
      {formatAmountWithCommas(allocation.amount)}
    </div>
  );
};
