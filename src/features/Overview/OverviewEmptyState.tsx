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
        <div className="pb-2">Open Infrastructure for Carbon Markets.</div>
      }
      description="Lock kVCM and K2 into incentivized Klima strategies to support carbon markets."
      flowItems={overviewFlowItems}
      cta={emptyStateButtonConfig}
      protocolStatsBar={<ProtocolStatsBar />}
      stats={overviewCarbonStats}
      infoCards={overviewInfoCards}
      docsCallout={overviewDocsCallout}
    />
  );
};
