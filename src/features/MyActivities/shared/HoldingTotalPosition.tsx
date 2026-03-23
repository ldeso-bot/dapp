'use client';

import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { formatAmountWithCommas } from '@/shared/utils/string.utils';
import { type FC } from 'react';

type Props = {
  symbol: string;
  totalPosition: string | number;
  tooltip?: React.ReactNode | string;
};

export const HoldingTotalPosition: FC<Props> = ({ totalPosition, symbol }) => {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2 text-lg sm:text-2xl text-text-3">
        Token locks &amp; incentives [t339]
        <Tooltip
          className="max-w-[30rem] text-size-12 p-3"
          content="Total of your original amount of tokens locked plus incentives. Incentives may accrue while locked and become claimable when tokens unlock. [t340]"
        />
      </div>

      <div className="mt-2 text-3xl text-text-1 sm:text-4xl font-bold tabular-nums break-words">
        {formatAmountWithCommas(Number(totalPosition))} {symbol}
      </div>
    </div>
  );
};
