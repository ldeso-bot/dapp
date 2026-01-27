'use client';

import { PageDescription } from '@/shared/components/PageDescription/PageDescription';
import { PageTitle } from '@/shared/components/PageTitle/PageTitle';
import StackedCards from '@/shared/components/StackedCards/StackedCards';
import CarbonMarketCard from './cards/CarbonMarketCard/CarbonMarketCard';
import K2PriceCard from './cards/K2PriceCard/K2PriceCard';
import KVcmPriceCard from './cards/KVcmPriceCard/KVcmPriceCard';
import LiquidityPoolsCard from './cards/LiquidityPoolsCard/LiquidityPoolsCard';
import TotalK2LockedCard from './cards/TotalK2LockedCard/TotalK2LockedCard';
import TotalKVcmLockedCard from './cards/TotalKVcmLockedCard/TotalKVcmLockedCard';

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
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

      <CarbonMarketCard />

      {/* Hidden for the moment. Will probably be removed*/}
      <div className="hidden">
        {/* <CarbonBackingCard /> */}
        {/* <LiquidityCard /> */}
      </div>
    </div>
  );
}
