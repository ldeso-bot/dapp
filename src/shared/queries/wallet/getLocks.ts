import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import {
  isLockableToken,
  tokenInfoFromSubgraphSymbol,
} from '@/shared/constants/tokens.constants';
import { YieldType } from '@/shared/models/ProtocolData';
import { EarningStatus, Lock, Locks } from '@/shared/models/walletData';
import { formatStringToNumber, getSdk } from '@/shared/utils/subgraph.utils';
import { Lock_Filter } from '@generated/gql/types/protocol.types';
import { filter, isNonNullish } from 'remeda';
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
  const [locks, latestMidnightInfos, protocolState] = await Promise.all([
    sdk.protocol.getLocks({
      where: {
        account_: {
          id: walletAddress,
        },
      } as Lock_Filter,
    }),
    getLatestMidnightInfos(sdk),
    getProtocolState(sdk),
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
    const tokenPriceUSD = formatStringToNumber(
      lock.token.priceUsdc?.priceUsdc,
      6
    );

    const lockedUntil = formatStringToNumber(lock.maturity?.timestamp, 0);
    const isMatured = lockedUntil < new Date().getTime() / 1000;

    const lockedAmount = formatStringToNumber(lock.amount, 18);
    let positionAmount = lockedAmount;
    const lockedValueUSD = lockedAmount * tokenPriceUSD;
    let k2YieldApyPercent = 0;
    let riskyYieldApyPercent = 0;
    let syntheticYieldApyPercent = 0;
    let k2Rewards = 0;
    let kvcmRewards = 0;

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

    // Midnight info useful to compute yields for this lock
    const midnightInfo = isMatured
      ? // midnightInfo attached to the maturity if matured
        lockMaturityMidnightInfo
      : // otherwise, use the latest midnight info
        latestMidnightInfos[Number(lock.maturityId)];

    if (midnightInfo) {
      // K2 yield
      if (isK2YieldEligible) {
        k2YieldApyPercent = midnightInfo.k2ApyFor[tokenInfo.id];
        k2Rewards += formatStringToNumber(lock.k2YieldPending, 18);
        if (lock.k2YieldEntryMidnightInfo) {
          const { k2PyFor } = computeMidnightInfo(
            midnightInfo,
            formatMidnightInfo(lock.k2YieldEntryMidnightInfo)
          );
          k2Rewards +=
            k2PyFor[tokenInfo.id] *
            formatStringToNumber(lock.k2YieldShares, 18);
        }
      }
      // Risky yield
      if (isRiskyYieldEligible) {
        riskyYieldApyPercent = midnightInfo.kvcmApyFor[tokenInfo.id];
        kvcmRewards += formatStringToNumber(lock.riskyYieldPending, 18);
        if (lock.riskyYieldEntryMidnightInfo) {
          const { kvcmPyFor } = computeMidnightInfo(
            midnightInfo,
            formatMidnightInfo(lock.riskyYieldEntryMidnightInfo)
          );
          kvcmRewards +=
            kvcmPyFor[tokenInfo.id] *
            formatStringToNumber(lock.riskyYieldShares, 18);
        }
      }
      // Synthetic yield
      if (isSyntheticYieldEligible) {
        syntheticYieldApyPercent = midnightInfo.kvcmApyFor.kvcm;
        const claimable =
          formatStringToNumber(lock.syntheticYieldShares, 18) *
          midnightInfo.syntheticYieldPps;
        kvcmRewards += claimable - lockedAmount;
        positionAmount += kvcmRewards;
      }
    }

    const positionValueUSD = positionAmount * tokenPriceUSD;

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
      rewards: {
        kvcm: kvcmRewards,
        k2: k2Rewards,
        // TODO: Not implemented yet in protocol
        carbonTonnes: 0,
      },
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
      lockedUntil: 1719859200,
      status: 'active',
      earningStatus: 'earning',
    },
    {
      id: '2',
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
      lockedUntil: 1764515366,
      status: 'active',
      earningStatus: 'paused',
    },
  ];
};
