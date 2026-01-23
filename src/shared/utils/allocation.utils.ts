import { AllocatableToken } from '../constants/tokens.constants';
import { Allocation, Allocations } from '../models/walletData';

type TokenAllocationStats = {
  allocations: Allocation[];
  allocated: number;
  unallocated: number;
  classes: number;
  highestInfluence: Allocation | null;
};

export const computeTokenAllocationStats = (
  allocations: Allocations | undefined,
  balance: number | undefined,
  token: AllocatableToken
): TokenAllocationStats => {
  const allocationsList = allocations || [];
  const tokenBalance = balance || 0;

  const tokenAllocations = allocationsList.filter(
    (a) => a.token.name === token
  );

  const allocated = tokenAllocations.reduce((sum, a) => sum + a.amount, 0);
  const unallocated = Math.max(0, tokenBalance - allocated);
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
  };
};

export const computeMaxAllocationForPosition = (params: {
  balance: number;
  totalAllocated: number;
  currentAllocationAmount: number;
}) => {
  const { balance, totalAllocated, currentAllocationAmount } = params;
  return Math.max(0, balance - (totalAllocated - currentAllocationAmount));
};
