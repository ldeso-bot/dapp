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
  const { totalPosition, symbol, tooltip } = props;

  return (
    <div className="flex justify-between gap-4">
      <div className="flex items-center gap-2">
        {tooltip && (
          <Tooltip
            content={tooltip}
            className="max-w-[30rem] text-size-12 p-3"
          />
        )}
        <div className="tabular-nums font-semibold text-3xl">
          Tokens locked:
        </div>
      </div>
      <div className="tabular-nums font-semibold text-3xl">
        {formatAmountWithCommas(Number(totalPosition))} {symbol}
      </div>
    </div>
  );
};
