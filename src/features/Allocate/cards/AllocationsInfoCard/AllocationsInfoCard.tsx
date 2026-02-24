'use client';

import { useAllocationData } from '@/features/Allocate/hooks/useAllocationData';
import Card from '@/shared/components/Card/Card';
import { Divider } from '@/shared/components/Divider/Divider';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { formatAmountWithCommas } from '@/shared/utils/string.utils';
import { AllocatedTokenDisplay } from '../../shared/AllocatedTokenDisplay';
import { AllocationMetric } from '../../shared/AllocationMetric';
import { UnallocatedTokenDisplay } from '../../shared/UnallocatedTokenDisplay';

export const AllocationsInfoCard = () => {
  const { data: stats } = useAllocationData();
  return (
    <Card skeletonClassName="h-[11rem]">
      {stats && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-around gap-3">
            <div className="flex flex-col gap-2">
              <div className="text-[2.8rem] font-bold tabular-nums">
                {formatAmountWithCommas(stats?.totalAllocated || 0, 2)}
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-size-12 text-gray-500">
                  Total allocated
                </span>
                <Tooltip
                  iconSize={1.4}
                  content="Total amount of your locked kVCM and deposited K2 currently allocated to carbon classes. Unallocated tokens remain in your position but don't influence protocol decisions."
                />
              </div>
            </div>
            <Divider />
            <UnallocatedTokenDisplay
              amount={stats?.kvcm.unallocated || 0}
              usdValue={stats?.kvcm.unallocatedUSD || 0}
              tokenSymbol="kVCM"
              label="Unallocated kVCM"
            />
            <Divider />
            <UnallocatedTokenDisplay
              amount={stats?.k2.unallocated || 0}
              usdValue={stats?.k2.unallocatedUSD || 0}
              tokenSymbol="K2"
              label="Unallocated K2"
            />
            <Divider />
            <AllocationMetric
              title="Pricing on"
              value={stats?.kvcm.classes ?? 0}
            />
            <Divider />
            <AllocationMetric
              title="K2 allocated"
              value={stats?.k2.classes ?? 0}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <AllocatedTokenDisplay
              tokenName="kVCM"
              allocatedPercent={stats?.kvcm.allocatedPercent || 0}
              highestInfluence={stats?.kvcm.highestInfluence}
            />
            <AllocatedTokenDisplay
              tokenName="K2"
              allocatedPercent={stats?.k2.allocatedPercent || 0}
              highestInfluence={stats?.k2.highestInfluence}
            />
          </div>
        </div>
      )}
    </Card>
  );
};
