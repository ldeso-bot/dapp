'use client';

import Card, { CardProps } from '@/shared/components/Card/Card';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { cn } from '@/shared/utils/component.utils';
import { type FC } from 'react';

type RewardsCardProps = CardProps & {
  footNote?: string;
  description?: string;
  skeletonClassName?: string;
};

type ItemProps = {
  children: React.ReactNode;
};

type HeaderProps = {
  title: string;
  timestamp: string;
  description?: string;
};

type ItemTitleProps = {
  title: string;
  tooltip?: React.ReactNode | string;
  aprValue?: string | null;
  aprTooltip?: React.ReactNode | string;
};

export const VariableRewardsCard: FC<RewardsCardProps> = (props) => {
  const { children, className, skeletonClassName, ...rest } = props;
  return (
    <Card
      {...rest}
      skeletonClassName={skeletonClassName ?? 'h-[63.8rem]'}
      className={cn(
        'rounded-lg border border-border-default !shadow-none',
        className
      )}
    >
      {children}
    </Card>
  );
};

export const VariableRewardsHeader: FC<HeaderProps> = (props) => {
  const { title, timestamp, description } = props;
  return (
    <>
      <div className="flex flex-row gap-3 items-center">
        <span className="text-text-1 font-medium">{title}</span>
        <span className="text-size-12 text-text-3">{timestamp}</span>
      </div>
      {description && <p className="text-size-12 text-text-3">{description}</p>}
    </>
  );
};

export const VariableRewardsItem: FC<ItemProps> = (props) => {
  const { children } = props;
  return (
    <div className="w-full flex flex-row bg-surface-2 rounded-lg px-4 py-3 justify-between gap-10">
      {children}
    </div>
  );
};

export const VariableRewardsItemTitle = (props: ItemTitleProps) => {
  const { title, tooltip, aprValue, aprTooltip } = props;
  return (
    <div className="flex flex-1 justify-between items-center">
      <div className="flex gap-2 items-center">
        <span className="font-medium">{title}</span>
        <Tooltip content={tooltip} className="max-w-[30rem] text-size-12 p-3" />
      </div>
      {aprValue && (
        <div className="flex gap-2 items-center">
          <span className="text-size-14 text-text-1 font-medium">
            {aprValue}
          </span>
          <Tooltip
            content={aprTooltip}
            className="max-w-[30rem] text-size-12 p-3"
          />
        </div>
      )}
    </div>
  );
};

export const VariableRewardsItemContent: FC<ItemProps> = (props) => {
  const { children } = props;
  return <div className="flex flex-1 items-center">{children}</div>;
};
