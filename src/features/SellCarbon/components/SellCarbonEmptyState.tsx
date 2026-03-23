'use client';

import { EmptyState } from '@/shared/components/EmptyState/EmptyState';
import { WalletIcon } from '@/shared/components/Svg/WalletIcon';
import { CtaConfig } from '@/shared/utils/emptyState.utils';
import {
  sellCarbonDocsCallout,
  sellCarbonFlowItems,
  sellCarbonInfoCards,
  sellCarbonStats,
} from '../sellCarbon.constants';

export const SellCarbonEmptyState = () => {
  const emptyStateButtonConfig: CtaConfig = {
    text: 'Connect wallet to start [t184]',
    icon: WalletIcon,
    description: 'Fair, transparent pricing. [t185]',
    onClick: (openConnectModal) => openConnectModal(),
  };
  return (
    <EmptyState
      title={
        <span className="text-text-1">
          Supply Carbon. [t186]
          <br />
          Receive kVCM. [t187]
        </span>
      }
      description="Supply your carbon credits to Klima Protocol in exchange for kVCM tokens at market-driven prices. [t188]"
      flowItems={sellCarbonFlowItems}
      cta={emptyStateButtonConfig}
      stats={sellCarbonStats}
      infoCards={sellCarbonInfoCards}
      docsCallout={sellCarbonDocsCallout}
    />
  );
};
