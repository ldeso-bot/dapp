import { ChainId } from '@/shared/constants/networks.constants';
import { Allocation_Filter } from '@generated/gql/types/protocol.types';
import { cached } from '@/shared/utils/cache.utils';
import { WALLET_DATA_CACHE_TIME_SECONDS } from '../constants/config.constants';
import { AllocatableToken } from '../constants/tokens.constants';
import { SDKAllocation } from '../models/generated';
import { Allocation, WalletData } from '../models/walletData';
import { getProtocolState } from '../queries/protocol/protocol.utils';
import { getSdk } from './subgraph.utils';

export const getUserSdkAllocations = async (
  chainId: ChainId,
  walletAddress: string
): Promise<SDKAllocation[]> => {
  return cached(
    async () => {
      const sdk = getSdk(chainId);
      const protocolState = await getProtocolState(sdk);
      const [userKvcmAllocations, userK2Allocations] = await Promise.all([
        sdk.protocol.getAllocations({
          where: {
            token_: { symbol: 'KVCM' },
            lock_: {
              maturityId_gte: protocolState?.firstActiveMaturityId,
            },
            account_: {
              id: walletAddress,
            },
          } as unknown as Allocation_Filter,
        }),
        sdk.protocol.getAllocations({
          where: {
            token_: { symbol: 'K2' },
            account_: {
              id: walletAddress,
            },
          } as unknown as Allocation_Filter,
        }),
      ]);
      const userAllocations = [
        ...userKvcmAllocations.allocations,
        ...userK2Allocations.allocations,
      ];
      return userAllocations;
    },
    ['user-allocations', chainId, walletAddress],
    { revalidate: WALLET_DATA_CACHE_TIME_SECONDS }
  )();
};

type TokenAllocationStats = {
  allocations: Allocation[];
  allocated: number;
  unallocated: number;
  classes: number;
  highestInfluence: Allocation | null;
  requestedForUnlockAmount: number;
};

export const computeTokenAllocationStats = (
  walletData: WalletData | undefined,
  balance: number | undefined,
  token: AllocatableToken
): TokenAllocationStats => {
  const allocations = walletData?.allocations;
  const allocationsList = allocations || [];
  const tokenBalance = balance || 0;

  const tokenAllocations = allocationsList.filter(
    (a) => a.token.name === token
  );

  const requestedForUnlockAmount =
    walletData?.locks
      .filter((lock) => lock.token === token)
      .reduce((sum, lock) => sum + lock.requestedForUnlockAmount, 0) || 0;

  const allocated = tokenAllocations.reduce((sum, a) => sum + a.amount, 0);
  const unallocated = Math.max(
    0,
    tokenBalance - allocated - requestedForUnlockAmount
  );
  const classes = new Set(tokenAllocations.map((a) => a.carbonClass)).size;
  const highestInfluence =
    tokenAllocations.reduce(
      (max, alloc) =>
        alloc.sharePercent > (max?.sharePercent || 0) ? alloc : max,
      null as Allocation | null
    ) || null;

  return {
    allocations: tokenAllocations,
    allocated,
    unallocated,
    classes,
    highestInfluence,
    requestedForUnlockAmount,
  };
};

export const computeMaxAllocationForPosition = (params: {
  balance: number;
  totalAllocated: number;
  currentAllocationAmount: number;
  requestedForUnlockAmount: number;
}) => {
  const {
    balance,
    totalAllocated,
    currentAllocationAmount,
    requestedForUnlockAmount,
  } = params;
  return Math.max(
    0,
    balance +
      currentAllocationAmount -
      (totalAllocated + requestedForUnlockAmount)
  );
};
