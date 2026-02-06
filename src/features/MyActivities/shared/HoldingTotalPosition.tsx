'use client';

import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { formatAmountWithCommas } from '@/shared/utils/string.utils';
import { type FC } from 'react';

type Props = {
  symbol: string;
  totalPosition: string | number;
  tooltip?: React.ReactNode | string;
};

export const HoldingTotalPosition: FC<Props> = (props) => {
  const { totalPosition, symbol } = props;

  return (
    <div className="flex justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-[1.6rem]" />
          <div className="tabular-nums font-semibold text-3xl">
            Token locks & incentives:
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 tabular-nums font-semibold text-3xl">
        <div>
          {formatAmountWithCommas(Number(totalPosition))} {symbol}
        </div>
        <span className="inline-flex items-center ml-1 -translate-y-px">
          <Tooltip
            className="max-w-[30rem] text-size-12 p-3"
            content="Total of your original amount of tokens locked plus incentives. Incentives may accrue while locked and become claimable when tokens unlock."
          />
        </span>
      </div>
    </div>
  );
};
