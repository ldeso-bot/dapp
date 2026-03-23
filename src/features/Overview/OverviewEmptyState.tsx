'use client';

import { EmptyState } from '@/shared/components/EmptyState/EmptyState';
import { ProtocolStatsBar } from '@/shared/components/EmptyState/ProtocolStatsBar';
import { useEmptyStateButton } from '@/shared/hooks/useEmptyStateButton';
import {
  overviewCarbonStats,
  overviewDocsCallout,
  overviewFlowItems,
  overviewInfoCards,
} from './overview.constants';

export const OverviewEmptyState = () => {
  const emptyStateButtonConfig = useEmptyStateButton({
    description: 'View and manage your positions.',
    onClick: (openConnectModal) => openConnectModal(),
  });

  return (
    <EmptyState
      title={
        <span className="pb-2 text-text-1">
          Open Infrastructure for Carbon Markets.
        </span>
      }
      description="Participate in the protocol powering transparent, on-chain carbon markets."
      flowItems={overviewFlowItems}
      cta={emptyStateButtonConfig}
      protocolStatsBar={<ProtocolStatsBar />}
      stats={overviewCarbonStats}
      infoCards={overviewInfoCards}
      docsCallout={overviewDocsCallout}
    />
  );
};
