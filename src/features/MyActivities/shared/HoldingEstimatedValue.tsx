'use client';

import { formatPriceUSDWithCommas } from '@/shared/utils/string.utils';
import { type FC } from 'react';

type Props = {
  estimatedValue: string | number;
  tooltip?: React.ReactNode | string;
};

export const HoldingEstimatedValue: FC<Props> = (props) => {
  const { estimatedValue } = props;

  return (
    <div className="flex justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-[1.6rem]" />
          <div>Estimated USD value:</div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div>{formatPriceUSDWithCommas(Number(estimatedValue))}</div>
        <span className="inline-flex items-center ml-1 opacity-0 pointer-events-none select-none">
          <span className="w-[1.6rem] h-[1.6rem]" />
        </span>
      </div>
    </div>
  );
};
