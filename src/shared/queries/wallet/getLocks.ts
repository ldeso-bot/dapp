import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import {
  isLockableToken,
  tokenInfoFromSubgraphSymbol,
} from '@/shared/constants/tokens.constants';
import { YieldType } from '@/shared/models/ProtocolData';
import { Lock, Locks } from '@/shared/models/walletData';
import { formatStringToNumber, getSdk } from '@/shared/utils/subgraph.utils';
import { Lock_Filter } from '@generated/gql/types/protocol.types';
import { filter, isNonNullish } from 'remeda';
import {
  computeMidnightInfo,
  formatMidnightInfo,
  getLatestMidnightInfos,
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
  const [locks, latestMidnightInfos] = await Promise.all([
    sdk.protocol.getLocks({
      where: {
        account_: {
          id: walletAddress,
        },
      } as Lock_Filter,
    }),
    getLatestMidnightInfos(sdk),
  ]);

  // Map locks
  const mappedLocks = locks.locks.map((lock): Lock | null => {
    const tokenInfo = tokenInfoFromSubgraphSymbol(lock.token.symbol);
    if (!tokenInfo || !isLockableToken(tokenInfo.id)) {
      console.warn('❓ Unknown lockable token:', lock.token.symbol);
      return null;
    }
    const balance = formatStringToNumber(lock.amount, 18);
    const valueUSD = formatStringToNumber(lock.token.priceUsdc?.priceUsdc, 6);
    let k2YieldApyPercent = 0;
    let riskyYieldApyPercent = 0;
    let syntheticYieldApyPercent = 0;
    let k2Rewards = 0;
    let kvcmRewards = 0;

    const isSyntheticYieldEligible = tokensEligibleForIncentives[
      YieldType.SYNTHETIC
    ].includes(tokenInfo.id);
    const isRiskyYieldEligible = tokensEligibleForIncentives[
      YieldType.RISKY
    ].includes(tokenInfo.id);
    const isK2YieldEligible = tokensEligibleForIncentives[
      YieldType.K2
    ].includes(tokenInfo.id);

    // latest midnight info for this lock's maturity
    //TODO: Can someone check the maths?
    const midnightInfo = latestMidnightInfos[lock.maturityId];
    if (midnightInfo) {
      // K2 yield
      if (isK2YieldEligible) {
        k2YieldApyPercent = midnightInfo.k2Apy;
        k2Rewards += formatStringToNumber(lock.k2YieldPending, 18);
        if (lock.k2YieldEntryMidnightInfo) {
          const { k2py } = computeMidnightInfo(
            midnightInfo,
            formatMidnightInfo(lock.k2YieldEntryMidnightInfo)
          );
          k2Rewards += k2py * formatStringToNumber(lock.k2YieldShares, 18);
        }
      }
      // Risky yield
      if (isRiskyYieldEligible) {
        riskyYieldApyPercent = midnightInfo.riskyYieldApy;
        kvcmRewards += formatStringToNumber(lock.riskyYieldPending, 18);
        if (lock.riskyYieldEntryMidnightInfo) {
          const { riskyYieldPy } = computeMidnightInfo(
            midnightInfo,
            formatMidnightInfo(lock.riskyYieldEntryMidnightInfo)
          );
          kvcmRewards +=
            riskyYieldPy * formatStringToNumber(lock.riskyYieldShares, 18);
        }
      }
      // Synthetic yield
      if (isSyntheticYieldEligible) {
        syntheticYieldApyPercent = midnightInfo.syntheticYieldApy;
        const claimable =
          formatStringToNumber(lock.syntheticYieldShares, 18) *
          midnightInfo.syntheticYieldPps;
        kvcmRewards += claimable - balance;
      }
    }

    const endTimestamp = 0;

    return {
      id: lock.id,
      balance,
      valueUSD,
      k2YieldApyPercent,
      riskyYieldApyPercent,
      syntheticYieldApyPercent,
      endTimestamp,
      token: tokenInfo.id,
      rewards: {
        kvcm: kvcmRewards,
        k2: k2Rewards,
        // TODO: Not implemented yet in protocol
        carbonTonnes: 0,
      },
    };
  });

  // Cull and return locks
  return filter(mappedLocks, isNonNullish);
};

const getMockLocks = (): Locks => {
  return [
    {
      id: '1',
      balance: 1000,
      valueUSD: 3000,
      riskyYieldApyPercent: 0.06,
      syntheticYieldApyPercent: 0.07,
      k2YieldApyPercent: 0.12,
      endTimestamp: 1719859200,
      token: 'kvcm',
      rewards: {
        kvcm: 31.5,
        k2: 22.34,
        carbonTonnes: 12,
      },
    },
    {
      id: '2',
      balance: 12.25,
      valueUSD: 36.75,
      riskyYieldApyPercent: 0.06,
      syntheticYieldApyPercent: 0.17,
      k2YieldApyPercent: 0.06,
      endTimestamp: 1764515366,
      token: 'kvcm',
      rewards: {
        kvcm: 44.6,
        k2: 13.5,
        carbonTonnes: 12,
      },
    },
  ];
};
