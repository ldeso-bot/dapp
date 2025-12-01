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
        <div className="font-semibold">Estimated value:</div>
        {tooltip && (
          <Tooltip
            content={tooltip}
            className="max-w-[30rem] text-size-12 p-3"
          />
        )}
      </div>
      <div className="font-semibold">
        {formatPriceUSDWithCommas(Number(estimatedValue))}
      </div>
    </div>
  );
};
