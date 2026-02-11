'use client';

import { BadgeIcon } from '@/shared/components/Svg/BadgeIcon';
import { CarbonCreditsIcon } from '@/shared/components/Svg/CarbonCreditsIcon';
import { GlobeIcon } from '@/shared/components/Svg/GlobeIcon';
import { SaveAltIcon } from '@/shared/components/Svg/SaveAltIcon';
import { SwapHorizontalIcon } from '@/shared/components/Svg/SwapHorizontalIcon';
import {
  createFlowItem,
  DEFAULT_DOCS_CALLOUT,
  DocsCalloutProps,
  StatItem,
} from '@/shared/utils/emptyState.utils';

export const overviewFlowItems = [
  createFlowItem(
    CarbonCreditsIcon,
    'Your Inputs',
    'kVCM, K2, and liquidity tokens in your wallet.',
    0
  ),
  createFlowItem(
    SwapHorizontalIcon,
    'Klima Protocol',
    'Lock and stake capital in fixed-term strategies.',
    1
  ),
  createFlowItem(
    GlobeIcon,
    'Climate Impact',
    'Liquidity and carbon credit retirement.',
    2
  ),
];

export const overviewCarbonStats: StatItem[] = [
  {
    value: 'Transparent',
    label: 'On-chain positions and verifiable flows.',
  },
  {
    value: 'Flexible',
    label: 'Variable duration locks and lock types.',
  },
  {
    value: 'Impactful',
    label: 'Direct support for carbon markets.',
  },
];

export const overviewInfoCards = {
  title: 'How it works',
  description: 'Three ways to use kVCM and K2 inside Klima.',
  showSteps: true,
  cards: [
    {
      icon: BadgeIcon,
      title: 'Lock kVCM',
      description:
        'Use kVCM in fixed-term locks, receive incentives and allocate to carbon classes you want to support.',
      cta: {
        text: 'Learn more',
        activeView: 'kvcm',
      },
    },
    {
      icon: SaveAltIcon,
      title: 'Deposit K2',
      description:
        'Deposit K2 to allocate your tokens to carbon classes and receive incentives.',
      cta: {
        text: 'Learn more',
        activeView: 'k2',
      },
    },
    {
      icon: CarbonCreditsIcon,
      title: 'Stake liquidity',
      description:
        'Stake liquidity tokens into Klima liquidity pools to support trading receive incentives.',
      cta: {
        text: 'Learn more',
        activeView: 'liquidity',
      },
    },
  ],
};

export const overviewDocsCallout: DocsCalloutProps = {
  title: 'Dive deeper into Klima Protocol',
  description:
    'Explore comprehensive documentation covering user handbooks, governance, carbon market mechanics, and technical architecture design.',
  ...DEFAULT_DOCS_CALLOUT,
};
