'use client';

import { EmptyState } from '@/shared/components/EmptyState/EmptyState';
import { useEmptyStateButton } from '@/shared/hooks/useEmptyStateButton';
import {
  allocationDocsCallout,
  allocationFlowItems,
  allocationInfoCards,
  allocationStats,
} from '../allocate.constants';

type Props = {
  onStartAllocating?: () => void;
};

export const AllocationEmptyState = ({ onStartAllocating }: Props) => {
  const emptyStateButtonConfig = useEmptyStateButton({
    onStartAction: onStartAllocating,
    disconnectedDescription: 'View and manage your allocations.',
    noLocksDescription:
      'Lock kVCM or K2 tokens in positions before you can allocate.',
    hasLocksActionText: 'Start Allocating',
  });

  return (
    <EmptyState
      title={
        <>
          Govern Carbon
          <br />
          Prices.
        </>
      }
      description="Allocate your locked kVCM and K2 to influence carbon class prices and protocol purchase behavior."
      flowItems={allocationFlowItems}
      cta={emptyStateButtonConfig}
      stats={allocationStats}
      infoCards={allocationInfoCards}
      docsCallout={allocationDocsCallout}
    />
  );
};
