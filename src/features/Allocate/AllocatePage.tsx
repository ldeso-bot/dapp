'use client';

import ConnectedFeature from '@/shared/components/ConnectedFeature/ConnectedFeature';
import StackedCards from '@/shared/components/StackedCards/StackedCards';
import { Suspense } from 'react';
import AllocateModals from './AllocateModals';
import AllocationsIntroCard from './cards/AllocationsIntroCard/AllocationsIntroCard';
import K2AllocationsCard from './cards/K2AllocationsCard/K2Allocations';
import KvcmAllocationsCard from './cards/KVcmAllocationsCard/KVcmAllocationsCard';

export default function AllocatePage() {
  return (
    <ConnectedFeature>
      <Suspense>
        <AllocateModals />
      </Suspense>

      <div className="flex flex-col gap-4 lg:flex-row-reverse">
        <div className="flex flex-col gap-4 grow-1">
          <StackedCards>
            <AllocationsIntroCard />
          </StackedCards>

          <StackedCards>
            <KvcmAllocationsCard className="solo-card" />
          </StackedCards>

          <StackedCards>
            <K2AllocationsCard className="solo-card" />
          </StackedCards>
        </div>
      </div>
    </ConnectedFeature>
  );
}
