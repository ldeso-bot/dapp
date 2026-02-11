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
    'Locked tokens',
    'Time-locked kVCM and K2 positions.',
    0
  ),
  createFlowItem(TuneIcon, 'Allocate', 'Choose carbon classes to support.', 1),
  createFlowItem(
    BalanceIcon,
    'Influence prices',
    'Your allocations shape carbon class execution rates.',
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
  title: 'Why allocate?',
  description:
    'Allocate your locked tokens to influence carbon class execution rates and support market health.',
  cards: [
    {
      icon: TrendingUpIcon,
      title: 'kVCM: set the price',
      description:
        'When you allocate kVCM tokens to a carbon class, you increase the price-per-tonne for both buyers and suppliers of that class.',
    },
    {
      icon: SwapHorizontalIcon,
      title: 'K2: reduce the spread',
      description:
        'Allocating K2 to carbon classes narrows the spread for that class, making it easier to trade.',
    },
    {
      icon: LockOpenIcon,
      title: 'Flexible: no lock-in',
      description:
        "Deallocate any portion at any time. Allocations don't affect your incentives—they only guide carbon execution rates.",
    },
  ],
};

export const allocationDocsCallout: DocsCalloutProps = {
  title: 'Learn about governance and how prices are set',
  description:
    'Carbon class execution rates reflect the collective allocations of kVCM holders. K2 allocations further refine this by narrowing spreads. All allocations are recorded on-chain.',
  ...DEFAULT_DOCS_CALLOUT,
};
