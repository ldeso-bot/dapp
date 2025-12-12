'use client';

import { useHoldingsData } from '@/features/MyHoldings/hooks/useHoldingsData';
import Card, { CardProps } from '@/shared/components/Card/Card';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { ROUTES } from '@/shared/constants/route.constants';
import { cn } from '@/shared/utils/component.utils';
import {
  formatAmountWithCommas,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { StatusCard, StatusCardTitle } from '../StatusCards/StatusCards';

const mockData = {
  actions: 6,
  claimableValue: 585.95,
};

export const PositionsCard = (props: CardProps) => {
  const { data: holdingsData } = useHoldingsData();

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
          {holdingsData && (
            <>
              <PositionStatusCard
                title={
                  <div className="w-full flex items-center justify-between gap-2">
                    kVCM Locks
                  </div>
                }
                totalValue={holdingsData.kvcm.lockedValue}
                units={
                  <>
                    {formatAmountWithCommas(holdingsData.kvcm.lockedAmount)}{' '}
                    kVCM
                  </>
                }
                actionBadges={[
                  {
                    text: `Claimable now • locks (${holdingsData.kvcm.maturedLocks.length}) • ${formatPriceUSDWithCommas(holdingsData.kvcm.claimableValue)}`,
                    variant: 'green',
                    href: `${ROUTES.MY_HOLDINGS}?activeView=kvcm`,
                  },
                  {
                    text: `Unlocks ≤30d • locks(${holdingsData.kvcm.soonToBeMaturedLocks.length})`,
                    variant: 'blue',
                    href: `${ROUTES.MY_HOLDINGS}?activeView=kvcm`,
                  },
                ]}
              />
              <PositionStatusCard
                title="Liquidity"
                totalValue={holdingsData.liquidityLockedValue}
                units={`Across ${holdingsData.nbPoolsWithLocks} pools`}
                actionBadges={[
                  {
                    text: `Claimable now • lots (${holdingsData.liquidityMaturedLocks.length}) • ${formatPriceUSDWithCommas(holdingsData.claimableValueFromLiquidity)}`,
                    variant: 'green',
                    href: `${ROUTES.MY_HOLDINGS}?activeView=liquidity`,
                  },
                  {
                    text: `Unlocks ≤30d • lots(${holdingsData.liquiditySoonToBeMaturedLocks.length})`,
                    variant: 'blue',
                    href: `${ROUTES.MY_HOLDINGS}?activeView=liquidity`,
                  },
                ]}
              />
              <PositionStatusCard
                title="K2 Position"
                totalValue={holdingsData.k2.lockedValue}
                units={
                  <>{formatAmountWithCommas(holdingsData.k2.lockedAmount)} K2</>
                }
                actionBadges={[
                  {
                    text: `Claimable now • deposits (1) • ${formatPriceUSDWithCommas(holdingsData.k2.claimableValue)}`,
                    variant: 'green',
                    href: `${ROUTES.MY_HOLDINGS}?activeView=k2`,
                  },
                ]}
              />
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

interface ActionBadge {
  text: string;
  variant: 'green' | 'blue';
  href: string;
}

interface PositionStatusCardProps {
  title: ReactNode;
  totalValue: number;
  units: ReactNode;
  actionBadges: ActionBadge[];
}

const PositionStatusCard = ({
  title,
  totalValue,
  units,
  actionBadges,
}: PositionStatusCardProps) => {
  const getBadgeClasses = (variant: 'green' | 'blue') => {
    if (variant === 'green') {
      return 'bg-green-100 border-green-200 text-green-700';
    }
    return 'bg-blue-100 border-blue-200 text-blue-700';
  };

  return (
    <StatusCard skeletonClassName="h-[20rem]">
      <>
        <StatusCardTitle>{title}</StatusCardTitle>
        <div className="flex flex-col gap-5">
          <div className="space-y-1">
            <div className="text-size-12 text-gray-500">Total Value</div>
            <div className="text-[2.2rem] font-bold text-gray-900 tabular-nums">
              {formatPriceUSDWithCommas(totalValue)}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-size-12 text-gray-500">Units</div>
            <div className="text-size-14 text-gray-900 tabular-nums">
              {units}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-size-12 text-gray-500">Actions</div>
            <div className="flex flex-wrap gap-2">
              {actionBadges.map((badge, index) => (
                <Link key={index} href={badge.href}>
                  <div
                    key={index}
                    className={`inline-flex px-2 py-0.5 rounded-full border text-size-12 font-medium ${getBadgeClasses(badge.variant)}`}
                  >
                    {badge.text}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </>
    </StatusCard>
  );
};
