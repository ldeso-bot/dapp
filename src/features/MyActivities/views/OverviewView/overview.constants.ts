'use client';

import { LockIcon } from '@/shared/components/Svg/LockIcon';
import { SaveAltIcon } from '@/shared/components/Svg/SaveAltIcon';
import { WaterDropIcon } from '@/shared/components/Svg/WaterDropIcon';
import {
  DEFAULT_DOCS_CALLOUT,
  DocsCalloutProps,
} from '@/shared/utils/emptyState.utils';

export const overviewInfoCards = {
  title: 'Get started [t222]',
  description: 'Choose how to put your kVCM and K2 to work. [t223]',
  showSteps: true,
  cards: [
    {
      icon: LockIcon,
      title: 'Lock kVCM [t224]',
      description:
        'Lock kVCM for a fixed term to receive incentives when the term ends. Allocate locked kVCM to carbon classes to influence protocol pricing. [t225]',
      cta: {
        text: 'Get started [t226]',
        activeView: 'kvcm',
      },
    },
    {
      icon: SaveAltIcon,
      title: 'Deposit K2 [t227]',
      description:
        'Lock K2 to influence carbon class execution rates. Receive variable kVCM and K2 rewards. Unlock your tokens after 24 hours. [t228]',
      cta: {
        text: 'Get started [t229]',
        activeView: 'k2',
      },
    },
    {
      icon: WaterDropIcon,
      title: 'Stake liquidity [t230]',
      description:
        'Deposit liquidity to benefit from trading fees. Stake for a fixed duration to become eligible for kVCM and K2 incentives. [t231]',
      cta: {
        text: 'Get started [t232]',
        activeView: 'liquidity',
      },
    },
  ],
};

export const overviewDocsCallout: DocsCalloutProps = {
  title: 'Learn how positions work [t233]',
  description:
    'Explore comprehensive documentation covering user handbooks, governance, carbon market mechanics, and technical architecture design. [t234]',
  ...DEFAULT_DOCS_CALLOUT,
};
