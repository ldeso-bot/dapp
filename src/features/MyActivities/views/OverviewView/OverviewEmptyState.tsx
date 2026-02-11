'use client';

import { EmptyState } from '@/shared/components/EmptyState/EmptyState';
import { useEmptyStateButton } from '@/shared/hooks/useEmptyStateButton';
import {
  overviewCarbonStats,
  overviewDocsCallout,
  overviewFlowItems,
  overviewInfoCards,
} from './overview.constants';

type Props = {
  onStartSelling?: () => void;
};

export const OverviewEmptyState = ({ onStartSelling }: Props) => {
  void onStartSelling;

  const emptyStateButtonConfig = useEmptyStateButton({
    description: 'View and manage your positions.',
    onClick: (openConnectModal) => openConnectModal(),
  });

  return (
    <EmptyState
      title={
        <div className="pb-2">
          Carbon Market Infrastructure.
          <br />
          Driving Climate Impact.
        </div>
      }
      description="Lock kVCM and K2 into incentivized Klima strategies to support carbon markets."
      flowItems={overviewFlowItems}
      cta={emptyStateButtonConfig}
      stats={overviewCarbonStats}
      infoCards={overviewInfoCards}
      docsCallout={overviewDocsCallout}
    />
  );
};
