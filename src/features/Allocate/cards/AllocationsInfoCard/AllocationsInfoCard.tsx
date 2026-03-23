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
            <div className="order-1 sm:order-none w-full sm:w-auto flex flex-col gap-2">
              <div className="text-[2.8rem] font-bold tabular-nums text-center sm:text-left">
                {formatAmountWithCommas(stats?.totalAllocated || 0, 2)}
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-size-12 text-text-3">
                  Total allocated [t074]
                </span>
                <Tooltip
                  iconSize={1.4}
                  content="Total amount of your locked kVCM and deposited K2 currently allocated to carbon classes. Unallocated tokens remain in your position but don't influence protocol decisions. [t075]"
                />
              </div>
            </div>
            <Divider className="hidden sm:block order-2 sm:order-none" />
            <div className="order-3 sm:order-none w-[calc(50%-0.75rem)] sm:w-auto">
              <UnallocatedTokenDisplay
                amount={stats?.kvcm.unallocated || 0}
                usdValue={stats?.kvcm.unallocatedUSD || 0}
                tokenSymbol="kVCM"
                label="Unallocated kVCM [t076]"
              />
            </div>
            <Divider className="hidden sm:block order-4 sm:order-none" />
            <div className="order-5 sm:order-none w-[calc(50%-0.75rem)] sm:w-auto">
              <UnallocatedTokenDisplay
                amount={stats?.k2.unallocated || 0}
                usdValue={stats?.k2.unallocatedUSD || 0}
                tokenSymbol="K2"
                label="Unallocated K2 [t077]"
              />
            </div>
            <Divider className="hidden sm:block order-6 sm:order-none" />
            <div className="order-7 sm:order-none w-[calc(50%-0.75rem)] sm:w-auto">
              <AllocationMetric
                title="Pricing on [t078]"
                value={stats?.kvcm.classes ?? 0}
              />
            </div>
            <Divider className="hidden sm:block order-8 sm:order-none" />
            <div className="order-9 sm:order-none w-[calc(50%-0.75rem)] sm:w-auto">
              <AllocationMetric
                title="K2 allocated [t079]"
                value={stats?.k2.classes ?? 0}
              />
            </div>
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
