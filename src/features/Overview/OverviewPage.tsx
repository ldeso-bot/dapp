'use client';

import StackedCards from '@/shared/components/StackedCards/StackedCards';
import CarbonMarketCard from './cards/CarbonMarketCard/CarbonMarketCard';
import K2PriceCard from './cards/K2PriceCard/K2PriceCard';
import KVcmPriceCard from './cards/KVcmPriceCard/KVcmPriceCard';
import KVcmUsdcRiskyYieldCard from './cards/KVcmUsdcRiskyYieldCard/KVcmUsdcRiskyYieldCard';
import LiquidityPoolsCard from './cards/LiquidityPoolsCard/LiquidityPoolsCard';
import LockedKVcmYieldRatesCard from './cards/LockedKVcmYieldRatesCard/LockedKVcmYieldRatesCard';
import TotalK2LockedCard from './cards/TotalK2LockedCard/TotalK2LockedCard';
import TotalKVcmLockedCard from './cards/TotalKVcmLockedCard/TotalKVcmLockedCard';

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-4">
      <StackedCards>
        <TotalKVcmLockedCard />
        <KVcmPriceCard />
        <TotalK2LockedCard />
        <K2PriceCard />
      </StackedCards>

      <LockedKVcmYieldRatesCard />
      <LiquidityPoolsCard />
      <KVcmUsdcRiskyYieldCard />

      {/* Hidden for the moment. Will probably be removed*/}
      <div className="hidden">
        <StackedCards>
          {/* <CarbonBackingCard /> */}
          {/* <LiquidityCard /> */}
        </StackedCards>
      </div>

      <CarbonMarketCard />

      <StackedCards>
        <KVcmUsdcRiskyYieldCard />
      </StackedCards>

      <StackedCards>
        <CarbonMarketCard />
      </StackedCards>
    </div>
  );
}
