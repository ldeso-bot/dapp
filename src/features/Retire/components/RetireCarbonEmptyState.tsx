'use client';

import { ImportantToKnow } from '@/features/Retire/components/ImportantToKnow';
import { EmptyState } from '@/shared/components/EmptyState/EmptyState';
import { useEmptyStateButton } from '@/shared/hooks/useEmptyStateButton';
import {
  retireCarbonFlowItems,
  retireCarbonInfoCards,
  retireCarbonStats,
} from '../retire.constants';

type Props = {
  onStartSelling?: () => void;
};

export const RetireCarbonEmptyState = ({ onStartSelling }: Props) => {
  const emptyStateButtonConfig = useEmptyStateButton({
    onStartAction: onStartSelling,
    disconnectedDescription:
      'You choose the credits and set the beneficiary details.',
    noLocksDescription:
      'Lock kVCM or K2 tokens in positions before you can allocate.',
    hasLocksActionText: 'Start Selling',
  });

  return (
    <EmptyState
      title={
        <>
          Retire Carbon. <br /> Make It Permanent.
        </>
      }
      description="Use your kVCM to permanently retire carbon credits and receive a verified certificate via Carbonmark."
      flowItems={retireCarbonFlowItems}
      cta={emptyStateButtonConfig}
      stats={retireCarbonStats}
      infoCards={retireCarbonInfoCards}
      customCalloutSection={<ImportantToKnow />}
    />
  );
};
