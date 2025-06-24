'use client';

import CarbonBackingCard from './cards/CarbonBackingCard/CarbonBackingCard';
import CarbonMarketCard from './cards/CarbonMarketCard/CarbonMarketCard';
import CarbonYieldCard from './cards/CarbonYieldCard/CarbonYieldCard';
import KlimaBondYieldRatesCard from './cards/KlimaBondedYieldRatesCard/KlimaBondedYieldRatesCard';
import KlimaPriceCard from './cards/KlimaPriceCard/KlimaPriceCard';
import KlimaXPriceCard from './cards/KlimaXPriceCard/KlimaXPriceCard';
import LiquidityCard from './cards/LiquidityCard/LiquidityCard';
import LiquidityPoolRiskyYieldCard from './cards/LiquidityPoolRiskyYieldCard/LiquidityPoolRiskyYieldCard';
import LiquidityPoolsCard from './cards/LiquidityPoolsCard/LiquidityPoolsCard';
import TotalKlimaBondedCard from './cards/TotalKlimaBondedCard/TotalKlimaBondedCard';
import TotalKlimaXLockedCard from './cards/TotalKlimaXLockedCard/TotalKlimaXLockedCard';

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="stacked-cards">
        <TotalKlimaBondedCard />
        <KlimaPriceCard />
        <TotalKlimaXLockedCard />
        <KlimaXPriceCard />
      </div>
      <KlimaBondYieldRatesCard className="solo-card" />
      <LiquidityPoolsCard className="solo-card" />
      <LiquidityPoolRiskyYieldCard className="solo-card" />
      <div className="stacked-cards">
        <CarbonBackingCard />
        <LiquidityCard />
      </div>
      <CarbonYieldCard className="solo-card" />
      <CarbonMarketCard className="solo-card" />
    </div>
  );
}
