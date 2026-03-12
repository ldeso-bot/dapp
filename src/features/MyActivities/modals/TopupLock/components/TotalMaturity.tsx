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

  const isKvcm = tokenSymbol === 'kVCM';
  const lockTermed = isKvcm ? 'locked' : 'staked';

  return (
    <div className="rounded-lg py-3 px-4 bg-surface-2 border border-border-subtle">
      <div className="flex flex-row gap-2 items-start justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-size-14 font-medium text-text-1">
            New amount of {lockTermed} tokens
          </div>
          <div className="text-size-12 text-text-1">
            <div>
              Original lock: {formatAmountWithCommas(currentLockAmount, 'auto')}{' '}
              {tokenSymbol}
            </div>
            <div>
              Added amount: {formatAmountWithCommas(topUpAmount, 'auto')}{' '}
              {tokenSymbol}
            </div>
          </div>

          <p className="text-size-20 font-semibold text-text-1">
            {formatAmountWithCommas(total, 'auto')} {tokenSymbol}
          </p>
        </div>
      </div>
    </div>
  );
};
