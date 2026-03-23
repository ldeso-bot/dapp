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
    'Your Inputs [t006]',
    'kVCM, K2, and liquidity tokens in your wallet. [t007]',
    0
  ),
  createFlowItem(
    LockIcon,
    'Klima Protocol [t008]',
    'Lock and stake capital in fixed-term strategies. [t009]',
    1
  ),
  createFlowItem(
    ClimateIcon,
    'Climate Impact [t010]',
    'Liquidity and carbon credit retirement. [t011]',
    2
  ),
];

export const overviewCarbonStats: StatItem[] = [
  {
    value: 'Transparent [t012]',
    label: 'On-chain positions and verifiable flows. [t013]',
  },
  {
    value: 'Flexible [t014]',
    label: 'Variable duration locks and lock types. [t015]',
  },
  {
    value: 'Impactful [t016]',
    label: 'Direct support for carbon markets. [t017]',
  },
];

export const overviewInfoCards = {
  title: 'How it works [t018]',
  description: 'Three ways to use kVCM and K2 inside Klima. [t019]',
  showSteps: true,
  cards: [
    {
      icon: LockIcon,
      title: 'Lock kVCM [t020]',
      description:
        'Lock kVCM for a fixed term to receive incentives. Allocate to carbon classes to increase execution rates for classes you support. [t021]',
      cta: {
        text: 'Learn more',
        activeView: 'kvcm',
      },
    },
    {
      icon: SaveAltIcon,
      title: 'Deposit K2 [t022]',
      description:
        'Lock K2 to receive variable incentives. Allocate to carbon classes to narrow the spread and make trading easier. [t023]',
      cta: {
        text: 'Learn more',
        activeView: 'k2',
      },
    },
    {
      icon: WaterDropIcon,
      title: 'Stake liquidity [t024]',
      description:
        'Stake liquidity tokens to support trading and become eligible for protocol incentives. [t025]',
      cta: {
        text: 'Learn more',
        activeView: 'liquidity',
      },
    },
  ],
};

export const overviewDocsCallout: DocsCalloutProps = {
  title: 'Dive deeper into Klima Protocol [t026]',
  description:
    'Explore comprehensive documentation covering user handbooks, governance, carbon market mechanics, and technical architecture design. [t027]',
  ...DEFAULT_DOCS_CALLOUT,
};
