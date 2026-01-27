'use client';

import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { formatPriceUSDWithCommas } from '@/shared/utils/string.utils';
import { type FC } from 'react';

type Props = {
  estimatedValue: string | number;
  tooltip?: React.ReactNode | string;
};

export const HoldingEstimatedValue: FC<Props> = (props) => {
  const { estimatedValue, tooltip } = props;
  return (
    <div className="flex justify-between gap-4">
      <div className="flex items-center gap-2">
        {tooltip && (
          <Tooltip
            content={tooltip}
            className="max-w-[30rem] text-size-12 p-3"
          />
        )}
        <div>Estimated USD value:</div>
      </div>
      <div>{formatPriceUSDWithCommas(Number(estimatedValue))}</div>
    </div>
  );
};
