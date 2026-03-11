import { DUST_LEVEL } from '@/shared/constants/config.constants';
import { ONE_DAY } from '@/shared/constants/protocol.constants';
import {
  LockableTokenInfo,
  Token,
  tokenInfoFromSubgraphSymbol,
  tokens,
} from '@/shared/constants/tokens.constants';
import {
  SDKAllocation,
  SDKLock,
  SDKLockAction,
} from '@/shared/models/generated';
import { AllMetrics, Maturity, YieldType } from '@/shared/models/ProtocolData';
import { EarningStatus, Lock } from '@/shared/models/walletData';
import { computeTokenAmountValueUSD } from '@/shared/utils/protocol.utils';
import { formatStringToNumber } from '@/shared/utils/subgraph.utils';
import { LockActionType } from '@generated/gql/types/protocol.types';
import {
  ComputedMidnightInfo,
  computeMidnightInfoDiffWithPrevious,
  formatMidnightInfo,
  FormattedMidnightInfo,
  getFormattedMidnightInfoAccumulator,
} from '../protocol/midnightInfo.utils';
import {
  ProtocolState,
  tokensEligibleForIncentives,
} from '../protocol/protocol.utils';

const computeSyntheticYieldRewards = (
  lock: SDKLock,
  midnightInfo: FormattedMidnightInfo
) => {
  const currentPps = midnightInfo.syntheticYieldPps; // Pps now (or at the time of maturation)

  const rewards = lock.lockActions.reduce((acc, action) => {
    if (
      action.type === LockActionType.SHARES_UPDATED &&
      action.syntheticYieldEntryMidnightInfo?.keeperUpdated
    ) {
      const actionAmount = formatStringToNumber(
        action.amount,
        tokens.kvcm.decimals
      ); // Amount locked
      const actionPps = formatStringToNumber(
        action.syntheticYieldEntryMidnightInfo.syntheticYieldPps,
        tokens.kvcm.decimals
      ); // PPS at the time the lock shares are minted (during next midnight)
      const actionShares = actionAmount / actionPps; // Shares minted
      const actionClaimable = actionShares * currentPps; // Claimable for the action
      const actionRewards = actionClaimable - actionAmount; // Rewards for the action

      return acc + actionRewards;
    }
    return acc;
  }, 0);
  return rewards;
};

const getRewardsBetweenMidnights = ({
  midnightInfoNow,
  midnightInfoThen,
  shares,
  token,
  yieldType,
}: {
  midnightInfoNow: FormattedMidnightInfo;
  midnightInfoThen: FormattedMidnightInfo;
  shares: number;
  yieldType: YieldType;
  token: Token;
}) => {
  if (!midnightInfoNow.keeperUpdated) {
    console.warn(
      '⚠️ Computing rewards with non updated midnight info',
      midnightInfoNow
    );
  }
  if (!midnightInfoThen.keeperUpdated) {
    console.warn(
      '⚠️ Computing rewards with non updated midnight info',
      midnightInfoThen
    );
  }
  const accumulatorNow = getFormattedMidnightInfoAccumulator(
    midnightInfoNow,
    yieldType,
    token
  );
  const accumulatorThen = getFormattedMidnightInfoAccumulator(
    midnightInfoThen,
    yieldType,
    token
  );
  return shares * (accumulatorNow - accumulatorThen);
};

const computeAccumlulatorYieldRewards = (
  lock: SDKLock,
  midnightInfo: FormattedMidnightInfo,
  yieldType: YieldType,
  minTimestamp: number = 0,
  maxTimestamp: number = Number.MAX_SAFE_INTEGER
) => {
  const tokenInfo = tokenInfoFromSubgraphSymbol(lock.token.symbol);
  if (!tokenInfo) {
    console.error('❌ Token info not found');
    return 0;
  }
  const rewards = lock.lockActions.reduce((acc, action) => {
    const entryMidnightInfo =
      yieldType === YieldType.K2
        ? action.k2YieldEntryMidnightInfo
        : action.riskyYieldEntryMidnightInfo;
    const decimals =
      yieldType === YieldType.K2 ? tokens.k2.decimals : tokens.kvcm.decimals;

    if (
      action.type === LockActionType.SHARES_UPDATED &&
      entryMidnightInfo?.keeperUpdated
    ) {
      const actionTimestamp = formatStringToNumber(action.timestamp, 0);
      if (actionTimestamp < minTimestamp || actionTimestamp > maxTimestamp) {
        return acc;
      }

      const actionRewards = getRewardsBetweenMidnights({
        midnightInfoNow: midnightInfo,
        midnightInfoThen: formatMidnightInfo(entryMidnightInfo),
        shares: formatStringToNumber(action.amount, decimals),
        yieldType,
        token: tokenInfo.id,
      });

      return acc + actionRewards;
    }
    return acc;
  }, 0);

  return rewards;
};

