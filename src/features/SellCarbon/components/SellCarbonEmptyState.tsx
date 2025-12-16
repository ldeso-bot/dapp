'use client';

import EmptyState from '@/shared/components/EmptyState/EmptyState';
import { useEmptyStateButton } from '@/shared/hooks/useEmptyStateButton';
import {
  sellCarbonDocsCallout,
  sellCarbonFlowItems,
  sellCarbonInfoCardsSection,
  sellCarbonStats,
} from '../sellCarbon.constants';

type Props = {
  onStartSelling?: () => void;
};

export const SellCarbonEmptyState = ({ onStartSelling }: Props) => {
  const emptyStateButtonConfig = useEmptyStateButton({
    onStartAction: onStartSelling,
    disconnectedDescription: 'Fair, transparent pricing.',
    noLocksDescription:
      'Lock kVCM or K2 tokens in positions before you can allocate.',
    hasLocksActionText: 'Start Selling',
  });

  return (
    <EmptyState
      showParticle
      title={
        <>
          Sell Carbon.
          <br />
          Receive kVCM.
        </>
      }
      description="Exchange your carbon credits for kVCM at transparent, market-driven prices."
      flowItems={sellCarbonFlowItems}
      cta={emptyStateButtonConfig}
      stats={sellCarbonStats}
      infoCardsSection={sellCarbonInfoCardsSection}
      docsCallout={sellCarbonDocsCallout}
    />
  );
};
