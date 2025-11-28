import { USE_MOCKS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import {
  isLockableToken,
  tokenInfoFromSubgraphSymbol,
} from '@/shared/constants/tokens.constants';
import { Lock, Locks } from '@/shared/models/walletData';
import { formatStringToNumber, getSdk } from '@/shared/utils/subgraph.utils';
import { Lock_Filter } from '@generated/gql/types/protocol.types';
import { filter, isNonNullish } from 'remeda';

export const getLocks = async (
  chainId: ChainId,
  walletAddress: string
): Promise<Locks> => {
  const sdk = getSdk(chainId);
  if (USE_MOCKS) {
    return getMockLocks();
  }

  // Fetch locks
  const locks = await sdk.protocol.getLocks({
    where: {
      account_: {
        id: walletAddress,
      },
    } as Lock_Filter,
  });

  // Map locks
  const mappedLocks = locks.locks.map((lock): Lock | null => {
    const tokenInfo = tokenInfoFromSubgraphSymbol(lock.token.symbol);
    if (!tokenInfo || !isLockableToken(tokenInfo.id)) {
      console.warn('❓ Unknown lockable token:', lock.token.symbol);
      return null;
    }
    const apyPercent = 0;
    const riskyYieldPercent = 0;
    const endTimestamp = 0;

    return {
      id: lock.id,
      balance: formatStringToNumber(lock.amount, 18),
      valueUSD: formatStringToNumber(lock.token.priceUsdc?.priceUsdc, 6),
      apyPercent,
      riskyYieldPercent,
      baseApyPercent: 0, // TODO: What is this?
      endTimestamp,
      token: tokenInfo.id,
      rewards: {
        // TODO: Implement rewards
        kvcm: 0,
        k2: 0,
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
      apyPercent: 0.12,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
      endTimestamp: 1719859200,
      token: 'kvcm',
      rewards: {
        kvcm: 313510,
        k2: 1354800,
        carbonTonnes: 12,
      },
    },
    {
      id: '2',
      balance: 12.25,
      valueUSD: 36.75,
      apyPercent: 0.2403,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
      endTimestamp: 1719859200,
      token: 'kvcm',
      rewards: {
        kvcm: 313510,
        k2: 1354800,
        carbonTonnes: 12,
      },
    },
    {
      id: '1',
      balance: 1000,
      valueUSD: 3000,
      apyPercent: 0.1797,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
      endTimestamp: 1719859200,
      token: 'k2',
      rewards: {
        kvcm: 313510,
        k2: 1354800,
        carbonTonnes: 12,
      },
    },
    {
      id: '2',
      balance: 1000,
      valueUSD: 3000,
      apyPercent: 0.1797,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
      endTimestamp: 1719859200,
      token: 'k2',
      rewards: {
        kvcm: 313510,
        k2: 1354800,
        carbonTonnes: 12,
      },
    },
    {
      id: '3',
      balance: 1000,
      valueUSD: 3000,
      apyPercent: 0.1797,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
      endTimestamp: 1719859200,
      token: 'k2',
      rewards: {
        kvcm: 313510,
        k2: 1354800,
        carbonTonnes: 12,
      },
    },
    {
      id: '4',
      balance: 1000,
      valueUSD: 3000,
      apyPercent: 0.1797,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
      endTimestamp: 1719859200,
      token: 'k2',
      rewards: {
        kvcm: 313510,
        k2: 1354800,
        carbonTonnes: 12,
      },
    },
    {
      id: '5',
      balance: 12.25,
      valueUSD: 36.75,
      apyPercent: 0.2403,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
      endTimestamp: 1719859200,
      token: 'k2',
      rewards: {
        kvcm: 313510,
        k2: 1354800,
        carbonTonnes: 12,
      },
    },
    {
      id: '6',
      balance: 12.25,
      valueUSD: 36.75,
      apyPercent: 0.2403,
      riskyYieldPercent: 0.06,
      baseApyPercent: 0.07,
      endTimestamp: 1719859200,
      token: 'kvcm-usdc',
      rewards: {
        kvcm: 313510,
        k2: 1354800,
        carbonTonnes: 12,
      },
    },
    {
      id: '7',
      balance: 15.25,
      valueUSD: 321.5,
      apyPercent: 0.0203,
      riskyYieldPercent: 0.02,
      baseApyPercent: 0.05,
      endTimestamp: 1719859300,
      token: 'kvcm-usdc',
      rewards: {
        kvcm: 313510,
        k2: 1354800,
        carbonTonnes: 12,
      },
    },
  ];
};
