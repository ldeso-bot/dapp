'use client';

import Dialog from '@/shared/components/Dialog/Dialog';
import { ROUTES } from '@/shared/constants/route.constants';
import { AllocationToken } from '@/shared/constants/tokens.constants';
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

    /* Open dialogs if navigating to /allocate with action parameter */
    if (action.startsWith('new_allocation_')) {
      const token = action.split('_')[2];
      setNewAllocationDialog({ open: true, token: token as AllocationToken });
    } else if (action.startsWith('edit_allocation_')) {
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