type MapLockProps = {
  // TODO: Create a formatted Lock type with preprocessed data
  lock: SDKLock;
  protocolState: ProtocolState;
  tokenMetrics: AllMetrics;
  latestMidnightInfo: ComputedMidnightInfo | undefined;
  tokenInfo: LockableTokenInfo;
  allocations: SDKAllocation[];
};

export const mapKvcmOrLpLock = ({
  lock,
  protocolState,
  tokenMetrics,
  latestMidnightInfo,
  tokenInfo,
  maturity,
}: MapLockProps & { maturity: Maturity }): Lock | null => {
  // Computing lock maturation
  const lockedUntil = formatStringToNumber(lock.maturity?.timestamp, 0);
  const isMatured = lockedUntil < new Date().getTime() / 1000;
  const created = formatStringToNumber(lock.lockActions[0]?.timestamp, 0) ?? 0;

  //Computing rewards information
  const lockedAmount = formatStringToNumber(lock.amount, tokenInfo.decimals);

  //Computing rewards information
  const originalLockedAmount = formatStringToNumber(
    lock.originalAmount,
    tokenInfo.decimals
  );
  const originalLockedValueUSD = computeTokenAmountValueUSD(
    tokenInfo.id,
    originalLockedAmount,
    tokenMetrics
  );

  // For kVCM position amount is later increased with the pending synthetic yield rewards
  let positionAmount = lockedAmount;
  const lockedValueUSD = computeTokenAmountValueUSD(
    tokenInfo.id,
    lockedAmount,
    tokenMetrics
  );
  let k2YieldApyPercent = 0;
  let riskyYieldApyPercent = 0;
  let syntheticYieldApyPercent = 0;
  let k2Rewards = 0;
  let kvcmRewards = 0;
  let k2ClaimableRewards = 0;
  let kvcmClaimableRewards = 0;
  let k2AccruingRewards = 0;
  let kvcmAccruingRewards = 0;
  let unlockableLockedAmount = 0;

  // Compute earning status
  const earningStatus = computeEarningStatus(protocolState, tokenInfo.id);

  const isSyntheticYieldEligible = tokensEligibleForIncentives[
    YieldType.SYNTHETIC
  ].includes(tokenInfo.id);
  const isRiskyYieldEligible = tokensEligibleForIncentives[
    YieldType.RISKY
  ].includes(tokenInfo.id);
  const isK2YieldEligible = tokensEligibleForIncentives[YieldType.K2].includes(
    tokenInfo.id
  );

  // Midnightinfo at the time of the lock maturity
  const lockMaturityMidnightInfo = lock.maturity?.maturityMidnightInfo
    ?.keeperUpdated
    ? computeMidnightInfoDiffWithPrevious(
        lock.maturity?.maturityMidnightInfo,
        tokenMetrics
      )
    : null;

  // Midnight info relevant to compute yields for this lock
  const midnightInfo =
    !isMatured || !lockMaturityMidnightInfo
      ? // Latest midnight info for non matured locks or matured locks with no keeper activity yet
        latestMidnightInfo
      : // midnightInfo attached to the maturity for matured locks
        lockMaturityMidnightInfo;

  if (!midnightInfo) {
    console.warn(
      `No midnight info found for lock ${lock.id} (maturityId: ${lock.maturityId})`
    );
  } else {
    // K2 yield
    if (isK2YieldEligible) {
      k2Rewards = computeAccumlulatorYieldRewards(
        lock,
        midnightInfo,
        YieldType.K2
      );

      k2YieldApyPercent = midnightInfo.k2ApyFor[tokenInfo.id];
    }
    // Risky yield
    if (isRiskyYieldEligible) {
      kvcmRewards = computeAccumlulatorYieldRewards(
        lock,
        midnightInfo,
        YieldType.RISKY
      );
      riskyYieldApyPercent = midnightInfo.kvcmApyFor[tokenInfo.id];
    }
    // Synthetic yield
    if (isSyntheticYieldEligible) {
      kvcmRewards = computeSyntheticYieldRewards(lock, midnightInfo);
      syntheticYieldApyPercent = maturity.apys.kvcm.kvcmApy;
      positionAmount += kvcmRewards;
    }
  }

  // We know a lock was partially claimed if it still is locked but the principal was claimed
  const isPartiallyClaimed = lock.status !== 'UNLOCKED' && lockedAmount == 0;

  // Lock is claimable if all rewards are unlocked but the lock is not totally unlocked yet
  // or if partial rewards are unlocked and the lock principal was not claimed yet
  const arePartialRewardsUnlocked = isMatured;
  const areAllRewardsUnlocked =
    arePartialRewardsUnlocked && !!lockMaturityMidnightInfo;
  const isClaimable =
    (areAllRewardsUnlocked && lock.status !== 'UNLOCKED') ||
    (arePartialRewardsUnlocked && !isPartiallyClaimed);

  if (isClaimable) {
    const riskyYieldClaimed = formatStringToNumber(
      lock.riskyYieldClaimed,
      tokens.kvcm.decimals
    );
    const syntheticYieldClaimed = formatStringToNumber(
      lock.syntheticYieldClaimed,
      tokens.kvcm.decimals
    );
    const k2YieldClaimed = formatStringToNumber(
      lock.k2YieldClaimed,
      tokens.k2.decimals
    );
    k2ClaimableRewards = k2Rewards - k2YieldClaimed;
    kvcmClaimableRewards =
      kvcmRewards - riskyYieldClaimed - syntheticYieldClaimed;
    unlockableLockedAmount = lockedAmount;
  } else {
    k2AccruingRewards = k2Rewards;
    kvcmAccruingRewards = kvcmRewards;
  }

  const positionValueUSD = computeTokenAmountValueUSD(
    tokenInfo.id,
    positionAmount,
    tokenMetrics
  );

  const now = new Date().getTime() / 1000;

  // A lock can be topped up up to 2 days before it matures
  const canTopUp =
    Math.floor(lockedUntil / ONE_DAY) - Math.floor(now / ONE_DAY) > 1;

  const status =
    lock.status === 'UNLOCKED' ? 'claimed' : isMatured ? 'matured' : 'active';

  return {
    id: lock.id,
    created,
    contractLockId: formatStringToNumber(lock.contractLockId, 0),
    lockedAmount,
    lockedValueUSD,
    originalLockedAmount,
    originalLockedValueUSD,
    positionAmount,
    positionValueUSD,
    k2YieldApyPercent,
    riskyYieldApyPercent,
    syntheticYieldApyPercent,
    token: tokenInfo.id,
    maturityId: formatStringToNumber(lock.maturityId, 0),
    rewards: {
      kvcm: kvcmRewards,
      k2: k2Rewards,
      // TODO: Not implemented yet in protocol
      carbonTonnes: 0,
    },
    claimableRewards: {
      kvcm: kvcmClaimableRewards,
      k2: k2ClaimableRewards,
    },
    accruingRewards: {
      kvcm: kvcmAccruingRewards,
      k2: k2AccruingRewards,
    },
    isClaimable,
    isPendingUnlock: false,
    unlockableLockedAmount,
    availableForUnlockRequestAmount: 0,
    requestedForUnlockAmount: 0,
    canRequestUnlock: isClaimable,
    availableForUnlockRequestAt: lockedUntil,
    lockedUntil,
    status,
    earningStatus,
    canTopUp,
    isPartiallyClaimed,
  };
};

