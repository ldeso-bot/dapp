'use client';

import { EmptyState } from '@/shared/components/EmptyState/EmptyState';
import { useEmptyStateButton } from '@/shared/hooks/useEmptyStateButton';
import {
  allocationDocsCallout,
  allocationFlowItems,
  allocationInfoCards,
  allocationStats,
} from '../allocate.constants';

export const AllocationEmptyState = () => {
  const emptyStateButtonConfig = useEmptyStateButton({
    description: 'View and manage your allocations. [t049]',
    onClick: (openConnectModal) => openConnectModal(),
  });

  return (
    <EmptyState
      title={
        <span className="text-text-1">
          Govern Carbon [t050]
          <br />
          Prices.
        </span>
      }
      description="Allocate your locked kVCM and K2 to influence carbon class execution rates and protocol purchase behavior. [t051]"
      flowItems={allocationFlowItems}
      cta={emptyStateButtonConfig}
      stats={allocationStats}
      infoCards={allocationInfoCards}
      docsCallout={allocationDocsCallout}
    />
  );
};
