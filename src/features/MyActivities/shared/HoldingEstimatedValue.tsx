'use client';

import { formatPriceUSDWithCommas } from '@/shared/utils/string.utils';
import { type FC } from 'react';

type Props = {
  estimatedValue: string | number;
  tooltip?: React.ReactNode | string;
};

export const HoldingEstimatedValue: FC<Props> = ({ estimatedValue }) => {
  return (
    <div className="mt-4 pt-4 border-t border-void-20 flex items-start justify-between gap-3">
      <div className="text-lg sm:text-xl text-gray-500">
        Estimated USD value
      </div>
      <div className="text-lg sm:text-xl tabular-nums text-right break-words">
        {formatPriceUSDWithCommas(Number(estimatedValue))}
      </div>
    </div>
  );
};
