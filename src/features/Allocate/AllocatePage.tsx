'use client';

import AllocationsIntroCard from './cards/AllocationsIntroCard/AllocationsIntroCard';
import K2AllocationsCard from './cards/K2AllocationsCard/K2Allocations';
import KvcmAllocationsCard from './cards/KVcmAllocationsCard/KVcmAllocationsCard';

export default function AllocatePage() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse">
      <div className="flex flex-col gap-4 grow-1">
        <AllocationsIntroCard />
        <KvcmAllocationsCard className="solo-card" />
        <K2AllocationsCard className="solo-card" />
      </div>
    </div>
  );
}
