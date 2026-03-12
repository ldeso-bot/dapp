'use client';

import { cn } from '@/shared/utils/component.utils';
import { formatPriceUSDWithCommas } from '@/shared/utils/string.utils';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import { StatusCard, StatusCardTitle } from '../cards/StatusCards/StatusCards';

export interface ActionBadge {
  text: string;
  href: string;
  variant: 'green' | 'blue';
}

type Props = {
  title: ReactNode;
  totalValue: number;
  units: ReactNode;
  actionBadges: ActionBadge[];
};

export const PositionStatusCard: FC<Props> = (props) => {
  const { title, totalValue, units, actionBadges } = props;
  return (
    <StatusCard skeletonClassName="h-[20rem]">
      <>
        <StatusCardTitle>{title}</StatusCardTitle>
        <div className="flex flex-col gap-5">
          <div className="space-y-1">
            <div className="text-size-12 text-text-3">Units</div>
            <div className="text-[2.2rem] font-bold text-text-1 tabular-nums">
              {units}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-size-12 text-text-3">
              Estimated value in USD
            </div>
            <div className="text-size-14 text-text-1 tabular-nums">
              {formatPriceUSDWithCommas(totalValue)}
            </div>
          </div>

          {actionBadges.length > 0 && (
            <div className="space-y-1">
              <div className="text-size-12 text-text-3">Actions</div>
              <div className="flex flex-wrap gap-2">
                {actionBadges.map((badge, index) => (
                  <Link key={index} href={badge.href}>
                    <div
                      className={cn(
                        'inline-flex px-2 py-0.5 rounded-full border text-size-12',
                        badge.variant === 'green' &&
                          'bg-actionbutton-bg border-border-strong text-text-static-dark',
                        badge.variant === 'blue' &&
                          'bg-blue-100 border-blue-200 text-blue-700'
                      )}
                    >
                      {badge.text}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </>
    </StatusCard>
  );
};
