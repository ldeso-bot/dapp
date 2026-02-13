import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import {
  isLockableTokenInfo,
  tokenInfoFromSubgraphSymbol,
} from '@/shared/constants/tokens.constants';
import { Lock, Locks } from '@/shared/models/walletData';
import { getSdk } from '@/shared/utils/subgraph.utils';
import { Lock_Filter } from '@generated/gql/types/protocol.types';
import { filter, isNonNullish } from 'remeda';
import { getTokenMetrics } from '../protocol/getTokenMetrics';
import { getLatestMidnightInfoDiffs } from '../protocol/midnightInfo.utils';
import { getProtocolState } from '../protocol/protocol.utils';
import { mapK2Lock, mapKvcmOrLpLock } from './locks.utils';

export const getLocks = async (
  chainId: ChainId,
  walletAddress: string
): Promise<Locks> => {
  const sdk = getSdk(chainId);
  if (USE_MOCKS) {
    return getMockLocks();
  }

  // Fetch locks
  const [locks, latestMidnightInfos, protocolState, tokenMetrics] =
    await Promise.all([
      sdk.protocol.getLocks({
        where: {
          account_: {
            id: walletAddress,
          },
        } as Lock_Filter,
      }),
      getLatestMidnightInfoDiffs(sdk),
      getProtocolState(sdk),
      getTokenMetrics(chainId),
    ]);

  // Map locks
  const mappedLocks = locks.locks.map((lock): Lock | null => {
    const tokenInfo = tokenInfoFromSubgraphSymbol(lock.token.symbol);
    if (!isLockableTokenInfo(tokenInfo)) {
      console.warn('❓ Unknown lockable token:', lock.token.symbol);
      return null;
    }
    if (!protocolState) {
      console.error('❌ Protocol state not found');
      return null;
    }
    const isK2Lock = tokenInfo.id === 'k2';
    const latestMidnightInfosArray = Object.values(latestMidnightInfos);
    const latestMidnightInfo =
      latestMidnightInfosArray[Number(lock.maturityId)];

    return isK2Lock
      ? mapK2Lock({
          lock,
          protocolState,
          tokenMetrics,
          latestMidnightInfo,
          tokenInfo,
        })
      : mapKvcmOrLpLock({
          lock,
          protocolState,
          tokenMetrics,
          latestMidnightInfo,
          tokenInfo,
        });
  });

  // Cull and return locks
  return filter(mappedLocks, isNonNullish);
};

const getMockLocks = (): Locks => {
  return [
    {
      created: 1719859200,
      canRequestUnlock: false,
      id: '1',
      contractLockId: 1,
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
      isPendingUnlock: false,
      lockedUntil: 1719859200,
      status: 'active',
      earningStatus: 'earning',
      canTopUp: true,
    },
    {
      created: 1764515366,
      canRequestUnlock: true,
      id: '2',
      contractLockId: 2,
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
      isPendingUnlock: false,
      lockedUntil: 1764515366,
      status: 'active',
      earningStatus: 'paused',
      canTopUp: true,
    },
  ];
};
