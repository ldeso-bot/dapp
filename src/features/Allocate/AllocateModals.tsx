'use client';

import Dialog from '@/shared/components/Dialog/Dialog';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import EditAllocationFlow from '../EditAllocation/EditAllocationFlow';
import { editAllocationDialogAtom } from '../EditAllocation/editAllocation.utils';

export default function AllocateModals() {
  const { data } = useWalletData();

  const [editAllocationDialog, setEditAllocationDialog] = useAtom(
    editAllocationDialogAtom
  );

  const searchParams = useSearchParams();

  useEffect(() => {
    const action = searchParams.get('action');
    /* Close dialogs if navigation to /allocate with empty action parameter */
    setEditAllocationDialog({ open: false, allocation: null });
    if (!action || !data?.allocations) return;

    /* Open dialogs if navigation to /allocate with action parameter */
    if (action.startsWith('edit_allocation_')) {
      const id = action.split('_')[2];
      const allocation =
        data.allocations.find((allocation) => allocation.id === id) ?? null;
      setEditAllocationDialog({ open: true, allocation });
    }
  }, [searchParams, setEditAllocationDialog, data?.allocations]);

  return (
    <>
      {editAllocationDialog.open == true && (
        <Dialog open={editAllocationDialog.open} className="lg:w-full">
          <EditAllocationFlow />
        </Dialog>
      )}
    </>
  );
}
