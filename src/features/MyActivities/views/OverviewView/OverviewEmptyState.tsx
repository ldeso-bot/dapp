'use client';

import { EmptyState } from '@/shared/components/EmptyState/EmptyState';
import { useEmptyStateButton } from '@/shared/hooks/useEmptyStateButton';
import { CustomFlowSection } from '../../shared/CustomFlowSection';
import { overviewDocsCallout, overviewInfoCards } from './overview.constants';

export const OverviewEmptyState = () => {
  const emptyStateButtonConfig = useEmptyStateButton({
    description: 'View your positions and track incentives. [t218]',
    onClick: (openConnectModal) => openConnectModal(),
  });

  return (
    <EmptyState
      title={
        <span className="pb-2 text-text-1">
          Your Klima Positions [t219]
          <br />
          at a Glance. [t220]
        </span>
      }
      description="See your kVCM locks, K2 position, and liquidity — with real-time balances and claimable incentives. [t221]"
      stats={[]}
      flowItems={[]}
      customFlowSection={<CustomFlowSection />}
      cta={emptyStateButtonConfig}
      infoCards={overviewInfoCards}
      docsCallout={overviewDocsCallout}
    />
  );
};
