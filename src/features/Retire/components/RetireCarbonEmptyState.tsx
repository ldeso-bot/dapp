'use client';

import { ImportantToKnow } from '@/features/Retire/components/ImportantToKnow';
import { EmptyState } from '@/shared/components/EmptyState/EmptyState';
import { DollarIcon } from '@/shared/components/Svg/DollarIcon';
import { WalletIcon } from '@/shared/components/Svg/WalletIcon';
import { BUY_KVCM_URL } from '@/shared/constants/urls.constants';
import { CtaConfig } from '@/shared/utils/emptyState.utils';
import { useAccount } from 'wagmi';
import {
  retireCarbonFlowItems,
  retireCarbonInfoCards,
  retireCarbonStats,
} from '../retire.constants';

export const RetireCarbonEmptyState = () => {
  const { address } = useAccount();

  const emptyStateButtonConfig: CtaConfig = !address
    ? {
        text: 'Connect wallet to start',
        icon: WalletIcon,
        description: 'You choose the credits and set the beneficiary details.',
        onClick: (openConnectModal) => openConnectModal(),
      }
    : {
        text: 'Get kVCM',
        icon: DollarIcon,
        description:
          'Acquire kVCM tokens to offset emissions and retire credits.',
        href: BUY_KVCM_URL,
      };

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
