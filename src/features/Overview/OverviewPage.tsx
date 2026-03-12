'use client';

import { PageDescription } from '@/shared/components/PageDescription/PageDescription';
import { PageTitle } from '@/shared/components/PageTitle/PageTitle';
import StackedCards from '@/shared/components/StackedCards/StackedCards';
import { useHasPreviouslyConnected } from '@/shared/hooks/useHasPreviouslyConnected';
import { useAccount } from 'wagmi';
import CarbonMarketCard from './cards/CarbonMarketCard/CarbonMarketCard';
import K2PriceCard from './cards/K2PriceCard/K2PriceCard';
import KVcmPriceCard from './cards/KVcmPriceCard/KVcmPriceCard';
import LiquidityPoolsCard from './cards/LiquidityPoolsCard/LiquidityPoolsCard';
import TotalK2LockedCard from './cards/TotalK2LockedCard/TotalK2LockedCard';
import TotalKVcmLockedCard from './cards/TotalKVcmLockedCard/TotalKVcmLockedCard';
import { OverviewEmptyState } from './OverviewEmptyState';

export default function OverviewPage() {
  const account = useAccount();
  const { hasPreviouslyConnected } = useHasPreviouslyConnected();

  if (!account.isConnected && !hasPreviouslyConnected) {
    return <OverviewEmptyState />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 text-text-1">
        <PageTitle>Protocol Overview</PageTitle>
        <PageDescription>
          Real-time metrics and insights into Klima Protocol.
        </PageDescription>
      </div>
      <StackedCards>
        <TotalKVcmLockedCard />
        <KVcmPriceCard />
        <TotalK2LockedCard />
        <K2PriceCard />
      </StackedCards>
      <LiquidityPoolsCard />
      <div className="hidden sm:block">
        <CarbonMarketCard />
      </div>
    </div>
  );
}
