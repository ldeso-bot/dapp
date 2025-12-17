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
  const emptyStateButtonConfig = useEmptyStateButton({
    onStartAction: onStartSelling,
    disconnectedDescription: 'View and manage your positions.',
    noLocksDescription:
      'Lock kVCM or K2 tokens in positions before you can allocate.',
    hasLocksActionText: 'Start Selling',
  });

  return (
    <EmptyState
      title={
        <>
          Deploy Capital.
          <br />
          Drive Climate Impact.
        </>
      }
      description="Lock kVCM and K2 into Klima strategies that earn rewards and support carbon markets."
      flowItems={overviewFlowItems}
      cta={emptyStateButtonConfig}
      stats={overviewCarbonStats}
      infoCards={overviewInfoCards}
      docsCallout={overviewDocsCallout}
    />
  );
};