/**
 * Computes accumulated rewards between two timestamps
 * @param lock the lock to compute the rewards for
 * @param shares the shares at the start of the window
 * @param endMidnightInfo midnightinfo to compare the action accumulator against
 * @param startTimestamp minimum timestamp to take lock actions into account
 * @param endTimestamp maximum timestamp to take lock actions into account
 */
const computeK2LockAccumulatedRewards = ({
  lock,
  shares,
  endMidnightInfo,
  startTimestamp,
  endTimestamp,
}: {
  lock: SDKLock;
  shares: number;
  endMidnightInfo: FormattedMidnightInfo | undefined;
  startTimestamp: number;
  endTimestamp: number;
}) => {
  if (!endMidnightInfo) {
    console.error('❌ End midnight info not found');
    return {
      tmpK2Rewards: 0,
      tmpKvcmRewards: 0,
    };
  }
  // K2 Rewards
  // Get rewards for the claimable window
  let tmpK2Rewards = computeAccumlulatorYieldRewards(
    lock,
    endMidnightInfo,
    YieldType.K2,
    startTimestamp,
    endTimestamp
  );

  // Add the rewards comming from the leftover shares
  if (lock.k2WindowStartMidnightInfo) {
    tmpK2Rewards += getRewardsBetweenMidnights({
      midnightInfoNow: endMidnightInfo,
      midnightInfoThen: formatMidnightInfo(lock.k2WindowStartMidnightInfo),
      shares: shares,
      yieldType: YieldType.K2,
      token: 'k2',
    });
  }

  // KVCM Rewards
  // Get rewards for the claimable window
  let tmpKvcmRewards = computeAccumlulatorYieldRewards(
    lock,
    endMidnightInfo,
    YieldType.RISKY,
    startTimestamp,
    endTimestamp
  );

  // Add the rewards comming from the leftover shares
  if (lock.k2WindowStartMidnightInfo) {
    tmpKvcmRewards += getRewardsBetweenMidnights({
      midnightInfoNow: endMidnightInfo,
      midnightInfoThen: formatMidnightInfo(lock.k2WindowStartMidnightInfo),
      shares: formatStringToNumber(lock.k2SharesAtClaimed, tokens.k2.decimals),
      yieldType: YieldType.RISKY,
      token: 'k2',
    });
  }
  return {
    tmpK2Rewards,
    tmpKvcmRewards,
  };
};

