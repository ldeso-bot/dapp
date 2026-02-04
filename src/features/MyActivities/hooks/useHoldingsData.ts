import { LockableToken } from '@/shared/constants/tokens.constants';
import { useCurrentTimestamp } from '@/shared/hooks/useCurrentTimestamp';
import { AllMetrics } from '@/shared/models/ProtocolData';
import { Lock } from '@/shared/models/walletData';
import { computeTokenAmountValueUSD } from '@/shared/utils/protocol.utils';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { sumBy } from 'remeda';
import { useProtocolData } from '../../../shared/hooks/api/useProtocolData';
import { useWalletData } from '../../../shared/hooks/api/useWalletData';

const filterActiveLocks = (locks: Lock[]) =>
  locks.filter((lock) => lock.status === 'active');

const filterMaturedLocks = (locks: Lock[]) =>
  locks.filter((lock) => lock.status === 'matured');

const filterSoonToBeMaturedLocks = (
  locks: Lock[],
  currentTimestamp: number
) => {
  const soonToBeMaturedTimestamp = currentTimestamp + 30 * 24 * 60 * 60;
  return locks.filter((lock) => lock.lockedUntil < soonToBeMaturedTimestamp);
};

interface ComputeLockRewardsParams {
  locks: Lock[];
  currentTimestamp: number;
  metrics: AllMetrics;
  lockedToken: LockableToken;
  lockedTokenBalance: number;
}

interface TokenHoldingsData {
  locks: Lock[];
  activeLocks: Lock[];
  maturedLocks: Lock[];
  soonToBeMaturedLocks: Lock[];
  lockedAmount: number;
  lockedValue: number;
  k2AccruingClaimableAmount: number;
  kvcmAccruingClaimableAmount: number;
  k2AccruingClaimableValue: number;
  kvcmAccruingClaimableValue: number;
  accruingClaimableValue: number;
  k2AccruedClaimableAmount: number;
  kvcmAccruedClaimableAmount: number;
  k2AccruedClaimableValue: number;
  kvcmAccruedClaimableValue: number;
  accruedClaimableValue: number;
  k2ClaimableAmount: number;
  kvcmClaimableAmount: number;
  k2ClaimableValue: number;
  kvcmClaimableValue: number;
  claimableValue: number;
  positionAmount: number;
  positionValue: number;
  balanceValue: number;
}

export type AggregatedHoldingsData = {
  kvcm: TokenHoldingsData;
  k2: TokenHoldingsData;
  kvcmK2: TokenHoldingsData;
  kvcmUsdc: TokenHoldingsData;
  liquidityActiveLocks: Lock[];
  liquidityMaturedLocks: Lock[];
  liquiditySoonToBeMaturedLocks: Lock[];
  nbPoolsWithLocks: number;
  balanceValue: number;
  kvcmClaimableAmount: number;
  k2ClaimableAmount: number;
  liquidityLockedValue: number;
  lockedValue: number;
  claimableValueFromLiquidity: number;
  claimableValue: number;
  portfolioValue: number;
};

const computeLockRewards = ({
  locks,
  currentTimestamp,
  metrics,
  lockedToken,
  lockedTokenBalance,
}: ComputeLockRewardsParams): TokenHoldingsData => {
  const activeLocks = filterActiveLocks(locks);
  const maturedLocks = filterMaturedLocks(locks);
  const soonToBeMaturedLocks = filterSoonToBeMaturedLocks(
    activeLocks,
    currentTimestamp
  );

  const computeValueUSD = (amount: number) =>
    computeTokenAmountValueUSD(lockedToken, amount, metrics);

  // Locked amount
  const lockedAmount = sumBy(locks, (lock) => lock.lockedAmount);

  // Balance
  const balanceValue = computeValueUSD(lockedTokenBalance);

  // Locked value
  const lockedValue = computeValueUSD(lockedAmount);

  // Accruing claimable amounts
  const k2AccruingClaimableAmount = sumBy(
    locks,
    (lock) => lock.accruingRewards.k2
  );
  const kvcmAccruingClaimableAmount = sumBy(
    locks,
    (lock) => lock.accruingRewards.kvcm
  );

  // Accruing claimable values
  const k2AccruingClaimableValue =
    k2AccruingClaimableAmount * metrics.k2.valueUSD;
  const kvcmAccruingClaimableValue =
    kvcmAccruingClaimableAmount * metrics.kvcm.valueUSD;
  const accruingClaimableValue =
    k2AccruingClaimableValue + kvcmAccruingClaimableValue;

  // Accrued claimable amounts
  const k2AccruedClaimableAmount = sumBy(
    locks,
    (lock) => lock.claimableRewards.k2
  );
  const kvcmAccruedClaimableAmount = sumBy(
    locks,
    (lock) => lock.claimableRewards.kvcm
  );

  // Accrued claimable values
  const k2AccruedClaimableValue =
    k2AccruedClaimableAmount * metrics.k2.valueUSD;
  const kvcmAccruedClaimableValue =
    kvcmAccruedClaimableAmount * metrics.kvcm.valueUSD;

  // Total claimable amounts
  const k2ClaimableAmount =
    k2AccruingClaimableAmount + k2AccruedClaimableAmount;
  const kvcmClaimableAmount =
    kvcmAccruingClaimableAmount + kvcmAccruedClaimableAmount;
  const accruedClaimableValue =
    k2AccruedClaimableValue + kvcmAccruedClaimableValue;

  // Total claimable values
  const k2ClaimableValue = k2ClaimableAmount * metrics.k2.valueUSD;
  const kvcmClaimableValue = kvcmClaimableAmount * metrics.kvcm.valueUSD;
  const claimableValue = k2ClaimableValue + kvcmClaimableValue;

  // Principal
  const positionAmount =
    lockedToken == 'kvcm'
      ? lockedAmount + kvcmClaimableAmount
      : lockedToken == 'k2'
        ? lockedAmount + k2AccruingClaimableAmount + k2AccruedClaimableAmount
        : lockedAmount;

  const positionValue = computeValueUSD(positionAmount);

  return {
    balanceValue,
    locks,
    activeLocks,
    maturedLocks,
    soonToBeMaturedLocks,
    lockedAmount,
    lockedValue,
    k2AccruingClaimableAmount,
    kvcmAccruingClaimableAmount,
    accruingClaimableValue,
    k2AccruingClaimableValue,
    kvcmAccruingClaimableValue,
    k2AccruedClaimableAmount,
    accruedClaimableValue,
    kvcmAccruedClaimableAmount,
    k2AccruedClaimableValue,
    kvcmAccruedClaimableValue,
    k2ClaimableAmount,
    kvcmClaimableAmount,
    k2ClaimableValue,
    kvcmClaimableValue,
    claimableValue,
    positionAmount,
    positionValue,
  };
};

