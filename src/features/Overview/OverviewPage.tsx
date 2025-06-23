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
        <TotalKlimaBondedCard className="grow-1" />
        <KlimaPriceCard className="grow-1" />
        <TotalKlimaXLockedCard className="grow-1" />
        <KlimaXPriceCard className="grow-1" />
      </div>
      <KlimaBondYieldRatesCard className="solo-card" />
      <LiquidityPoolsCard className="solo-card" />
      <LiquidityPoolRiskyYieldCard className="solo-card" />
      <LiquidityPoolRiskyYieldCard className="solo-card" />
      <div className="stacked-cards">
        <CarbonBackingCard className="grow-1" />
        <LiquidityCard className="grow-1" />
      </div>
      <CarbonYieldCard className="solo-card" />
      <CarbonMarketCard className="solo-card" />
    </div>
  );
}
