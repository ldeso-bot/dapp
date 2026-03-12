'use client';

import { EmptyState } from '@/shared/components/EmptyState/EmptyState';
import { useEmptyStateButton } from '@/shared/hooks/useEmptyStateButton';
import { CustomFlowSection } from '../../shared/CustomFlowSection';
import { overviewDocsCallout, overviewInfoCards } from './overview.constants';

export const OverviewEmptyState = () => {
  const emptyStateButtonConfig = useEmptyStateButton({
    description: 'View your positions and track incentives.',
    onClick: (openConnectModal) => openConnectModal(),
  });

  return (
    <EmptyState
      title={
        <span className="pb-2 text-text-1">
          Your Klima Positions
          <br />
          at a Glance.
        </span>
      }
      description="See your kVCM locks, K2 position, and liquidity — with real-time balances and claimable incentives."
      stats={[]}
      flowItems={[]}
      customFlowSection={<CustomFlowSection />}
      cta={emptyStateButtonConfig}
      infoCards={overviewInfoCards}
      docsCallout={overviewDocsCallout}
    />
  );
};
