'use client';

import K2LocksCard from './cards/K2LocksCard/K2LocksCard';
import KvcmLocksCard from './cards/KVcmLocksCard/KVcmLocksCard';
import LiquidityPositionsCard from './cards/LiquidityPositionsCard/LiquidityPositionsCard';

export default function MyHoldingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <KvcmLocksCard className="solo-card" />
      <LiquidityPositionsCard className="solo-card" />
      <K2LocksCard className="solo-card" />
    </div>
  );
}
