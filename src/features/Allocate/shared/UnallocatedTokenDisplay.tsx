'use client';

import {
  formatAmountWithCommas,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';
import { type FC } from 'react';

type Props = {
  amount: number;
  usdValue: number;
  tokenSymbol: string;
  label: string;
  showPriceEffect?: boolean;
};

export const UnallocatedTokenDisplay: FC<Props> = (props) => {
  const { amount, usdValue, tokenSymbol, label, showPriceEffect } = props;

  return (
    <div className="flex flex-col gap-1 items-center">
      <div className="text-size-14 font-medium text-gray-900 tabular-nums">
        {formatAmountWithCommas(amount, 2)} {tokenSymbol}{' '}
        <span className="text-size-12 text-gray-500">
          (≈ {formatPriceUSDWithCommas(usdValue)})
        </span>
      </div>
      <div className="flex items-center justify-center gap-1.5 mt-0.5">
        <span className="text-size-12 text-gray-500">{label}</span>
        {showPriceEffect && (
          <div className="inline-flex items-center rounded-full border py-1 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-gray-200 bg-void-10 text-void-60 hover:bg-void-20 text-size-10 h-4 px-1.5">
            No price effect
          </div>
        )}
      </div>
    </div>
  );
};
