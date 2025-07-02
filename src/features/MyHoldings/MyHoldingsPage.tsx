'use client';

import ConnectedFeature from '@/shared/components/ConnectedFeature/ConnectedFeature';
import StackedCards from '@/shared/components/StackedCards/StackedCards';
import IdleBalancesCard from './cards/IdleBalancesCard/IdleBalancesCard';
import K2LocksCard from './cards/K2LocksCard/K2LocksCard';
import KvcmLocksCard from './cards/KVcmLocksCard/KVcmLocksCard';
import LiquidityPositionsCard from './cards/LiquidityPositionsCard/LiquidityPositionsCard';

export default function MyHoldingsPage() {
  return (
    <ConnectedFeature>
      <div className="flex flex-col gap-4 lg:flex-row-reverse">
        <div>
          <StackedCards>
            <IdleBalancesCard className="solo-card lg:w-[27.2rem]" />
          </StackedCards>
        </div>
        <div className="flex flex-col gap-4 grow-1">
          <StackedCards>
            <KvcmLocksCard />
          </StackedCards>

          <StackedCards>
            <LiquidityPositionsCard className="solo-card" />
          </StackedCards>

          <StackedCards>
            <K2LocksCard className="solo-card" />
          </StackedCards>
        </div>
      </div>
    </ConnectedFeature>
  );
}
