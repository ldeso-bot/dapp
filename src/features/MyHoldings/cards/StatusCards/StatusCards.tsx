'use client';

import Card from '@/shared/components/Card/Card';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { cn } from '@/shared/utils/component.utils';
import { type FC, ReactNode } from 'react';

type BadgeVariant = 'green' | 'yellow' | 'gray' | 'blue';

type StatusCardTitleProps = {
  tooltip?: string;
  badge?: BadgeVariant;
  children: React.ReactNode;
};

export const StatusCard: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  return (
    <Card className="p-4 rounded-lg bg-gray-50 border border-gray-300">
      <div className="flex flex-col gap-2">{children}</div>
    </Card>
  );
};

export const StatusCardBadge: FC<{ variant: BadgeVariant }> = (props) => {
  const { variant } = props;
  return (
    <span
      className={cn('w-2.5 h-2.5 rounded-full', {
        'bg-blue-500 text-white': variant === 'blue',
        'bg-green-500 text-white': variant === 'green',
        'bg-yellow-500 text-white': variant === 'yellow',
        'bg-gray-500 text-white': variant === 'gray',
      })}
    />
  );
};

export const StatusCardTitle: FC<StatusCardTitleProps> = (props) => {
  const { badge, children, tooltip } = props;
  return (
    <div className="flex items-center gap-2 mb-3">
      {badge && <StatusCardBadge variant={badge} />}
      <div className="flex items-center gap-2 w-full text-size-12 font-medium text-gray-600 uppercase tracking-wide">
        {children}
        {tooltip && (
          <Tooltip
            content={tooltip}
            className="max-w-[30rem] text-size-12 p-3"
          />
        )}
      </div>
    </div>
  );
};
