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
    'Locked tokens [t052]',
    'Time-locked kVCM and K2 positions. [t053]',
    0
  ),
  createFlowItem(TuneIcon, 'Allocate [t054]', 'Choose carbon classes to support. [t055]', 1),
  createFlowItem(
    BalanceIcon,
    'Influence prices [t056]',
    'Your allocations shape carbon class execution rates. [t057]',
    2
  ),
];

export const allocationStats: StatItem[] = [
  {
    value: 'Collective [t058]',
    label: 'Your allocations help set market prices. [t059]',
  },
  {
    value: 'Transparent [t060]',
    label: 'Allocations and prices are publicly visible. [t061]',
  },
  {
    value: 'Flexible [t062]',
    label: 'Deallocate any portion, any time. [t063]',
  },
];

export const allocationInfoCards = {
  title: 'Why allocate? [t064]',
  description:
    'Allocate your locked tokens to influence carbon class execution rates and support market health. [t065]',
  cards: [
    {
      icon: TrendingUpIcon,
      title: 'kVCM: set the price [t066]',
      description:
        'When you allocate kVCM tokens to a carbon class, you increase the price-per-tonne for both buyers and suppliers of that class. [t067]',
    },
    {
      icon: SwapHorizontalIcon,
      title: 'K2: reduce the spread [t068]',
      description:
        'Allocating K2 to carbon classes narrows the spread for that class, making it easier to trade. [t069]',
    },
    {
      icon: LockOpenIcon,
      title: 'Flexible: no lock-in [t070]',
      description:
        "Deallocate any portion at any time. Allocations don't affect your incentives—they only guide carbon execution rates. [t071]",
    },
  ],
};

export const allocationDocsCallout: DocsCalloutProps = {
  title: 'Learn about governance and how prices are set [t072]',
  description:
    'Carbon class execution rates reflect the collective allocations of kVCM holders. K2 allocations further refine this by narrowing spreads. All allocations are recorded on-chain. [t073]',
  ...DEFAULT_DOCS_CALLOUT,
};
