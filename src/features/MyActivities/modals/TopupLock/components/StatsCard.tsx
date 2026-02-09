'use client';

import { formatDurationFromTimestamp } from '@/shared/utils/date.utils';
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
  tokenSymbol: string;
};

export const StatsCard: FC<StatsCardProps> = (props) => {
  const {
    maturityDate,
    baseApy,
    currentLockAmount,
    totalAccruingRewards,
    tokenSymbol,
  } = props;

  return (
    <div className="rounded-lg py-3 px-4 bg-gray-50 border border-gray-200">
      <div className="flex flex-row gap-2 items-start justify-between">
        <div className="flex flex-col gap-0">
          <div className="text-size-12 font-medium text-gray-600 uppercase">
            Duration
          </div>
          <p className="text-size-16 font-semibold text-gray-800">
            {maturityDate
              ? formatTimestamp(maturityDate * 1000, 'short')
              : 'N/A'}
          </p>
          <p className="text-size-14 text-gray-600">
            {maturityDate ? formatDurationFromTimestamp(maturityDate) : 'N/A'}{' '}
            left
          </p>
        </div>
        <div className="flex flex-col gap-0 items-start">
          <div className="text-size-12 font-medium text-gray-600 uppercase">
            Base APY
          </div>
          <div className="text-size-24 text-gray-800 font-semibold">
            {formatPercentage(baseApy)}
          </div>
        </div>
      </div>
      <div className="h-px bg-gray-200 my-3" />
      <div className="flex flex-col gap-1">
        <div className="text-size-12 font-medium text-gray-600 uppercase">
          Current lock
        </div>
        <p className="text-size-16 font-medium text-gray-800">
          {formatAmountWithCommas(currentLockAmount, 0)}{' '}
          <span className="text-gray-600 text-size-14 font-normal">
            {tokenSymbol}
          </span>{' '}
          <span className="text-gray-400 text-size-14 font-normal">•</span>{' '}
          <span className="text-gray-600 text-size-14 font-normal">
            {formatAmountWithCommas(totalAccruingRewards, 0)} {tokenSymbol}{' '}
            accruing
          </span>
        </p>
      </div>
    </div>
  );
};
