'use client';

import { formatLockDuration } from '@/features/MyActivities/shared/DurationStepper';
import { Maturity } from '@/shared/models/ProtocolData';
import { getDaysFromTimestamp } from '@/shared/utils/date.utils';

export type UseIncentivesBreakdownParams = {
  amount: number;
  duration: number;
  fullMaturity: Maturity;
};

export const useIncentivesBreakdown = ({
  amount,
  duration,
  fullMaturity,
}: UseIncentivesBreakdownParams) => {
  const baseYieldFormatted = (
    fullMaturity.syntheticYieldZeroCouponYieldCurve * 100
  ).toFixed(2);

  const incentivesYieldFormatted = (
    fullMaturity.riskyYieldZeroCouponYieldCurve ?? 0 * amount
  ).toFixed(2);

  const durationInDaysFromMaturity = getDaysFromTimestamp(
    fullMaturity.maturationTimestamp
  );

  const effectiveDurationDays =
    durationInDaysFromMaturity > 0
      ? durationInDaysFromMaturity
      : Number(duration);

  const lockDuration = formatLockDuration(effectiveDurationDays);

  return {
    baseYieldFormatted,
    incentivesYieldFormatted,
    lockDuration,
  };
};
