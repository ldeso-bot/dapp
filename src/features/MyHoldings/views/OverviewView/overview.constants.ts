'use client';

import { BadgeIcon } from '@/shared/components/Svg/BadgeIcon';
import { CarbonCreditsIcon } from '@/shared/components/Svg/CarbonCreditsIcon';
import { DocIcon } from '@/shared/components/Svg/DocIcon';
import { GlobeIcon } from '@/shared/components/Svg/GlobeIcon';
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
    'Your Capital',
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
    label: 'Multiple maturity dates and lock types.',
  },
  {
    value: 'Impactful',
    label: 'Direct support for carbon markets.',
  },
];

export const overviewInfoCards = {
  title: 'How It Works',
  description: 'Three ways to deploy kVCM and K2 inside Klima.',
  showSteps: true,
  cards: [
    {
      icon: BadgeIcon,
      title: 'Lock kVCM',
      description:
        'Lock kVCM into fixed-term positions to earn rewards and allocate to carbon classes you want to support.',
      cta: {
        text: 'Explore Lock kVCM',
        activeView: 'kvcm',
      },
    },
    {
      icon: DocIcon,
      title: 'Deposit K2',
      description:
        'Deposit K2 to earn variable rewards and allocate to carbon classes to shape protocol pricing.',
      cta: {
        text: 'Explore Deposit K2',
        activeView: 'k2',
      },
    },
    {
      icon: CarbonCreditsIcon,
      title: 'Stake Liquidity',
      description:
        'Stake liquidity tokens into Klima liquidity pools to support trading and earn rewards.',
      cta: {
        text: 'Explore Stake Liquidity',
        activeView: 'liquidity',
      },
    },
  ],
};

export const overviewDocsCallout: DocsCalloutProps = {
  title: 'Dive Deeper into Klima Protocol',
  description:
    'Explore comprehensive documentation covering user handbooks, governance, carbon market mechanics, and technical architecture design.',
  ...DEFAULT_DOCS_CALLOUT,
};
