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
    text: 'Connect wallet to start',
    icon: WalletIcon,
    description: 'Fair, transparent pricing.',
    onClick: (openConnectModal) => openConnectModal(),
  };
  return (
    <EmptyState
      title={
        <>
          Supply Carbon.
          <br />
          Receive kVCM.
        </>
      }
      description="Supply your carbon credits to Klima Protocol in exchange for kVCM tokens at market-driven prices."
      flowItems={sellCarbonFlowItems}
      cta={emptyStateButtonConfig}
      stats={sellCarbonStats}
      infoCards={sellCarbonInfoCards}
      docsCallout={sellCarbonDocsCallout}
    />
  );
};
