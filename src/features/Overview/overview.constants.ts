'use client';

import { ClimateIcon } from '@/shared/components/Svg/ClimateIcon';
import { LockIcon } from '@/shared/components/Svg/LockIcon';
import { SaveAltIcon } from '@/shared/components/Svg/SaveAltIcon';
import { WalletIcon } from '@/shared/components/Svg/WalletIcon';
import { WaterDropIcon } from '@/shared/components/Svg/WaterDropIcon';
import {
  createFlowItem,
  DEFAULT_DOCS_CALLOUT,
  DocsCalloutProps,
  StatItem,
} from '@/shared/utils/emptyState.utils';

export const overviewFlowItems = [
  createFlowItem(
    WalletIcon,
    'Your Inputs',
    'kVCM, K2, and liquidity tokens in your wallet.',
    0
  ),
  createFlowItem(
    LockIcon,
    'Klima Protocol',
    'Lock and stake capital in fixed-term strategies.',
    1
  ),
  createFlowItem(
    ClimateIcon,
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
      icon: LockIcon,
      title: 'Lock kVCM',
      description:
        'Lock kVCM for a fixed term to receive incentives. Allocate to carbon classes to increase execution rates for classes you support.',
      cta: {
        text: 'Learn more',
        activeView: 'kvcm',
      },
    },
    {
      icon: SaveAltIcon,
      title: 'Deposit K2',
      description:
        'Lock K2 to receive variable incentives. Allocate to carbon classes to narrow the spread and make trading easier.',
      cta: {
        text: 'Learn more',
        activeView: 'k2',
      },
    },
    {
      icon: WaterDropIcon,
      title: 'Stake liquidity',
      description:
        'Stake liquidity tokens to support trading and become eligible for protocol incentives.',
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
