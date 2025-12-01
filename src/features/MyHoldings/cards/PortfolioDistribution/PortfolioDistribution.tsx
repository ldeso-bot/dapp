'use client';

import Card, { CardProps } from '@/shared/components/Card/Card';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { cn } from '@/shared/utils/component.utils';
import { formatPriceUSDWithCommas } from '@/shared/utils/string.utils';
import { useRouter } from 'next/navigation';
import { SUPPORTED_TABS, TabValue } from '../../constants/tab.constants';

// @todo - replace with actual data
const mockData = {
  segments: [
    {
      type: 'kvcm',
      label: 'kVCM Locks',
      value: 3396.75,
      percentage: 66.4,
      color: 'bg-[#00a329]',
    },
    {
      type: 'k2',
      label: 'K2 Position',
      value: 744.96,
      percentage: 14.6,
      color: 'bg-gray-600',
    },
    {
      type: 'liquidity',
      label: 'Liquidity',
      value: 650.0,
      percentage: 12.7,
      color: 'bg-gray-400',
    },
    {
      type: 'claimables',
      label: 'Claimables',
      value: 325.0,
      percentage: 6.3,
      color: 'bg-green-500',
    },
  ],
  totalValue: 5116.71,
};

export const PortfolioDistributionCard = (props: CardProps) => {
  const router = useRouter();

  const handleSegmentClick = (type: string) => {
    if (SUPPORTED_TABS.includes(type as TabValue)) {
      router.push(`?activeView=${type}`);
    }
  };

  return (
    <Card
      {...props}
      skeletonClassName="h-[63.8rem]"
      className={cn('rounded-lg border-gray-300 !shadow-none', props.className)}
    >
      <div className="flex flex-col pb-1">
        <div className="flex gap-2 items-center pb-1">
          <div className="text-size-18 font-medium">Portfolio Distribution</div>
          <Tooltip
            className="max-w-[35rem] text-size-12 p-3"
            content="Share of your portfolio by position type (deployed positions + claimable amounts). Does not include idle tokens on external DEXs unless staked in the protocol."
          />
        </div>
        <div className="my-3">
          <div className="flex h-4 sm:h-6 md:h-8 rounded-lg overflow-hidden">
            {mockData.segments.map((segment) => (
              <div
                key={segment.type}
                className={`${segment.color} transition-all duration-200 cursor-pointer hover:opacity-80 relative`}
                style={{ width: `${segment.percentage}%` }}
                onClick={() => handleSegmentClick?.(segment.type)}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {mockData.segments.map((segment) => {
            const isLiquidity = segment.type === 'lp';
            const segmentLabel = isLiquidity
              ? 'Liquidity (staked LP)'
              : segment.label;
            return (
              <div
                key={segment.type}
                className="flex flex-col gap-1.5 sm:gap-2 cursor-pointer hover:bg-gray-50 p-2 sm:p-3 rounded-md transition-colors duration-150 border border-gray-100"
                onClick={() => handleSegmentClick?.(segment.type)}
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
                            Value of LP tokens currently staked in the protocol.
                            LP not staked appears under Balances.
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
      </div>
    </Card>
  );
};
