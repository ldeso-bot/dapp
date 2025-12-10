'use client';

import { useHoldingsData } from '@/features/MyHoldings/hooks/useHoldingsData';
import Card, { CardProps } from '@/shared/components/Card/Card';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { cn } from '@/shared/utils/component.utils';
import { formatPriceUSDWithCommas } from '@/shared/utils/string.utils';
import { useTabNavigation } from '../../hooks/useTabNavigation';

export const PortfolioDistributionCard = (props: CardProps) => {
  const { navigateToTab } = useTabNavigation();

  const holdingsData = useHoldingsData();
  const formattedData = holdingsData
    ? {
        segments: [
          {
            type: 'kvcm',
            label: 'kVCM Locks',
            value: holdingsData.kvcm.lockedValue,
            percentage:
              (holdingsData.kvcm.lockedValue / holdingsData.portfolioValue) *
              100,
            color: 'bg-[#00a329]',
          },
          {
            type: 'k2',
            label: 'K2 Position',
            value: holdingsData.k2.lockedValue,
            percentage:
              (holdingsData.k2.lockedValue / holdingsData.portfolioValue) * 100,
            color: 'bg-gray-600',
          },
          {
            type: 'liquidity',
            label: 'Liquidity',
            value: holdingsData.liquidityLockedValue,
            percentage:
              (holdingsData.liquidityLockedValue /
                holdingsData.portfolioValue) *
              100,
            color: 'bg-gray-400',
          },
          {
            type: 'claimables',
            label: 'Claimables',
            value: holdingsData.claimableValue,
            percentage:
              (holdingsData.claimableValue / holdingsData.portfolioValue) * 100,
            color: 'bg-green-500',
          },
        ],
        totalValue: holdingsData.portfolioValue,
      }
    : null;

  return (
    <Card
      {...props}
      skeletonClassName="h-[18.4rem]"
      className={cn('rounded-lg border-gray-300 !shadow-none', props.className)}
    >
      {holdingsData && (
        <>
          <div className="flex flex-col pb-1">
            <div className="flex gap-2 items-center pb-1">
              <div className="text-size-18 font-medium">
                Portfolio Distribution
              </div>
              <Tooltip
                className="max-w-[35rem] text-size-12 p-3"
                content="Share of your portfolio by position type (deployed positions + claimable amounts). Does not include idle tokens on external DEXs unless staked in the protocol."
              />
            </div>
            {formattedData && (
              <>
                <div className="my-3">
                  <div className="flex h-4 sm:h-6 md:h-8 rounded-lg overflow-hidden">
                    {formattedData.segments.map((segment) => (
                      <div
                        key={segment.type}
                        className={`${segment.color} transition-all duration-200 cursor-pointer hover:opacity-80 relative`}
                        style={{ width: `${segment.percentage}%` }}
                        onClick={() => navigateToTab(segment.type)}
                      />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                  {formattedData.segments.map((segment) => {
                    const isLiquidity = segment.type === 'lp';
                    const segmentLabel = isLiquidity
                      ? 'Liquidity (staked LP)'
                      : segment.label;
                    return (
                      <div
                        key={segment.type}
                        className="flex flex-col gap-1.5 sm:gap-2 cursor-pointer hover:bg-gray-50 p-2 sm:p-3 rounded-md transition-colors duration-150 border border-gray-100"
                        onClick={() => navigateToTab(segment.type)}
                      >
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <div
                            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm flex-shrink-0 ${segment.color}`}
                          />
                          <div className="text-size-14 font-medium text-gray-900 truncate flex items-center gap-1">
                            {segmentLabel}
                            {isLiquidity && (
                              <Tooltip
                                content={
                                  <>
                                    Value of LP tokens currently staked in the
                                    protocol. LP not staked appears under
                                    Balances.
                                  </>
                                }
                              />
                            )}
                          </div>
                        </div>
                        <div className="text-size-14 text-muted-foreground tabular-nums">
                          <div>{formatPriceUSDWithCommas(segment.value)}</div>
                          <div>{segment.percentage.toFixed(1)}%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </Card>
  );
};
