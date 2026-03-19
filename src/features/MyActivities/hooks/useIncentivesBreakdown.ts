'use client';

import { DAYS_IN_YEAR } from '@/shared/constants/protocol.constants';
import { LockableToken } from '@/shared/constants/tokens.constants';
import { useMaturities } from '@/shared/hooks/api/useMaturities';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
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
  const debouncedAmount = useDebouncedValue(amount, 300);
  const debouncedMaturityId = useDebouncedValue(maturity.maturityId, 300);

  const { data: maturities, isLoading: isLoadingMaturities } = useMaturities({
    token,
    // Event if the user enters 0, we still want to show some API information
    // Even if no locks exists for this maturity
    amount: debouncedAmount || 1,
    maturityId: debouncedMaturityId,
  });

  const activeMaturity =
    maturities?.find((m) => m.maturityId === maturity.maturityId) ?? maturity;

  const lockDuration = getDaysFromTimestamp(activeMaturity.maturationTimestamp);
  const kvcmApy = activeMaturity.apys[token].kvcmApy;
  const k2Apy = activeMaturity.apys[token].k2Apy;

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
    isLoadingMaturities,
  };
};
