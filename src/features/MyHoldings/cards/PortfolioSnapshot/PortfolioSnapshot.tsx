'use client';

import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { useLiveTimestamp } from '@/shared/hooks/useLiveTimestamp';
import { cn } from '@/shared/utils/component.utils';
import { formatPriceUSDWithCommas } from '@/shared/utils/string.utils';
import { StatusCardBadge } from '../StatusCards/StatusCards';

// @todo - update these when wiring up data (pulled from v0 design)
type EarningStatus = {
  status: 'all-earning' | 'some-paused' | 'not-earning' | 'no-positions';
  statusLabel: string;
  statusColor: 'green' | 'yellow' | 'gray';
  tooltip: string;
  details?: {
    kvcm?: { earning: boolean; reason?: string };
    k2?: { earning: boolean; reason?: string };
    lp?: { earning: boolean; reason?: string };
  };
};

// @todo - update these when wiring up data (pulled from v0 design)
type RewardsHeartbeatRow = {
  source: 'kvcm' | 'k2' | 'lp';
  sourceLabel: string; // e.g., "kVCM locks", "K2 lock", "LP stakes"
  status: 'earning' | 'paused';
  statusLabel: string; // e.g., "earning", "temporarily paused"
  nextUpdate?: string; // e.g., "Oct 22, 2025" (only for kVCM)
  linkLabel: string; // e.g., "See rates", "See breakdown"
  targetTab: 'kvcm' | 'k2' | 'liquidity';
  pausedTooltip?: string; // Tooltip for paused status
};

type AllocationSegment = {
  type: string;
  label: string;
  value: number;
  percentage: number;
  color: string;
};

type PortfolioSnapshotProps = {
  totalValue: number;
  netDeployedValue: number;
  allocations: AllocationSegment[];
  statusCounts: {
    earning: number;
    actionsAvailable: number;
    lockedValueUsd: number;
  };
  heartbeat: RewardsHeartbeatRow[];
  earningStatus?: EarningStatus;
  className?: string;
  onAllocationClick?: (type: string) => void;
  onHeartbeatNavigate?: (tab: string) => void;
};

export const PortfolioSnapshot = ({
  totalValue,
  netDeployedValue,
  heartbeat,
  earningStatus,
  onHeartbeatNavigate,
  className,
}: PortfolioSnapshotProps) => {
  const liveTimestamp = useLiveTimestamp();

  const status: EarningStatus = earningStatus || {
    status: heartbeat.every((row) => row.status === 'earning')
      ? 'all-earning'
      : 'some-paused',
    statusLabel: heartbeat.every((row) => row.status === 'earning')
      ? 'All earning'
      : 'Some paused',
    statusColor: heartbeat.every((row) => row.status === 'earning')
      ? 'green'
      : 'yellow',
    tooltip: heartbeat.every((row) => row.status === 'earning')
      ? 'All your positions are actively earning rewards.'
      : 'One or more positions not accruing (matured, unlocked, or schedule paused).',
  };

  const hasExceptions =
    status.status !== 'all-earning' && status.status !== 'no-positions';
  const shouldShowBadge = status.status !== 'no-positions';

  return (
    <Card
      skeletonClassName="h-[63.8rem]"
      className={cn('rounded-lg border-gray-300 !shadow-none', className)}
    >
      <div>
        <div className="flex items-center gap-2 mb-2 sm:mb-3 md:mb-2">
          <div className="flex items-center gap-2">
            {/* <WalletCards className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" /> */}
            <div className="text-size-18 font-medium">Portfolio Snapshot</div>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
          <div className="flex-shrink-0">
            <div className="text-[5rem] leading-[5.5rem] font-bold tabular-nums mb-1">
              {formatPriceUSDWithCommas(totalValue)}
            </div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-size-14 text-gray-500">
                Estimated value
              </span>
              <Tooltip
                className="max-w-[35rem] text-size-12 p-3"
                content="Total portfolio value including all accrued rewards (claimable + accruing). This is your complete position value."
              />
            </div>
            <div className="text-size-12 text-gray-500">
              As of {liveTimestamp}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:flex lg:flex-row lg:items-start lg:gap-6 lg:pt-2">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-size-12 font-medium text-gray-500 uppercase tracking-wide">
                  Net deployed
                </span>
                <Tooltip
                  className="max-w-[30rem] text-size-12 p-3"
                  content="Principal deployed across all positions, excluding claimable amounts."
                />
              </div>
              <div className="text-[2.4rem] leading-[2.8rem] font-bold tabular-nums">
                {formatPriceUSDWithCommas(netDeployedValue)}
              </div>
            </div>
            {shouldShowBadge && (
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-size-12 font-medium text-gray-500 uppercase tracking-wide">
                    Status
                  </span>
                  <Tooltip
                    className="max-w-[35rem] text-size-12 p-3"
                    content={status.tooltip}
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <StatusCardBadge
                    variant={
                      status.status === 'all-earning' ? 'green' : 'yellow'
                    }
                  />
                  <span
                    className={`text-size-14 ${
                      status.statusColor === 'yellow'
                        ? 'text-yellow-700'
                        : status.statusColor === 'gray'
                          ? 'text-void-60'
                          : ''
                    }`}
                  >
                    {status.statusLabel}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        {heartbeat.length > 0 && hasExceptions && (
          <div className="mt-4 pt-4 border-t space-y-2">
            {heartbeat
              .filter((row) => row.status === 'paused')
              .map((row) => (
                <div
                  key={row.source}
                  className="flex items-center gap-2 text-sm"
                >
                  <StatusCardBadge
                    variant={row.status === 'earning' ? 'green' : 'yellow'}
                  />
                  <span className="text-gray-900 font-medium">
                    {row.sourceLabel}:
                  </span>
                  <Tooltip content={row.pausedTooltip || 'Paused'} />
                  <span className="px-2 py-0.5 text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200 rounded">
                    Paused
                  </span>
                  {row.nextUpdate && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">
                        {/* {copy.heartbeat.nextUpdate(row.nextUpdate)} */}
                      </span>
                    </>
                  )}
                  <span className="text-gray-400">•</span>
                  <Button
                    className="h-auto p-0 text-sm font-normal"
                    onClick={() => onHeartbeatNavigate?.(row.targetTab)}
                  >
                    {row.linkLabel}
                  </Button>
                </div>
              ))}
          </div>
        )}
      </div>
    </Card>
  );
};
