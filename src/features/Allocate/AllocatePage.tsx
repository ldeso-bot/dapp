'use client';

import ConnectedFeature from '@/shared/components/ConnectedFeature/ConnectedFeature';
import { Suspense } from 'react';
import { AllocationsInfoCard } from './cards/AllocationsInfoCard/AllocationsInfoCard';
import K2AllocationsCard from './cards/K2AllocationsCard/K2Allocations';
import KvcmAllocationsCard from './cards/KVcmAllocationsCard/KVcmAllocationsCard';
import AllocateModals from './modals/AllocateModals';

export default function AllocatePage() {
  return (
    <ConnectedFeature>
      <Suspense>
        <AllocateModals />
      </Suspense>
      <div className="flex flex-col gap-4 lg:flex-row-reverse">
        <div className="flex flex-col gap-4 grow-1">
          <h1 className="text-[2.4rem] font-semibold">Allocations</h1>
          <p className="text-size-14 text-gray-500">
            Allocations are your portfolio carbon-class preferences. They
            determine which credits the protocol buys/retires and at what
            intensity. Allocations adjust pricing by class. kVCM turns pricing
            on and increases pricing power. K2 increases how much early buying
            pressure the system can apply.
          </p>
          <AllocationsInfoCard />
          <KvcmAllocationsCard className="solo-card" />
          <K2AllocationsCard className="solo-card" />
        </div>
      </div>
    </ConnectedFeature>
  );
}
