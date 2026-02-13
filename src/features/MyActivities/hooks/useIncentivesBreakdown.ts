'use client';

import { formatLockDuration } from '@/features/MyActivities/shared/DurationStepper';
import { Maturity } from '@/shared/models/ProtocolData';
import { getDaysFromTimestamp } from '@/shared/utils/date.utils';

export type UseIncentivesBreakdownParams = {
  amount: number;
  maturity: Maturity;
};

export const useIncentivesBreakdown = ({
  amount,
  maturity,
}: UseIncentivesBreakdownParams) => {
  const duration = getDaysFromTimestamp(maturity.maturationTimestamp);
  const baseYieldFormatted = (
    maturity.syntheticYieldZeroCouponYieldCurve * 100
  ).toFixed(2);

  const incentivesYieldFormatted = (
    maturity.riskyYieldZeroCouponYieldCurve ?? 0 * amount
  ).toFixed(2);

  const durationInDaysFromMaturity = getDaysFromTimestamp(
    maturity.maturationTimestamp
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
