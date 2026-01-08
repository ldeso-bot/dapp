import { Allocation } from '@/shared/models/walletData';
import { computeTokenAllocationStats } from '@/shared/utils/allocation.utils';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useProtocolData } from '../../../shared/hooks/api/useProtocolData';
import { useWalletData } from '../../../shared/hooks/api/useWalletData';

type AllocationData = {
  totalAllocated: number;
  kvcm: {
    allocations: Allocation[];
    allocated: number;
    unallocated: number;
    unallocatedUSD: number;
    classes: number;
    allocatedPercent: number;
    highestInfluence: {
      category: string;
      sharePercent: number;
    } | null;
  };
  k2: {
    allocations: Allocation[];
    allocated: number;
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

      const allocations = walletData.allocations || [];
      const balances = walletData.balances || { kvcm: 0, k2: 0 };

      const totalAllocated = allocations.reduce(
        (sum, alloc) => sum + alloc.amount,
        0
      );

      const kvcmPrice = protocolData.metrics.kvcm.valueUSD || 0;
      const k2Price = protocolData.metrics.k2.valueUSD || 0;

      const kvcmStats = computeTokenAllocationStats(
        walletData.allocations,
        balances.kvcm,
        'kvcm'
      );
      const k2Stats = computeTokenAllocationStats(
        walletData.allocations,
        balances.k2,
        'k2'
      );

      const unallocatedKvcmUSD = kvcmStats.unallocated * kvcmPrice;
      const unallocatedK2USD = k2Stats.unallocated * k2Price;
      const kvcmAllocatedPercent =
        balances.kvcm > 0 ? kvcmStats.allocated / balances.kvcm : 0;
      const k2AllocatedPercent =
        balances.k2 > 0 ? k2Stats.allocated / balances.k2 : 0;

      return {
        totalAllocated,
        kvcm: {
          allocations: kvcmStats.allocations,
          allocated: kvcmStats.allocated,
          unallocated: kvcmStats.unallocated,
          unallocatedUSD: unallocatedKvcmUSD,
          classes: kvcmStats.classes,
          allocatedPercent: kvcmAllocatedPercent,
          highestInfluence: kvcmStats.highestInfluence
            ? {
                category: kvcmStats.highestInfluence.category,
                sharePercent: kvcmStats.highestInfluence.sharePercent,
              }
            : null,
        },
        k2: {
          allocations: k2Stats.allocations,
          allocated: k2Stats.allocated,
          unallocated: k2Stats.unallocated,
          unallocatedUSD: unallocatedK2USD,
          classes: k2Stats.classes,
          allocatedPercent: k2AllocatedPercent,
          highestInfluence: k2Stats.highestInfluence
            ? {
                category: k2Stats.highestInfluence.category,
                sharePercent: k2Stats.highestInfluence.sharePercent,
              }
            : null,
        },
      };
    },
  });
};
