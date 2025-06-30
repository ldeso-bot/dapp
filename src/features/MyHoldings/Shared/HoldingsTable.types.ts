import { CardProps } from '@/shared/components/Card/Card';
import { Holding } from '@/shared/models/walletData';
import React from 'react';

export type HoldingsCardProps<T extends Holding> = CardProps & {
  data: T[] | undefined;
  getIcon: (holding: T) => React.ReactNode;
  getButtonLabel: (holding: T) => string;
  getButtonTooltip?: (holding: T) => React.ReactNode;
};

export type HoldingsCardItemProps<T extends Holding> = Omit<
  HoldingsCardProps<T>,
  'data'
> & {
  holding: T;
};
