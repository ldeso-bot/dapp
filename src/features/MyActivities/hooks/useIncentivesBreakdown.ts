'use client';

import { DAYS_IN_YEAR } from '@/shared/constants/protocol.constants';
import { LockableToken } from '@/shared/constants/tokens.constants';
import { Maturity } from '@/shared/models/ProtocolData';
import { getDaysFromTimestamp } from '@/shared/utils/date.utils';
import {
  formatAmountWithCommas,
  formatPercentage,
} from '@/shared/utils/string.utils';

export type UseIncentivesBreakdownParams = {
  amount: number;
  maturity: Maturity;
  token: LockableToken;
};

export const useIncentivesBreakdown = ({
  amount,
  maturity,
  token,
}: UseIncentivesBreakdownParams) => {
  const lockDuration = getDaysFromTimestamp(maturity.maturationTimestamp);
  const kvcmApy = maturity.apys[token].kvcmApy;
  const k2Apy = maturity.apys[token].k2Apy;

  // Compute daily percentage increase from Apys
  // We have to take into account that synthetic yield is exponential
  const k2Py = k2Apy / DAYS_IN_YEAR;
  const kvcmPy =
    token === 'kvcm'
      ? Math.pow(kvcmApy + 1, 1 / 365) - 1
      : kvcmApy / DAYS_IN_YEAR;

  const kvcmYieldFormatted = formatAmountWithCommas(
    token === 'kvcm'
      ? (Math.pow(1 + kvcmPy, lockDuration) - 1) * amount
      : kvcmPy * amount * lockDuration,
    'auto'
  );

  const k2YieldFormatted = formatAmountWithCommas(
    k2Py * amount * lockDuration,
    'auto'
  );

  const kvcmApyFormatted = formatPercentage(kvcmApy);
  const k2ApyFormatted = formatPercentage(k2Apy);

  return {
    kvcmYieldFormatted,
    k2YieldFormatted,
    kvcmApyFormatted,
    k2ApyFormatted,
    lockDuration,
  };
};
