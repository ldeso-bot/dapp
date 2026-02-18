'use client';

import { useHasKycVerification } from '@/features/Kyc/useHasKycVerification';
import Dialog from '@/shared/components/Dialog/Dialog';
import { ROUTES } from '@/shared/constants/route.constants';
import {
  type AllocationToken,
  isAllocatableToken,
} from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { editAllocationDialogAtom } from './EditAllocation/editAllocation.utils';
import EditAllocationFlow from './EditAllocation/EditAllocationFlow';
import { newAllocationDialogAtom } from './NewAllocation/newAllocation.utils';
import NewAllocationFlow from './NewAllocation/NewAllocationFlow';

export default function AllocateModals() {
  const { data } = useWalletData();
  const router = useRouter();
  const { openKycOrProceed } = useHasKycVerification();

  const [editAllocationDialog, setEditAllocationDialog] = useAtom(
    editAllocationDialogAtom
  );

  const [newAllocationDialog, setNewAllocationDialog] = useAtom(
    newAllocationDialogAtom
  );

  const searchParams = useSearchParams();

  const closeNewAllocation = () => {
    setNewAllocationDialog({ open: false, token: null });
    router.push(ROUTES.ALLOCATE);
  };

  const closeEditAllocation = () => {
    setEditAllocationDialog({ open: false, allocation: null });
    router.push(ROUTES.ALLOCATE);
  };

  useEffect(() => {
    const action = searchParams.get('action');

    // If there's no action, just close dialogs and return
    if (!action) {
      setEditAllocationDialog({ open: false, allocation: null });
      setNewAllocationDialog({ open: false, token: null });
      return;
    }

    if (!data?.allocations) return;

    if (action.startsWith('new_allocation_')) {
      const tokenCandidate = action.split('_')[2];
      if (!isAllocatableToken(tokenCandidate)) return;

      const token = tokenCandidate as AllocationToken;
      const source = token === 'k2' ? 'allocate_k2' : 'allocate_kvcm';

      openKycOrProceed(source, () =>
        setNewAllocationDialog({ open: true, token })
      );
      return;
    }
    if (action.startsWith('edit_allocation_')) {
      const id = action.split('_')[2];
      const allocation =
        data.allocations.find((allocation) => allocation.id === id) ?? null;
      setEditAllocationDialog({ open: true, allocation });
    }
  }, [
    searchParams,
    setEditAllocationDialog,
    data?.allocations,
    setNewAllocationDialog,
    openKycOrProceed,
  ]);

  return (
    <>
      {editAllocationDialog.open == true && (
        <Dialog open={editAllocationDialog.open} onClose={closeEditAllocation}>
          <EditAllocationFlow />
        </Dialog>
      )}
      {newAllocationDialog.open == true && (
        <Dialog open={newAllocationDialog.open} onClose={closeNewAllocation}>
          <NewAllocationFlow />
        </Dialog>
      )}
    </>
  );
}
