'use client';

import { BalancesCard } from '../cards/BalancesCard/BalancesCard';
import { PortfolioDistributionCard } from '../cards/PortfolioDistribution/PortfolioDistribution';
import { PortfolioSnapshot } from '../cards/PortfolioSnapshot/PortfolioSnapshot';
import { PositionsCard } from '../cards/PositionsCard/PositionsCard';

export const OverviewView = () => {
  return (
    <div className="flex flex-col gap-4">
      <PortfolioSnapshot className="solo-card" />
      <PositionsCard className="solo-card" />
      <PortfolioDistributionCard className="solo-card" />
      <BalancesCard className="solo-card" />
    </div>
  );
};
