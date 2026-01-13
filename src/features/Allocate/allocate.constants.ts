import { BalanceIcon } from '@/shared/components/Svg/BalanceIcon';
import { LockIcon } from '@/shared/components/Svg/LockIcon';
import { LockOpenIcon } from '@/shared/components/Svg/LockOpenIcon';
import { SwapHorizontalIcon } from '@/shared/components/Svg/SwapHorizontalIcon';
import { TrendingUpIcon } from '@/shared/components/Svg/TrendingUpIcon';
import { TuneIcon } from '@/shared/components/Svg/TuneIcon';
import type {
  DocsCalloutProps,
  StatItem,
} from '@/shared/utils/emptyState.utils';
import {
  createFlowItem,
  DEFAULT_DOCS_CALLOUT,
} from '@/shared/utils/emptyState.utils';

export const allocationFlowItems = [
  createFlowItem(
    LockIcon,
    'Locked Tokens',
    'Time-locked kVCM and K2 positions.',
    0
  ),
  createFlowItem(TuneIcon, 'Allocate', 'Choose carbon classes to support.', 1),
  createFlowItem(
    BalanceIcon,
    'Influence Prices',
    'Your allocations shape carbon class prices.',
    2
  ),
];

export const allocationStats: StatItem[] = [
  {
    value: 'Collective',
    label: 'Your allocations help set market prices.',
  },
  {
    value: 'Transparent',
    label: 'Allocations and prices are publicly visible.',
  },
  {
    value: 'Flexible',
    label: 'Deallocate any portion, any time.',
  },
];

export const allocationInfoCards = {
  title: 'Why Allocate?',
  description:
    'Allocate your locked tokens to influence carbon class prices and support market health.',
  cards: [
    {
      icon: TrendingUpIcon,
      title: 'kVCM: Set the Price',
      description:
        'When you allocate kVCM tokens to a carbon class, you increase the price-per-tonne for both buyers and sellers of that class.',
    },
    {
      icon: SwapHorizontalIcon,
      title: 'K2: Reduce the Spread',
      description:
        'Allocating K2 narrows the buy-sell spread for that class, making it easier to trade.',
    },
    {
      icon: LockOpenIcon,
      title: 'Flexible: No Lock-in',
      description:
        "Deallocate any portion at any time. Allocations don't affect your incentives—they only guide carbon prices.",
    },
  ],
};

export const allocationDocsCallout: DocsCalloutProps = {
  title: 'Learn About Governance and How Prices Are Set',
  description:
    'Carbon class prices reflect the collective allocations of kVCM holders. K2 allocations further refine pricing by narrowing spreads. All allocations are recorded on-chain.',
  ...DEFAULT_DOCS_CALLOUT,
};
