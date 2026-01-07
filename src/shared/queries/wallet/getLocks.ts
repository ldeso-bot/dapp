import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { ONE_DAY } from '@/shared/constants/protocol.constants';
import {
  isLockableToken,
  tokenInfoFromSubgraphSymbol,
} from '@/shared/constants/tokens.constants';
import { YieldType } from '@/shared/models/ProtocolData';
import { EarningStatus, Lock, Locks } from '@/shared/models/walletData';
import { computeTokenAmountValueUSD } from '@/shared/utils/protocol.utils';
import { formatStringToNumber, getSdk } from '@/shared/utils/subgraph.utils';
import {
  Lock_Filter,
  LockActionType,
} from '@generated/gql/types/protocol.types';
import { filter, isNonNullish } from 'remeda';
import { getTokenMetrics } from '../protocol/getTokenMetrics';
import {
  computeMidnightInfo,
  computeMidnightInfoWithSelf,
  formatMidnightInfo,
  getLatestMidnightInfos,
} from '../protocol/midnightInfo.utils';
import {
  getProtocolState,
  ProtocolState,
  tokensEligibleForIncentives,
} from '../protocol/protocol.utils';

export const getLocks = async (
  chainId: ChainId,
  walletAddress: string
): Promise<Locks> => {
  const sdk = getSdk(chainId);
  if (USE_MOCKS) {
    return getMockLocks();
  }

  // Fetch locks
  const [locks, latestMidnightInfos, protocolState, metrics] =
    await Promise.all([
      sdk.protocol.getLocks({
        where: {
          account_: {
            id: walletAddress,
          },
        } as Lock_Filter,
      }),
      getLatestMidnightInfos(sdk),
      getProtocolState(sdk),
      getTokenMetrics(chainId),
    ]);

  // Map locks
  const mappedLocks = locks.locks.map((lock): Lock | null => {
    const tokenInfo = tokenInfoFromSubgraphSymbol(lock.token.symbol);
    if (!tokenInfo || !isLockableToken(tokenInfo.id)) {
      console.warn('❓ Unknown lockable token:', lock.token.symbol);
      return null;
    }
    if (!protocolState) {
      console.error('❌ Protocol state not found');
      return null;
    }

    const mintingInfo = lock.lastSharesMintingAction;

    const lockK2YieldClaimableAmount = formatStringToNumber(
      lock.k2YieldClaimableAmount,
      18
    );
    const lockRiskyYieldClaimableAmount = formatStringToNumber(
      lock.riskyYieldClaimableAmount,
      18
    );
    const lockYieldCutoffMidnightIndex = formatStringToNumber(
      mintingInfo?.yieldCutoffMidnightIndex,
      0
    );

    const isK2Lock = tokenInfo.id === 'k2';

    // Computing lock maturation
    const lockedUntil = formatStringToNumber(lock.maturity?.timestamp, 0);
    const isMatured = lockedUntil < new Date().getTime() / 1000;

    // Computing rewards maturation information
    // Splitting because of K2 locks. Lock is always mature but rewards are not
    let claimLockedUntil = lockedUntil;

    if (isK2Lock) {
      if (lockK2YieldClaimableAmount || lockRiskyYieldClaimableAmount) {
        claimLockedUntil =
          protocolState.protocolStartTimestamp +
          lockYieldCutoffMidnightIndex * ONE_DAY;
      } else {
        claimLockedUntil = 0;
      }
    }
    const isClaimable = claimLockedUntil < new Date().getTime() / 1000;

    //Computing rewards information
    const lockedAmount = formatStringToNumber(lock.amount, tokenInfo.decimals);
    let positionAmount = lockedAmount;
    const lockedValueUSD = computeTokenAmountValueUSD(
      tokenInfo.id,
      lockedAmount,
      metrics
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

    // Compute earning status
    const earningStatus = computeEarningStatus(protocolState, tokenInfo.id);

    const isSyntheticYieldEligible = tokensEligibleForIncentives[
      YieldType.SYNTHETIC
    ].includes(tokenInfo.id);
    const isRiskyYieldEligible = tokensEligibleForIncentives[
      YieldType.RISKY
    ].includes(tokenInfo.id);
    const isK2YieldEligible = tokensEligibleForIncentives[
      YieldType.K2
    ].includes(tokenInfo.id);

    const lockMaturityMidnightInfo =
      lock.maturity?.maturityMidnightInfo &&
      computeMidnightInfoWithSelf(lock.maturity?.maturityMidnightInfo);

    // Midnight info relevant to compute yields for this lock
    const midnightInfo =
      !isMatured || isK2Lock
        ? // Latest midnight info for non matured or K2 locks
          latestMidnightInfos[lock.maturityId]
        : // midnightInfo attached to the maturity for matured locks
          lockMaturityMidnightInfo;

    if (!midnightInfo) {
      console.warn(
        `No midnight info found for lock ${lock.id} (maturityId: ${lock.maturityId})`
      );
    } else {
      // K2 yield
      if (isK2YieldEligible) {
        // Total Rewards
        k2YieldApyPercent = midnightInfo.k2ApyFor[tokenInfo.id];
        k2Rewards += formatStringToNumber(mintingInfo?.amount, 18);
        if (mintingInfo?.k2YieldEntryMidnightInfo) {
          const { k2PyFor } = computeMidnightInfo(
            midnightInfo,
            formatMidnightInfo(mintingInfo.k2YieldEntryMidnightInfo)
          );
          k2Rewards +=
            k2PyFor[tokenInfo.id] *
            formatStringToNumber(mintingInfo.k2YieldShares, 18);
        }
        // Claimable rewards
        if (isClaimable) {
          k2ClaimableRewards =
            tokenInfo.id === 'k2' ? lockK2YieldClaimableAmount : k2Rewards;
        }
      }
      // Risky yield
      if (isRiskyYieldEligible) {
        // Total Rewards
        riskyYieldApyPercent = midnightInfo.kvcmApyFor[tokenInfo.id];
        kvcmRewards += formatStringToNumber(mintingInfo?.amount, 18);
        if (mintingInfo?.riskyYieldEntryMidnightInfo) {
          const { kvcmPyFor } = computeMidnightInfo(
            midnightInfo,
            formatMidnightInfo(mintingInfo.riskyYieldEntryMidnightInfo)
          );
          kvcmRewards +=
            kvcmPyFor[tokenInfo.id] *
            formatStringToNumber(mintingInfo.riskyYieldShares, 18);
        }
        // Claimable rewards
        if (isClaimable) {
          kvcmClaimableRewards =
            tokenInfo.id === 'k2' ? lockRiskyYieldClaimableAmount : kvcmRewards;
        }
      }
      // Synthetic yield
      if (isSyntheticYieldEligible) {
        syntheticYieldApyPercent = midnightInfo.kvcmApyFor.kvcm;

        const claimable = lock.lockActions.reduce((acc, action) => {
          if (action.type === LockActionType.SHARES_MINTED) {
            const actionAmount = formatStringToNumber(action.amount, 18); // Amount locked
            const actionPps = formatStringToNumber(
              action.syntheticYieldEntryMidnightInfo?.syntheticYieldPps,
              18
            ); // PPS at the time the lock shares are minted (during next midnight)
            const actionShares = actionAmount * actionPps; // Shares minted
            const currentPps = midnightInfo.syntheticYieldPps; // Pps now (or at the time of maturation)
            const actionRewards = actionShares * currentPps; // Rewards for the action
            return acc + actionRewards;
          }
          return acc;
        }, 0);

        kvcmRewards += claimable - lockedAmount;
        positionAmount += kvcmRewards;
        kvcmClaimableRewards = isClaimable ? kvcmRewards : 0;
      }
    }
    k2AccruingRewards = k2Rewards - k2ClaimableRewards;
    kvcmAccruingRewards = kvcmRewards - kvcmClaimableRewards;

    const positionValueUSD = computeTokenAmountValueUSD(
      tokenInfo.id,
      positionAmount,
      metrics
    );

    const status =
      positionAmount <= 0 ? 'claimed' : isMatured ? 'matured' : 'active';

    return {
      id: lock.id,
      lockedAmount,
      lockedValueUSD,
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
      lockedUntil,
      status,
      earningStatus,
    };
  });

  // Cull and return locks
  return filter(mappedLocks, isNonNullish);
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

const getMockLocks = (): Locks => {
  return [
    {
      id: '1',
      maturityId: 1,
      lockedAmount: 1000,
      lockedValueUSD: 3000,
      positionAmount: 1031.25,
      positionValueUSD: 3093.25,
      riskyYieldApyPercent: 0.06,
      syntheticYieldApyPercent: 0.07,
      k2YieldApyPercent: 0.12,
      token: 'kvcm',
      rewards: {
        kvcm: 31.5,
        k2: 22.34,
        carbonTonnes: 12,
      },
      claimableRewards: {
        kvcm: 31.5,
        k2: 22.34,
      },
      accruingRewards: {
        kvcm: 0,
        k2: 0,
      },
      isClaimable: true,
      lockedUntil: 1719859200,
      status: 'active',
      earningStatus: 'earning',
    },
    {
      id: '2',
      maturityId: 2,
      lockedAmount: 12.25,
      lockedValueUSD: 36.75,
      positionAmount: 50.9375,
      positionValueUSD: 152.8125,
      riskyYieldApyPercent: 0.06,
      syntheticYieldApyPercent: 0.17,
      k2YieldApyPercent: 0.06,
      token: 'kvcm',
      rewards: {
        kvcm: 44.6,
        k2: 13.5,
        carbonTonnes: 12,
      },
      claimableRewards: {
        kvcm: 44.6,
        k2: 13.5,
      },
      accruingRewards: {
        kvcm: 0,
        k2: 0,
      },
      isClaimable: false,
      lockedUntil: 1764515366,
      status: 'active',
      earningStatus: 'paused',
    },
  ];
};
