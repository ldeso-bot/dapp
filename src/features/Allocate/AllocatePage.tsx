'use client';

import { PageDescription } from '@/shared/components/PageDescription/PageDescription';
import { PageTitle } from '@/shared/components/PageTitle/PageTitle';
import { useHasPreviouslyConnected } from '@/shared/hooks/useHasPreviouslyConnected';
import { Suspense } from 'react';
import { useAccount } from 'wagmi';
import { AllocationsInfoCard } from './cards/AllocationsInfoCard/AllocationsInfoCard';
import K2AllocationsCard from './cards/K2AllocationsCard/K2Allocations';
import KvcmAllocationsCard from './cards/KVcmAllocationsCard/KVcmAllocationsCard';
import AllocateModals from './modals/AllocateModals';
import { AllocationEmptyState } from './shared/AllocationEmptyState';

function AllocatePage() {
  const { isConnected } = useAccount();
  const { hasPreviouslyConnected } = useHasPreviouslyConnected();

  // @todo - fix - need to show various button states on the onboarding screen

  // const displayOnboarding =
  //   isConnected ||
  //   (walletData?.allocations?.length === 0 &&
  //     (!address ||
  //       (holdingsData?.kvcm?.lockedAmount === 0 &&
  //         holdingsData?.k2?.lockedAmount === 0)));

  const displayOnboarding = !isConnected && !hasPreviouslyConnected;

  return (
    <Suspense>
      <AllocateModals />
      {displayOnboarding && <AllocationEmptyState />}
      {!displayOnboarding && (
        <div className="flex flex-col gap-4 lg:flex-row-reverse">
          <div className="flex flex-col gap-4 grow-1">
            <PageTitle>Allocations</PageTitle>
            <PageDescription>
              Allocations are your carbon-class preferences. Allocating tokens
              towards carbon classes may influence the execution parameters of
              carbon across the ecosystem.
            </PageDescription>
            <AllocationsInfoCard />
            <KvcmAllocationsCard className="solo-card" />
            <K2AllocationsCard className="solo-card" />
          </div>
        </div>
      )}
    </Suspense>
  );
}

export default AllocatePage;
