'use client';

import { LockIcon } from '@/shared/components/Svg/LockIcon';
import { SaveAltIcon } from '@/shared/components/Svg/SaveAltIcon';
import { WaterDropIcon } from '@/shared/components/Svg/WaterDropIcon';
import {
  DEFAULT_DOCS_CALLOUT,
  DocsCalloutProps,
} from '@/shared/utils/emptyState.utils';

export const overviewInfoCards = {
  title: 'Get started',
  description: 'Choose how to put your kVCM and K2 to work.',
  showSteps: true,
  cards: [
    {
      icon: LockIcon,
      title: 'Lock kVCM',
      description:
        'Lock kVCM for a fixed term to receive incentives when the term ends. Allocate locked kVCM to carbon classes to influence protocol pricing.',
      cta: {
        text: 'Get started',
        activeView: 'kvcm',
      },
    },
    {
      icon: SaveAltIcon,
      title: 'Deposit K2',
      description:
        'Lock K2 to influence carbon class execution rates. Receive variable kVCM and K2 rewards. Unlock your tokens after 24 hours.',
      cta: {
        text: 'Get started',
        activeView: 'k2',
      },
    },
    {
      icon: WaterDropIcon,
      title: 'Stake liquidity',
      description:
        'Deposit liquidity to benefit from trading fees. Stake for a fixed duration to become eligible for kVCM and K2 incentives.',
      cta: {
        text: 'Get started',
        activeView: 'liquidity',
      },
    },
  ],
};

export const overviewDocsCallout: DocsCalloutProps = {
  title: 'Learn how positions work',
  description:
    'Explore comprehensive documentation covering user handbooks, governance, carbon market mechanics, and technical architecture design.',
  ...DEFAULT_DOCS_CALLOUT,
};
