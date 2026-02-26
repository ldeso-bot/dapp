'use client';

import { useHoldingsData } from '@/features/MyActivities/hooks/useHoldingsData';
import Card from '@/shared/components/Card/Card';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { tokens } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useFormattedTimestamp } from '@/shared/hooks/useLiveTimestamp';
import { cn } from '@/shared/utils/component.utils';
import {
  formatPriceUSDWithCommas,
  formatTimestamp,
} from '@/shared/utils/string.utils';
import { useMemo } from 'react';
import { isNonNullish } from 'remeda';
import { useTabNavigation } from '../../hooks/useTabNavigation';
import { StatusCardBadge } from '../StatusCards/StatusCards';
import {
  LOCK_EARNING_STATUS_MAP,
  PORTFOLIO_EARNING_STATUS_MAP,
} from './PortfolioSnapshot.utils';

type PortfolioSnapshotProps = {
  className?: string;
};

export const PortfolioSnapshot = ({ className }: PortfolioSnapshotProps) => {
  const liveTimestamp = useFormattedTimestamp();

  const { data: holdingsData } = useHoldingsData();
  const { data: walletData } = useWalletData();
  const locks = walletData?.locks;

  const unClaimedLocks = locks?.filter((lock) => lock.status !== 'claimed');
  const nbUnClaimedLocks = unClaimedLocks?.length;
  const nbEarningLocks = unClaimedLocks?.filter(
    (lock) => lock.earningStatus === 'earning'
  ).length;

  const status =
    nbUnClaimedLocks == 0
      ? 'no-positions'
      : nbEarningLocks == 0
        ? 'not-earning'
        : nbEarningLocks == nbUnClaimedLocks
          ? 'all-earning'
          : 'some-paused';

  const statusInfo = PORTFOLIO_EARNING_STATUS_MAP[status];

  const hasExceptions = status !== 'all-earning' && status !== 'no-positions';
  const shouldShowBadge = status !== 'no-positions';

  const { navigateToTab } = useTabNavigation();

  const heartbeat = useMemo(() => {
    return (
      unClaimedLocks
        ?.filter((lock) => lock.earningStatus === 'paused')
        .map((lock) => {
          const tokenInfo = tokens[lock.token];
          if (!tokenInfo) return null;
          return {
            tokenInfo,
            lock,
            ...LOCK_EARNING_STATUS_MAP[lock.earningStatus],
            nextUpdate: formatTimestamp(lock.lockedUntil * 1000),
            linkLabel: 'See rates',
          };
        })
        .filter(isNonNullish) ?? []
    );
  }, [unClaimedLocks]);

  return (
    <Card
      skeletonClassName="h-[63.8rem]"
      className={cn('rounded-lg border-gray-300 !shadow-none', className)}
    >
      {holdingsData && (
        <>
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3 md:mb-2">
              <div className="flex items-center gap-2">
                <div className="text-size-18 font-medium">Holdings</div>

                <Tooltip
                  className="max-w-[35rem] text-size-12 p-3"
                  content={
                    <div className="flex flex-col gap-4">
                      <div className="text-white-70">
                        USD equivalent estimated value of your current holdings.
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-2">
                          <div>
                            <div className="font-semibold">Active</div>
                            <div className="text-white-60 text-size-11">
                              Portion of your assets allocated to activities in
                              Klima Protocol.
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="flex flex-col gap-2">
                            <div className="font-semibold">
                              Status Indicator
                            </div>

                            <div className="flex flex-col gap-2 text-white-60 text-size-11">
                              <div className="flex items-start gap-2">
                                <div className="w-2 aspect-square rounded-full bg-green-400 mt-[5px] shrink-0" />{' '}
                                <div>
                                  <span className="text-white-80 font-medium">
                                    All active: all your positions are active
                                    and eligible for incentives.
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-start gap-2">
                                <div className="w-2 aspect-square rounded-full bg-yellow-400 mt-[5px] shrink-0" />{' '}
                                <div>
                                  <span className="text-white-80 font-medium">
                                    Some active: one or more positions are not
                                    active.
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-start gap-2">
                                <div className="w-2 aspect-square rounded-full bg-gray-400 mt-[5px] shrink-0" />{' '}
                                <div>
                                  <span className="text-white-80 font-medium">
                                    Not active: no positions active.
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-start gap-2">
                                <div className="w-2 aspect-square rounded-full bg-gray-500 mt-[5px] shrink-0" />{' '}
                                <div>
                                  <span className="text-white-80 font-medium">
                                    No positions: no positions found.
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
            </div>
            {/* Mobile layout */}
            <div className="lg:hidden space-y-2">
              <div className="text-[4rem] leading-[5.5rem] tabular-nums">
                ~{formatPriceUSDWithCommas(holdingsData.portfolioValue)}
              </div>
              <div className="text-size-12 text-gray-500">
                As of {liveTimestamp}
              </div>
              <div className="pt-3 border-t flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-size-12 font-medium text-gray-500 uppercase tracking-wide">
                    Active
                  </span>
                  <span className="text-size-14 font-medium tabular-nums">
                    {formatPriceUSDWithCommas(holdingsData.lockedValue)}
                  </span>
                </div>
                {shouldShowBadge && (
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusCardBadge variant={statusInfo.statusColor} />
                    <span
                      className={`text-size-14 whitespace-nowrap ${
                        statusInfo.statusColor === 'yellow'
                          ? 'text-yellow-700'
                          : statusInfo.statusColor === 'gray'
                            ? 'text-void-60'
                            : ''
                      }`}
                    >
                      {statusInfo.statusLabel}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* Desktop layout */}
            <div className="hidden lg:flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
              <div className="flex-shrink-0">
                <div className="text-[4rem] leading-[5.5rem] tabular-nums mb-1">
                  ~{formatPriceUSDWithCommas(holdingsData.portfolioValue)}
                </div>
                <div className="text-size-12 text-gray-500">
                  As of {liveTimestamp}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:flex lg:flex-row lg:items-center lg:gap-6">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-size-12 font-medium text-gray-500 uppercase tracking-wide">
                      Active
                    </span>
                  </div>
                  <div className="text-[2.4rem] leading-[2.8rem] font-medium tabular-nums">
                    {formatPriceUSDWithCommas(holdingsData.lockedValue)}
                  </div>
                </div>
                {shouldShowBadge && (
                  <div className="relative -top-[4px]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-size-12 font-medium text-gray-500 uppercase tracking-wide">
                        Status
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <StatusCardBadge variant={statusInfo.statusColor} />
                      <span
                        className={`text-size-14 ${
                          statusInfo.statusColor === 'yellow'
                            ? 'text-yellow-700'
                            : statusInfo.statusColor === 'gray'
                              ? 'text-void-60'
                              : ''
                        }`}
                      >
                        {statusInfo.statusLabel}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {heartbeat.length > 0 && hasExceptions && (
              <div className="mt-4 pt-4 border-t space-y-2">
                {heartbeat.map((row) => (
                  <div
                    key={row.tokenInfo.id}
                    className="flex items-center gap-2"
                  >
                    <StatusCardBadge variant={row.statusColor} />
                    <span className="text-gray-900 font-medium">
                      {row.tokenInfo.lockDescription}:
                    </span>
                    <span className="px-2 py-0.5 font-medium bg-yellow-50 text-yellow-700 border border-yellow-200 rounded">
                      {row.statusLabel}
                    </span>
                    {row.nextUpdate && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">{row.nextUpdate}</span>
                      </>
                    )}
                    <span className="text-gray-400">•</span>
                    <span
                      className="h-auto p-0 text-12 font-normal cursor-pointer"
                      onClick={() => navigateToTab(row.tokenInfo.activitiesTab)}
                    >
                      {row.linkLabel}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </Card>
  );
};
