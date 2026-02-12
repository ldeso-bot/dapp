'use client';

import { useHasPreviouslyConnected } from '@/shared/hooks/useHasPreviouslyConnected';
import { useAccount } from 'wagmi';
import { BalancesCard } from '../../cards/BalancesCard/BalancesCard';
import { PortfolioDistributionCard } from '../../cards/PortfolioDistribution/PortfolioDistribution';
import { PortfolioSnapshot } from '../../cards/PortfolioSnapshot/PortfolioSnapshot';
import { PositionsCard } from '../../cards/PositionsCard/PositionsCard';
import { OverviewEmptyState } from './OverviewEmptyState';

export const OverviewView = () => {
  const account = useAccount();
  const { hasPreviouslyConnected } = useHasPreviouslyConnected();

  if (!account.isConnected && !hasPreviouslyConnected) {
    return <OverviewEmptyState />;
  }

  return (
    <div className="flex flex-col gap-4">
      <PositionsCard className="solo-card" />
      <PortfolioDistributionCard className="solo-card" />
      <BalancesCard className="solo-card" />
      <PortfolioSnapshot className="solo-card" />
    </div>
  );
};
