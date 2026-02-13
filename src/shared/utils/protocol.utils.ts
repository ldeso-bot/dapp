import { LockableToken } from '../constants/tokens.constants';
import { AllMetrics } from '../models/ProtocolData';

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
    const supply = metrics[token]?.supply || 0;
    const valueLockedUSD = metrics[token]?.valueLockedUSD || 0;

    if (supply === 0) return 0;
    return (amount / supply) * valueLockedUSD;
  } else {
    // Regular tokens have an intrinsic value.
    const valueUSD = metrics[token]?.valueUSD || 0;
    return amount * valueUSD;
  }
};
