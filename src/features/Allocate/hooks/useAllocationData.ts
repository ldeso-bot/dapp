import { Allocation, Lock } from '@/shared/models/walletData';
import { computeTokenAllocationStats } from '@/shared/utils/allocation.utils';
import { calculateAvailableKvcmPerLock } from '@/shared/utils/allocationLock.utils';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useProtocolData } from '../../../shared/hooks/api/useProtocolData';
import { useWalletData } from '../../../shared/hooks/api/useWalletData';

type AllocationData = {
  totalAllocated: number;
  kvcm: {
    allocations: Allocation[];
    allocated: number;
    locks: Lock[];
    locked: number;
    unallocated: number;
    unallocatedUSD: number;
    classes: number;
    allocatedPercent: number;
    availableKvcm: Map<number, number>;
    highestInfluence: {
      category: string;
      sharePercent: number;
    } | null;
  };
  k2: {
    allocations: Allocation[];
    allocated: number;
    locked: number;
    unallocated: number;
    unallocatedUSD: number;
    classes: number;
    allocatedPercent: number;
    highestInfluence: {
      category: string;
      sharePercent: number;
    } | null;
  };
};

export const useAllocationData = (): UseQueryResult<
  AllocationData | null,
  Error
> => {
  const { data: walletData } = useWalletData();
  const { data: protocolData } = useProtocolData();

  return useQuery({
    queryKey: ['allocationData', walletData, protocolData],
    queryFn: () => {
      if (!walletData || !protocolData) {
        return null;
      }

      const locks = walletData.locks || [];
      const allocations = walletData.allocations || [];
      const totalAllocated = allocations.reduce(
        (sum, alloc) => sum + alloc.amount,
        0
      );

      const kvcmPrice = protocolData.metrics.kvcm.valueUSD || 0;
      const k2Price = protocolData.metrics.k2.valueUSD || 0;

      const kvcmLocks = locks.filter((lock) => lock.token === 'kvcm');
      const totalKvcm = kvcmLocks.reduce((sum, lock) => sum + lock.lockedAmount, 0);
      const kvcmAllocations = allocations.filter(
        (alloc) => alloc.token.name === 'kvcm'
      );

      const totalK2 = locks
        .filter((lock) => lock.token === 'k2')
        .reduce((sum, lock) => sum + lock.lockedAmount, 0);

      const availableKvcm = calculateAvailableKvcmPerLock(
        kvcmLocks,
        kvcmAllocations
      );

      const kvcmStats = computeTokenAllocationStats(
        walletData.allocations,
        totalKvcm,
        'kvcm'
      );
 
      const k2Stats = computeTokenAllocationStats(
        walletData.allocations,
        totalK2,
        'k2'
      );

      const unallocatedKvcmUSD = kvcmStats.unallocated * kvcmPrice;
      const unallocatedK2USD = k2Stats.unallocated * k2Price;
      const kvcmAllocatedPercent =
        totalKvcm > 0 ? kvcmStats.allocated / totalKvcm : 0;
      const k2AllocatedPercent = totalK2 > 0 ? k2Stats.allocated / totalK2 : 0;

      return {
        totalAllocated,
        kvcm: {
          availableKvcm,
          allocations: kvcmStats.allocations,
          allocated: kvcmStats.allocated,
          locks: kvcmLocks,
          locked: totalKvcm,
          unallocated: kvcmStats.unallocated,
          unallocatedUSD: unallocatedKvcmUSD,
          classes: kvcmStats.classes,
          allocatedPercent: kvcmAllocatedPercent,
          highestInfluence:
            kvcmStats.highestInfluence &&
            kvcmStats.highestInfluence.category &&
            kvcmStats.highestInfluence.sharePercent > 0
              ? {
                  category: kvcmStats.highestInfluence.category,
                  sharePercent: kvcmStats.highestInfluence.sharePercent,
                }
              : null,
        },
        k2: {
          allocations: k2Stats.allocations,
          allocated: k2Stats.allocated,
          locked: totalK2,
          unallocated: k2Stats.unallocated,
          unallocatedUSD: unallocatedK2USD,
          classes: k2Stats.classes,
          allocatedPercent: k2AllocatedPercent,
          highestInfluence:
            k2Stats.highestInfluence &&
            k2Stats.highestInfluence.category &&
            k2Stats.highestInfluence.sharePercent > 0
              ? {
                  category: k2Stats.highestInfluence.category,
                  sharePercent: k2Stats.highestInfluence.sharePercent,
                }
              : null,
        },
      };
    },
    refetchOnMount: true,
    staleTime: 0,
  });
};
