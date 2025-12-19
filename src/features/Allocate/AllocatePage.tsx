'use client';

import { PageDescription } from '@/shared/components/PageDescription/PageDescription';
import { PageTitle } from '@/shared/components/PageTitle/PageTitle';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { Suspense } from 'react';
import { useAccount } from 'wagmi';
import { useHoldingsData } from '../MyHoldings/hooks/useHoldingsData';
import { AllocationsInfoCard } from './cards/AllocationsInfoCard/AllocationsInfoCard';
import K2AllocationsCard from './cards/K2AllocationsCard/K2Allocations';
import KvcmAllocationsCard from './cards/KVcmAllocationsCard/KVcmAllocationsCard';
import AllocateModals from './modals/AllocateModals';
import { AllocationEmptyState } from './shared/AllocationEmptyState';

export default function AllocatePage() {
  const { address } = useAccount();
  const { data: holdingsData } = useHoldingsData();
  const { data: walletData } = useWalletData();
  const displayOnboarding =
    walletData?.allocations.length === 0 &&
    (!address ||
      (holdingsData?.kvcm.lockedAmount === 0 &&
        holdingsData?.k2.lockedAmount === 0));

  return (
    <Suspense>
      <AllocateModals />
      {displayOnboarding && <AllocationEmptyState />}
      {!displayOnboarding && (
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
      )}
    </Suspense>
  );
}
