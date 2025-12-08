'use client';

import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { formatAmountWithCommas } from '@/shared/utils/string.utils';
import { useMemo } from 'react';
import { AllocatedTokenDisplay } from '../../shared/AllocatedTokenDisplay';
import { UnallocatedTokenDisplay } from '../../shared/UnallocatedTokenDisplay';

export const AllocationsInfoCard = () => {
  const { data: walletData } = useWalletData();

  const stats = useMemo(() => {
    if (!walletData) {
      return null;
    }

    const allocations = walletData.allocations || [];
    const balances = walletData.balances || { kvcm: 0, k2: 0 };

    const totalAllocated = allocations.reduce(
      (sum, alloc) => sum + alloc.amount,
      0
    );

    const kvcmPrice = 0; // protocolData.metrics.kvcm.valueUSD || 0;
    const k2Price = 0; // protocolData.metrics.k2.valueUSD || 0;

    const kvcmAllocations = allocations.filter((a) => a.token.name === 'kvcm');
    const kvcmAllocated = kvcmAllocations.reduce((sum, a) => sum + a.amount, 0);
    const unallocatedKvcm = balances.kvcm - kvcmAllocated;
    const unallocatedKvcmUSD = unallocatedKvcm * kvcmPrice;
    const kvcmClasses = new Set(kvcmAllocations.map((a) => a.carbonClass)).size;
    const kvcmAllocatedPercent =
      balances.kvcm > 0 ? kvcmAllocated / balances.kvcm : 0;
    const highestKvcmInfluence = kvcmAllocations.reduce(
      (max, alloc) =>
        alloc.sharePercent > (max?.sharePercent || 0) ? alloc : max,
      null as (typeof kvcmAllocations)[0] | null
    );

    const k2Allocations = allocations.filter((a) => a.token.name === 'k2');
    const k2Allocated = k2Allocations.reduce((sum, a) => sum + a.amount, 0);
    const unallocatedK2 = balances.k2 - k2Allocated;
    const unallocatedK2USD = unallocatedK2 * k2Price;
    const k2Classes = new Set(k2Allocations.map((a) => a.carbonClass)).size;
    const k2AllocatedPercent = balances.k2 > 0 ? k2Allocated / balances.k2 : 0;
    const highestK2Influence = k2Allocations.reduce(
      (max, alloc) =>
        alloc.sharePercent > (max?.sharePercent || 0) ? alloc : max,
      null as (typeof k2Allocations)[0] | null
    );

    return {
      totalAllocated,
      unallocatedKvcm,
      unallocatedKvcmUSD,
      unallocatedK2,
      unallocatedK2USD,
      kvcmClasses,
      k2Classes,
      kvcmAllocatedPercent,
      k2AllocatedPercent,
      highestKvcmInfluence,
      highestK2Influence,
    };
  }, [walletData]);

  return (
    <div className="text-card-foreground flex flex-col gap-6 rounded-xl p-5 py-8 bg-white border border-gray-300">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-around gap-3">
          <div className="flex flex-col gap-1">
            <div className="text-[2.4rem] font-bold tabular-nums">
              {formatAmountWithCommas(stats?.totalAllocated || 0, 2)}
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-size-12 text-gray-500">
                Total allocated
              </span>
              <Tooltip content="Total amount of tokens allocated across all carbon classes" />
            </div>
          </div>

          <div className="h-8 w-px bg-gray-200" />

          <UnallocatedTokenDisplay
            amount={stats?.unallocatedKvcm || 0}
            usdValue={stats?.unallocatedKvcmUSD || 0}
            tokenSymbol="kVCM"
            label="Unallocated kVCM"
          />

          <div className="h-8 w-px bg-gray-200" />

          <UnallocatedTokenDisplay
            amount={stats?.unallocatedK2 || 0}
            usdValue={stats?.unallocatedK2USD || 0}
            tokenSymbol="K2"
            label="Unallocated K2"
          />

          <div className="h-8 w-px bg-gray-200" />

          <div className="text-center">
            <div className="text-size-14 font-bold text-gray-900">
              Pricing on
            </div>
            <div className="text-size-12 text-gray-500">
              {stats?.kvcmClasses}{' '}
              {stats?.kvcmClasses === 1 ? 'class' : 'classes'}
            </div>
          </div>

          <div className="h-8 w-px bg-gray-200" />

          <div className="text-center">
            <div className="text-size-14 font-bold text-gray-900">
              K2 allocated
            </div>
            <div className="text-size-12 text-gray-500">
              {stats?.k2Classes} {stats?.k2Classes === 1 ? 'class' : 'classes'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <AllocatedTokenDisplay
            tokenName="kVCM"
            allocatedPercent={stats?.kvcmAllocatedPercent || 0}
            highestInfluence={stats?.highestKvcmInfluence}
          />
          <AllocatedTokenDisplay
            tokenName="K2"
            allocatedPercent={stats?.k2AllocatedPercent || 0}
            highestInfluence={stats?.highestK2Influence}
          />
        </div>
      </div>
    </div>
  );
};
