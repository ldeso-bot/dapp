'use client';

import { EmptyState } from '@/shared/components/EmptyState/EmptyState';
import { ProtocolStatsBar } from '@/shared/components/EmptyState/ProtocolStatsBar';
import { HomeIcon } from '@/shared/components/Svg/HomeIcon';
import { WalletIcon } from '@/shared/components/Svg/WalletIcon';
import { ROUTES } from '@/shared/constants/route.constants';
import { useEmptyStateButton } from '@/shared/hooks/useEmptyStateButton';
import type { CtaConfig } from '@/shared/utils/emptyState.utils';
import { useAccount } from 'wagmi';
import {
  overviewCarbonStats,
  overviewDocsCallout,
  overviewFlowItems,
  overviewInfoCards,
} from './overview.constants';

export const OverviewEmptyState = () => {
  const { isConnected } = useAccount();

  const connectWalletCta = useEmptyStateButton({
    description: 'View and manage your positions.',
    onClick: (openConnectModal) => openConnectModal(),
  });

  const protocolOverviewCta: CtaConfig = {
    text: 'Go to Protocol Overview',
    icon: HomeIcon,
    href: ROUTES.OVERVIEW,
    description: 'View real-time protocol metrics and insights.',
  };

  return (
    <EmptyState
      title={
        <span className="pb-2 text-text-1">
          Open Infrastructure for Carbon Markets.
        </span>
      }
      description="Lock kVCM and K2 into incentivized Klima strategies to support carbon markets."
      flowItems={overviewFlowItems}
      cta={isConnected ? protocolOverviewCta : connectWalletCta}
      protocolStatsBar={<ProtocolStatsBar />}
      stats={overviewCarbonStats}
      infoCards={overviewInfoCards}
      docsCallout={overviewDocsCallout}
    />
  );
};
