import { ONE_MONTH, ONE_YEAR } from '@/shared/constants/protocol.constants';
import { LockableToken } from '../constants/tokens.constants';
import { AllMetrics } from '../models/ProtocolData';

export const MATURITY_DATES = [ONE_MONTH, ONE_YEAR] as const;

export const MATURITY_DATES_OPTIONS = [
  {
    value: ONE_MONTH,
    label: '1 month',
  },
  {
    value: 365,
    label: '1 year',
  },
];

/**
 * Computes the value of a token amount in USD taking into account that LP tokens are positions and do not have an intrinsic value.
 * @param token - The token to compute the value for
 * @param amount - The amount of tokens to compute the value for
 * @param metrics - The metrics to use to compute the value
 * @returns The value of the tokens in USD
 */
export const computeTokenAmountValueUSD = (
  token: LockableToken,
  amount: number,
  metrics: AllMetrics
) => {
  if (token === 'kvcm-k2' || token === 'kvcm-usdc') {
    // Lp Tokens are positions, they do not have an intrinsic value.
    // We compute the value based on the position amount and the value locked in the pool.
    return (amount / metrics[token].supply) * metrics[token].valueLockedUSD;
  } else {
    // Regular tokens have an intrinsic value.
    return amount * metrics[token].valueUSD;
  }
};
