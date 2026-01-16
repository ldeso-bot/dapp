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
    text: 'Connect Wallet to Start',
    icon: WalletIcon,
    description: 'Fair, transparent pricing.',
    onClick: (openConnectModal) => openConnectModal(),
  };
  return (
    <EmptyState
      title={
        <>
          Sell Carbon.
          <br />
          Receive kVCM.
        </>
      }
      description="Exchange your carbon credits for kVCM at transparent, market-driven prices."
      flowItems={sellCarbonFlowItems}
      cta={emptyStateButtonConfig}
      stats={sellCarbonStats}
      infoCards={sellCarbonInfoCards}
      docsCallout={sellCarbonDocsCallout}
    />
  );
};
