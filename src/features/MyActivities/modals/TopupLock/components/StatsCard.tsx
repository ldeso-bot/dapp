'use client';

import { TokenInfo } from '@/shared/constants/tokens.constants';
import {
  formatAmountWithCommas,
  formatPercentage,
  formatTimestamp,
} from '@/shared/utils/string.utils';
import { type FC } from 'react';

type StatsCardProps = {
  currentLockAmount: number;
  maturityDate: number | null;
  baseApy: number;
  totalAccruingRewards: number;
  token: TokenInfo;
};

export const StatsCard: FC<StatsCardProps> = (props) => {
  const { maturityDate, baseApy, currentLockAmount, token } = props;

  const isKvcm = token.id === 'kvcm';
  const lockTerm = isKvcm ? 'lock' : 'stake';

  return (
    <div className="rounded-lg py-3 px-4 bg-surface-2 border border-border-default">
      <div className="flex flex-row gap-2 items-start justify-between">
        <div className="flex flex-col gap-0">
          <div className="text-size-12 font-medium text-text-2 uppercase">
            Duration
          </div>
          <p className="text-size-16 font-semibold text-text-1">
            {maturityDate
              ? formatTimestamp(maturityDate * 1000, 'short')
              : 'N/A'}
          </p>
        </div>
        <div className="flex flex-col gap-0 items-start">
          <div className="text-size-12 font-medium text-text-2 uppercase">
            Base APY
          </div>
          <div className="text-size-24 text-text-1 font-semibold">
            {formatPercentage(baseApy)}
          </div>
        </div>
      </div>
      <div className="h-px bg-divider my-3" />
      <div className="flex flex-col gap-1">
        <div className="text-size-12 font-medium text-text-2 uppercase">
          Current {lockTerm}
        </div>
        <p className="text-size-16 font-medium text-text-1">
          {formatAmountWithCommas(currentLockAmount, 'auto')}{' '}
          <span className="text-text-2 text-size-14 font-normal">
            {token.symbol}
          </span>{' '}
        </p>
      </div>
    </div>
  );
};
