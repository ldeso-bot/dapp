'use client';

import { usePositionsSummary } from '@/features/MyHoldings/hooks/usePositionsSummary';
import { PositionStatusCard } from '@/features/MyHoldings/shared/PositionStatusCard';
import Card, { CardProps } from '@/shared/components/Card/Card';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { cn } from '@/shared/utils/component.utils';
import { formatAmountWithCommas } from '@/shared/utils/string.utils';
import {
  createK2ActionBadges,
  createKvcmActionBadges,
  createLiquidityActionBadges,
} from './positionBadges.utils';

export const PositionsCard = (props: CardProps) => {
  const { totalActions, holdingsData } = usePositionsSummary();
  return (
    <Card
      {...props}
      skeletonClassName="h-[63.8rem]"
      className={cn('rounded-lg border-gray-300 !shadow-none', props.className)}
    >
      <div>
        <div className="flex gap-2 items-center pb-1">
          <div className="text-size-18 font-medium">Activity</div>
          <Tooltip
            className="max-w-[35rem] text-size-12 p-3"
            content="Summary of protocol-related token balances and allocations. These do not represent ownership of protocol-held carbon assets."
          />
        </div>
        <p className="text-size-14 text-gray-500">
          You have {totalActions} {totalActions === 1 ? 'action' : 'actions'}
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
                actionBadges={createKvcmActionBadges(holdingsData)}
              />
              <PositionStatusCard
                title="Liquidity"
                totalValue={holdingsData.liquidityLockedValue}
                units={`Across ${holdingsData.nbPoolsWithLocks} pools`}
                actionBadges={createLiquidityActionBadges(holdingsData)}
              />
              <PositionStatusCard
                title="K2 Locks"
                totalValue={holdingsData.k2.lockedValue}
                units={
                  <>{formatAmountWithCommas(holdingsData.k2.lockedAmount)} K2</>
                }
                actionBadges={createK2ActionBadges(holdingsData)}
              />
            </>
          )}
        </div>
      </div>
    </Card>
  );
};
