'use client';

import BondsCard from './cards/BondsCard/BondsCard';

export default function MyHoldingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="stacked-cards">
        <BondsCard className="solo-card" />
      </div>
    </div>
  );
}
