'use client';

import Dialog from '@/shared/components/Dialog/Dialog';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { isAllocatableToken } from '@/shared/utils/typeguards';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { editAllocationDialogAtom } from './EditAllocation/editAllocation.utils';
import EditAllocationFlow from './EditAllocation/EditAllocationFlow';
import { newAllocationDialogAtom } from './NewAllocation/newAllocation.utils';
import NewAllocationFlow from './NewAllocation/NewAllocationFlow';

export default function AllocateModals() {
  const { data } = useWalletData();

  const [editAllocationDialog, setEditAllocationDialog] = useAtom(
    editAllocationDialogAtom
  );

  const [newAllocationDialog, setNewAllocationDialog] = useAtom(
    newAllocationDialogAtom
  );

  const searchParams = useSearchParams();

  useEffect(() => {
    const action = searchParams.get('action');
    /* Close dialogs if navigating to /allocate with empty action parameter */
    setEditAllocationDialog({ open: false, allocation: null });
    setNewAllocationDialog({ open: false, token: null });
    if (!action || !data?.allocations) return;

    /* Open dialogs if navigating to /allocate with action parameter */
    if (action.startsWith('new_allocation_')) {
      const token = action.split('_')[2];
      if (isAllocatableToken(token))
        setNewAllocationDialog({ open: true, token });
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
  ]);

  return (
    <>
      {editAllocationDialog.open == true && (
        <Dialog open={editAllocationDialog.open} className="lg:w-full">
          <EditAllocationFlow />
        </Dialog>
      )}
      {newAllocationDialog.open == true && (
        <Dialog open={newAllocationDialog.open} className="lg:w-full">
          <NewAllocationFlow />
        </Dialog>
      )}
    </>
  );
}