const getActionMetrics = (action: SDKLockAction) => {
  const actionTimestamp = formatStringToNumber(action.timestamp, 0);
  const actionBlockTimestamp = formatStringToNumber(action.blockTimestamp, 0);
  const now = new Date().getTime() / 1000;
  const daysSinceAction =
    Math.floor(now / ONE_DAY) - Math.floor(actionTimestamp / ONE_DAY);
  return {
    actionTimestamp,
    actionBlockTimestamp,
    daysSinceAction,
  };
};

/**
 * Helper function to sum the amounts of the lock actions witrh weights
 * @param lock
 * @param multiplierFunction
 * @returns
 */
const sumLockActionsAmounts = (
  lock: SDKLock,
  multiplierFunction: (action: SDKLockAction, daysSinceAction: number) => number
) => {
  return lock.lockActions.reduce((acc, action) => {
    const { daysSinceAction } = getActionMetrics(action);

    return (
      acc +
      formatStringToNumber(action.amount, tokens.k2.decimals) *
        multiplierFunction(action, daysSinceAction)
    );
  }, 0);
};

export const mapK2Lock = ({
  lock,
  protocolState,
  tokenMetrics,
  latestMidnightInfo,
  tokenInfo,
  allocations,
}: MapLockProps): Lock | null => {
  const now = new Date().getTime() / 1000;

  /**
   * request unlock timestamp
   * if it is not 0 then unlock was requested and rewards have not been claimed yet
   */
  const requestUnlockTimestamp = formatStringToNumber(
    lock.requestUnlockTimestamp,
    0
  );
  const isUnlockRequested = lock.status === 'UNLOCK_REQUESTED';

  // A K2 lock is claimable if an unlock request has been made and the request unlock timestamp has been reached
  const isMatured = isUnlockRequested && now > requestUnlockTimestamp;
  const isClaimable = isMatured;
  const isPendingUnlock = isUnlockRequested && now < requestUnlockTimestamp;
  const lockedUntil = requestUnlockTimestamp;
  const created = formatStringToNumber(lock.lockActions[0]?.timestamp, 0) ?? 0;
  const k2Allocated = allocations.reduce(
    (acc, allocation) =>
      acc + formatStringToNumber(allocation.amount, tokens.k2.decimals),
    0
  );

  // Locked amount cannot be fetched from the subgraph because there are no events when the K2 escrow is actually released
  // We sum all LockActions amounts to get the locked amount
  // TODO: This could lead to a performance issue with large amount of lock actions
  const lockedAmount = sumLockActionsAmounts(
    lock,
    (action, daysSinceAction) => {
      // We take into consideration only actions that happened before the current timestamp (discarding future unlocks)
      if (daysSinceAction < 0) return 0;
      return action.type === LockActionType.LOCKED
        ? 1
        : action.type === LockActionType.UNLOCK_REQUESTED
          ? -1
          : 0;
    }
  );

  const availableForUnlockRequestAmount =
    sumLockActionsAmounts(lock, (action, daysSinceAction) => {
      if (action.type === LockActionType.LOCKED && daysSinceAction > 1)
        return 1;
      if (action.type === LockActionType.UNLOCK_REQUESTED) return -1;
      return 0;
    }) - k2Allocated;

  const requestedForUnlockAmount = sumLockActionsAmounts(
    lock,
    (action, daysSinceAction) => {
      return action.type === LockActionType.UNLOCK_REQUESTED &&
        daysSinceAction == -1
        ? 1
        : 0;
    }
  );

  let availableForUnlockRequestAt = 0;
  // We sort the actions by block timestamp instead of by action timestramp
  // Because a user could request unlock of all token (resolves at midnight)
  // then create a deposit (resolves now)
  // In this case we would not detect that the user had unlocked all of their token *
  // Because at the time at unlock, we would count the newly deposited tokens
  const blockTimestampSortedActions = lock.lockActions.sort((a, b) => {
    const { actionBlockTimestamp: aBlockTimestamp } = getActionMetrics(a);
    const { actionBlockTimestamp: bBlockTimestamp } = getActionMetrics(b);
    return aBlockTimestamp - bBlockTimestamp;
  });
  blockTimestampSortedActions.forEach((action) => {
    const { actionTimestamp } = getActionMetrics(action);
    // The user can unlock one day after the midnight of the first lock action
    if (
      action.type === LockActionType.LOCKED &&
      availableForUnlockRequestAt == 0
    ) {
      availableForUnlockRequestAt =
        (Math.floor(actionTimestamp / ONE_DAY) + 2) * ONE_DAY;
    }
    // Reset the counter if the user has unlocked all non allocated tokens
    if (
      action.type === LockActionType.UNLOCK_REQUESTED &&
      formatStringToNumber(action.lockAmount, tokens.k2.decimals) -
        k2Allocated <=
        DUST_LEVEL
    ) {
      availableForUnlockRequestAt = 0;
    }
  });

  // A K2 lock can be requested if no unlock request have been made
  // or if the request unlock timestamp has not been reached yet (adds unlock amount to the same midnight)
  // And there are tokens to be unlocked
  const canRequestUnlock =
    availableForUnlockRequestAmount > 0 &&
    (requestUnlockTimestamp == 0 || now < requestUnlockTimestamp);

  let unlockableLockedAmount = 0;

  const positionAmount = lockedAmount;
  const lockedValueUSD = computeTokenAmountValueUSD(
    tokenInfo.id,
    lockedAmount,
    tokenMetrics
  );
  const positionValueUSD = lockedValueUSD;

  // Computing rewards information
  const syntheticYieldApyPercent = 0;
  let k2ClaimableRewards = 0;
  let kvcmClaimableRewards = 0;
  let k2AccruingRewards = 0;
  let kvcmAccruingRewards = 0;
  const riskyYieldApyPercent =
    latestMidnightInfo?.kvcmApyFor[tokenInfo.id] ?? 0;
  const k2YieldApyPercent = latestMidnightInfo?.k2ApyFor[tokenInfo.id] ?? 0;

  // Compute earning status
  const earningStatus = computeEarningStatus(protocolState, tokenInfo.id);

  // Compute accruing rewards
  const startAccruingRewardsTimestamp = isClaimable
    ? requestUnlockTimestamp
    : formatStringToNumber(lock.k2WindowStartMidnightInfo?.timestamp ?? 0n, 0);

  const startShares = isClaimable
    ? lock.k2SharesAtUnlockRequest
    : lock.k2SharesAtClaimed;

  const { tmpK2Rewards, tmpKvcmRewards } = computeK2LockAccumulatedRewards({
    lock,
    shares: formatStringToNumber(startShares, tokens.k2.decimals),
    endMidnightInfo: latestMidnightInfo,
    startTimestamp: startAccruingRewardsTimestamp,
    endTimestamp: Number.MAX_SAFE_INTEGER,
  });
  k2AccruingRewards = tmpK2Rewards;
  kvcmAccruingRewards = tmpKvcmRewards;

  // Compute claimable rewards
  if (isClaimable && latestMidnightInfo) {
    const endMidnightInfo = lock.k2WindowEndMidnightInfo?.keeperUpdated
      ? formatMidnightInfo(lock.k2WindowEndMidnightInfo)
      : latestMidnightInfo;

    const endMidnightIndex = endMidnightInfo.midnightIndex;
    const startMidnightIndex = formatStringToNumber(
      lock.k2WindowStartMidnightInfo?.midnightIndex ?? 0n,
      0
    );
    const claimableWindowDuration = endMidnightIndex - startMidnightIndex;
    const endClaimableRewardsTimestamp = formatStringToNumber(
      lock.requestUnlockTimestamp,
      0
    );
    const startClaimableRewardsTimestamp =
      endClaimableRewardsTimestamp - claimableWindowDuration * ONE_DAY;

    const { tmpK2Rewards, tmpKvcmRewards } = computeK2LockAccumulatedRewards({
      lock,
      shares: formatStringToNumber(
        lock.k2SharesAtUnlockRequest,
        tokens.k2.decimals
      ),
      endMidnightInfo,
      startTimestamp: startClaimableRewardsTimestamp,
      endTimestamp: endClaimableRewardsTimestamp,
    });
    k2ClaimableRewards = tmpK2Rewards;
    kvcmClaimableRewards = tmpKvcmRewards;

    unlockableLockedAmount = sumLockActionsAmounts(lock, (action) => {
      return formatStringToNumber(action.timestamp, 0) ==
        endClaimableRewardsTimestamp &&
        action.type == LockActionType.UNLOCK_REQUESTED
        ? 1
        : 0;
    });
  }

  const k2Rewards = k2AccruingRewards + k2ClaimableRewards;
  const kvcmRewards = kvcmAccruingRewards + kvcmClaimableRewards;

  const status =
    lock.status === 'UNLOCKED' ? 'claimed' : isMatured ? 'matured' : 'active';

  return {
    id: lock.id,
    created,
    contractLockId: formatStringToNumber(lock.contractLockId, 0),
    lockedAmount,
    lockedValueUSD,
    originalLockedAmount: lockedAmount,
    originalLockedValueUSD: lockedValueUSD,
    positionAmount,
    positionValueUSD,
    k2YieldApyPercent,
    riskyYieldApyPercent,
    syntheticYieldApyPercent,
    token: tokenInfo.id,
    maturityId: formatStringToNumber(lock.maturityId, 0),
    rewards: {
      kvcm: kvcmRewards,
      k2: k2Rewards,
      // TODO: Not implemented yet in protocol
      carbonTonnes: 0,
    },
    claimableRewards: {
      kvcm: kvcmClaimableRewards,
      k2: k2Rewards,
    },
    accruingRewards: {
      kvcm: kvcmAccruingRewards,
      k2: k2AccruingRewards,
    },
    isClaimable,
    isPendingUnlock,
    lockedUntil,
    unlockableLockedAmount,
    availableForUnlockRequestAmount,
    requestedForUnlockAmount,
    availableForUnlockRequestAt,
    status,
    earningStatus,
    canRequestUnlock,
    canTopUp: true,
    isPartiallyClaimed: false,
  };
};

const computeEarningStatus = (
  protocolState: ProtocolState,
  tokenId: string
): EarningStatus => {
  const earningStatusFromBoolean = (boolean: boolean): EarningStatus =>
    boolean ? 'paused' : 'earning';

  let earningStatus: EarningStatus = earningStatusFromBoolean(
    protocolState.systemPauseStatus
  );

  if (!protocolState.systemPauseStatus) {
    if (tokenId === 'kvcm') {
      earningStatus = earningStatusFromBoolean(
        protocolState.kvcmStakingPauseStatus
      );
    } else if (tokenId === 'k2') {
      earningStatus = earningStatusFromBoolean(
        protocolState.k2StakingPauseStatus
      );
    } else if (tokenId === 'kvcm-usdc' || tokenId === 'kvcm-k2') {
      earningStatus = earningStatusFromBoolean(
        protocolState.lpStakingPauseStatus
      );
    }
  }

  return earningStatus;
};
