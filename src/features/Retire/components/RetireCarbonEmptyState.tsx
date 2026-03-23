'use client';

import { ImportantToKnow } from '@/features/Retire/components/ImportantToKnow';
import { EmptyState } from '@/shared/components/EmptyState/EmptyState';
import { WalletIcon } from '@/shared/components/Svg/WalletIcon';
import { CtaConfig } from '@/shared/utils/emptyState.utils';
import {
  retireCarbonFlowItems,
  retireCarbonInfoCards,
  retireCarbonStats,
} from '../retire.constants';

export const RetireCarbonEmptyState = () => {
  const emptyStateButtonConfig: CtaConfig = {
    text: 'Connect wallet to start [t114]',
    icon: WalletIcon,
    description: 'You choose the credits and set the beneficiary details. [t115]',
    onClick: (openConnectModal) => openConnectModal(),
  };

  return (
    <EmptyState
      title={
        <span className="text-text-1">
          Retire Carbon. [t116] <br /> Make It Permanent. [t117]
        </span>
      }
      description="Use your kVCM to permanently retire carbon credits and receive a verified certificate via Carbonmark. [t118]"
      flowItems={retireCarbonFlowItems}
      cta={emptyStateButtonConfig}
      stats={retireCarbonStats}
      infoCards={retireCarbonInfoCards}
      customCalloutSection={<ImportantToKnow />}
    />
  );
};
