import { getKlimaBondYieldRates } from '@/shared/dal/subgraph/klimaBondYieldRates';
import CarbonBackingCard from './cards/CarbonBackingCard';
import CarbonMarketCard from './cards/CarbonMarketCard';
import CarbonYieldCard from './cards/CarbonYieldCard';
import KlimaBondYieldRatesCard from './cards/KlimaBondedYieldRatesCard';
import KlimaPriceCard from './cards/KlimaPriceCard';
import KlimaXPriceCard from './cards/KlimaXPriceCard';
import LiquidityCard from './cards/LiquidityCard';
import LiquidityPoolRiskyYieldCard from './cards/LiquidityPoolRiskyYieldCard';
import LiquidityPoolsCard from './cards/LiquidityPoolsCard';
import TotalKlimaBondedCard from './cards/TotalKlimaBondedCard';
import TotalKlimaXLockedCard from './cards/TotalKlimaXLockedCard';

export default async function OverviewPage() {
  const data = await getKlimaBondYieldRates();

  return (
    <div className="flex flex-col gap-4">
      <div className="stacked-cards">
        <TotalKlimaBondedCard className="grow-1" />
        <KlimaPriceCard className="grow-1" />
        <TotalKlimaXLockedCard className="grow-1" />
        <KlimaXPriceCard className="grow-1" />
      </div>
      <KlimaBondYieldRatesCard data={data} className="solo-card" />
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
