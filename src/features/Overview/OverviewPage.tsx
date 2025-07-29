'use client';

import StackedCards from '@/shared/components/StackedCards/StackedCards';
import CarbonBackingCard from './cards/CarbonBackingCard/CarbonBackingCard';
import CarbonMarketCard from './cards/CarbonMarketCard/CarbonMarketCard';
import CarbonYieldCard from './cards/CarbonYieldCard/CarbonYieldCard';
import K2PriceCard from './cards/K2PriceCard/K2PriceCard';
import KVcmPriceCard from './cards/KVcmPriceCard/KVcmPriceCard';
import KVcmUsdcRiskyYieldCard from './cards/KVcmUsdcRiskyYieldCard/KVcmUsdcRiskyYieldCard';
import LiquidityCard from './cards/LiquidityCard/LiquidityCard';
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

      <StackedCards>
        <LockedKVcmYieldRatesCard />
      </StackedCards>

      <StackedCards>
        <LiquidityPoolsCard />
      </StackedCards>

      <StackedCards>
        <KVcmUsdcRiskyYieldCard />
      </StackedCards>

      {/* Hidden for the moment. Will probably be removed*/}
      <div className="hidden">
        <StackedCards>
          <CarbonBackingCard />
          <LiquidityCard />
        </StackedCards>
      </div>

      <StackedCards>
        <CarbonMarketCard />
      </StackedCards>

      <StackedCards>
        <CarbonYieldCard />
      </StackedCards>
    </div>
  );
}
