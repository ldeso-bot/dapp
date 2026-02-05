'use client';

import { formatAmountWithCommas } from '@/shared/utils/string.utils';
import { type FC } from 'react';

type TotalMaturityProps = {
  currentLockAmount: number;
  topUpAmount: number;
  tokenSymbol: string;
};

export const TotalMaturity: FC<TotalMaturityProps> = (props) => {
  const { currentLockAmount, topUpAmount, tokenSymbol } = props;
  const total = currentLockAmount + topUpAmount;

  return (
    <div className="rounded-lg py-3 px-4 bg-gray-50 border border-gray-200">
      <div className="flex flex-row gap-2 items-start justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-size-14 font-medium text-gray-800">
            Your total at maturity (this lock)
          </div>
          <p className="text-size-12 text-gray-500">
            Existing (projected) ~ {formatAmountWithCommas(currentLockAmount, 0)}{' '}
            + Top-up base ~ {formatAmountWithCommas(topUpAmount, 0)}
          </p>
          <p className="text-size-20 font-semibold text-gray-800">
            ~ {formatAmountWithCommas(total, 0)} {tokenSymbol}
          </p>
        </div>
      </div>
    </div>
  );
};
