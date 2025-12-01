'use client';

import Card, { CardProps } from '@/shared/components/Card/Card';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { cn } from '@/shared/utils/component.utils';
import {
  formatAmountWithCommas,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';
import { StatusCard, StatusCardTitle } from '../StatusCards/StatusCards';

const mockData = {
  actions: 6,
  claimableValue: 585.95,
};

export const PositionsCard = (props: CardProps) => {
  return (
    <Card
      {...props}
      skeletonClassName="h-[63.8rem]"
      className={cn('rounded-lg border-gray-300 !shadow-none', props.className)}
    >
      <div>
        <div className="flex gap-2 items-center pb-1">
          <div className="text-size-18 font-medium">Positions</div>
          <Tooltip
            className="max-w-[35rem] text-size-12 p-3"
            content="Summary of your three position types with total values and attention items requiring action. Click any card to navigate to the detailed view for that position type."
          />
        </div>
        <p className="text-size-14 text-gray-500">
          You have {mockData.actions} actions • ${mockData.claimableValue}{' '}
          claimable value
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <StatusCard>
            <StatusCardTitle>
              <div className="w-full flex items-center justify-between gap-2">
                kVCM Locks
              </div>
            </StatusCardTitle>
            <div className="flex flex-col gap-5">
              <div className="space-y-1">
                <div className="text-size-12 text-gray-500">Total Value</div>
                <div className="text-[2.2rem] font-bold text-gray-900 tabular-nums">
                  {formatPriceUSDWithCommas(3990.75)}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-size-12 text-gray-500">Units</div>
                <div className="text-size-14 text-gray-900 tabular-nums">
                  {formatAmountWithCommas(1012.5)} kVCM
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-size-12 text-gray-500">Actions</div>
                <div className="flex flex-wrap gap-2">
                  <div className="inline-flex px-2 py-0.5 rounded-full bg-green-100 border border-green-200 text-size-12 text-green-700 font-medium">
                    Claimable now • locks (2) •{' '}
                    {formatPriceUSDWithCommas(313.0)}
                  </div>
                  <div className="inline-flex px-2 py-0.5 rounded-full bg-blue-100 border border-blue-200 text-size-12 text-blue-700 font-medium">
                    Unlocks ≤30d • locks(1)
                  </div>
                </div>
              </div>
            </div>
          </StatusCard>
          <StatusCard>
            <StatusCardTitle>Liquidity</StatusCardTitle>
            <div className="flex flex-col gap-5">
              <div className="space-y-1">
                <div className="text-size-12 text-gray-500">Total Value</div>
                <div className="text-[2.2rem] font-bold text-gray-900 tabular-nums">
                  {formatPriceUSDWithCommas(650.5)}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-size-12 text-gray-500">Units</div>
                <div className="text-size-14 text-gray-900 tabular-nums">
                  Across 2 pools
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-size-12 text-gray-500">Actions</div>
                <div className="flex flex-wrap gap-2">
                  <div className="inline-flex px-2 py-0.5 rounded-full bg-green-100 border border-green-200 text-size-12 text-green-700 font-medium">
                    Claimable now • lots (1) • {formatPriceUSDWithCommas(62.8)}
                  </div>
                  <div className="inline-flex px-2 py-0.5 rounded-full bg-blue-100 border border-blue-200 text-size-12 text-blue-700 font-medium">
                    Unlocks ≤30d • lots(1)
                  </div>
                </div>
              </div>
            </div>
          </StatusCard>
          <StatusCard>
            <StatusCardTitle>K2 Position</StatusCardTitle>
            <div className="flex flex-col gap-5">
              <div className="space-y-1">
                <div className="text-size-12 text-gray-500">Total Value</div>
                <div className="text-[2.2rem] font-bold text-gray-900 tabular-nums">
                  {formatPriceUSDWithCommas(744.94)}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-size-12 text-gray-500">Units</div>
                <div className="text-size-14 text-gray-900 tabular-nums">
                  {formatAmountWithCommas(190.32)} K2
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-size-12 text-gray-500">Actions</div>
                <div className="flex flex-wrap gap-2">
                  <div className="inline-flex px-2 py-0.5 rounded-full bg-green-100 border border-green-200 text-size-12 text-green-700 font-medium">
                    Claimable now • deposits (1) •{' '}
                    {formatPriceUSDWithCommas(211)}
                  </div>
                </div>
              </div>
            </div>
          </StatusCard>
        </div>
      </div>
    </Card>
  );
};
