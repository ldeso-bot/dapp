'use client';

import ConnectedFeature from '@/shared/components/ConnectedFeature/ConnectedFeature';
import { PageDescription } from '@/shared/components/PageDescription/PageDescription';
import { PageTitle } from '@/shared/components/PageTitle/PageTitle';
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
          <PageTitle>Allocations</PageTitle>
          <PageDescription>
            Allocations are your portfolio carbon-class preferences. They
            determine which credits the protocol buys/retires and at what
            intensity. Allocations adjust pricing by class. kVCM turns pricing
            on and increases pricing power. K2 increases how much early buying
            pressure the system can apply.
          </PageDescription>
          <AllocationsInfoCard />
          <KvcmAllocationsCard className="solo-card" />
          <K2AllocationsCard className="solo-card" />
        </div>
      </div>
    </ConnectedFeature>
  );
}