/**
 * Computes the holdings data for a given token
 * @param token - The token to get the holdings data for
 * @returns
 */
export function useTokenHoldingsData(
  token: LockableToken
): UseQueryResult<TokenHoldingsData | null, Error> {
  const { data: walletData } = useWalletData();
  const { data: protocolData } = useProtocolData();
  const currentTimestamp = useCurrentTimestamp();

  return useQuery({
    queryKey: ['tokenHoldingsData', walletData, protocolData, token],
    queryFn: () => {
      if (!walletData || !protocolData || !currentTimestamp) return null;
      const metrics = protocolData.metrics;

      // Filtered locks, sorted by maturity date (earliest first)
      const locks = walletData.locks
        .filter((lock) => lock.token === token)
        .sort((a, b) => a.lockedUntil - b.lockedUntil);

      const rewards = computeLockRewards({
        locks,
        currentTimestamp: currentTimestamp,
        metrics,
        lockedToken: token,
        lockedTokenBalance: walletData.balances[token],
      });

      return {
        ...rewards,
      };
    },
  });
}

/**
 *
 * @returns Aggregated holdings data for the current wallet
 */
export function useHoldingsData(): UseQueryResult<
  AggregatedHoldingsData | null,
  Error
> {
  const { data: kvcmData } = useTokenHoldingsData('kvcm');
  const { data: k2Data } = useTokenHoldingsData('k2');
  const { data: kvcmK2Data } = useTokenHoldingsData('kvcm-k2');
  const { data: kvcmUsdcData } = useTokenHoldingsData('kvcm-usdc');

  return useQuery({
    queryKey: ['useHoldingsData', kvcmData, k2Data, kvcmK2Data, kvcmUsdcData],
    queryFn: () => {
      if (!kvcmData || !k2Data || !kvcmK2Data || !kvcmUsdcData) return null;

      // Aggregate balances
      const balanceValue =
        kvcmData.balanceValue +
        k2Data.balanceValue +
        kvcmUsdcData.balanceValue +
        kvcmK2Data.balanceValue;

      // Aggregate liquidity locks
      const liquidityActiveLocks = kvcmK2Data.activeLocks.concat(
        kvcmUsdcData.activeLocks
      );
      const liquidityMaturedLocks = kvcmK2Data.maturedLocks.concat(
        kvcmUsdcData.maturedLocks
      );
      const liquiditySoonToBeMaturedLocks =
        kvcmK2Data.soonToBeMaturedLocks.concat(
          kvcmUsdcData.soonToBeMaturedLocks
        );

      // Aggregate locked values
      const liquidityLockedValue =
        kvcmUsdcData.lockedValue + kvcmK2Data.lockedValue;
      const lockedValue =
        kvcmData.lockedValue + k2Data.lockedValue + liquidityLockedValue;

      // Aggregate claimable amounts
      const kvcmClaimableAmount =
        kvcmData.kvcmClaimableAmount +
        k2Data.kvcmClaimableAmount +
        kvcmK2Data.kvcmClaimableAmount +
        kvcmUsdcData.kvcmClaimableAmount;

      const k2ClaimableAmount =
        kvcmData.k2ClaimableAmount +
        k2Data.k2ClaimableAmount +
        kvcmK2Data.k2ClaimableAmount;

      // Aggregate claimable values
      const claimableValueFromLiquidity =
        kvcmK2Data.claimableValue + kvcmUsdcData.claimableValue;

      const claimableValue =
        kvcmData.claimableValue +
        k2Data.claimableValue +
        claimableValueFromLiquidity;

      const portfolioValue = lockedValue + claimableValue + balanceValue;

      const nbPoolsWithLocks =
        (kvcmK2Data.locks.length > 0 ? 1 : 0) +
        (kvcmUsdcData.locks.length > 0 ? 1 : 0);

      return {
        kvcm: kvcmData,
        k2: k2Data,
        kvcmK2: kvcmK2Data,
        kvcmUsdc: kvcmUsdcData,
        // Aggregated data
        liquidityActiveLocks,
        liquidityMaturedLocks,
        liquiditySoonToBeMaturedLocks,
        nbPoolsWithLocks,
        balanceValue,
        kvcmClaimableAmount,
        k2ClaimableAmount,
        liquidityLockedValue,
        lockedValue,
        claimableValueFromLiquidity,
        claimableValue,
        portfolioValue,
      };
    },
  });
}
