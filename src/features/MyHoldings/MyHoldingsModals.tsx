'use client';

import Dialog from '@/shared/components/Dialog/Dialog';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { lockTokenDialogAtom } from '../LockToken/lockToken.utils';
import LockTokenFlow from '../LockToken/LockTokenFlow';
import { stakeLpTokenDialogAtom } from '../StakeLpToken/stakeLpToken.utils';
import StakeLpTokenFlow from '../StakeLpToken/StakeLpTokenFlow';

export default function MyHoldingsModals() {
  const [lockTokenDialog, setLockTokenDialog] = useAtom(lockTokenDialogAtom);
  const [stakeLpTokenDialog, setStakeLpTokenDialog] = useAtom(
    stakeLpTokenDialogAtom
  );

  const searchParams = useSearchParams();

  useEffect(() => {
    const action = searchParams.get('action');
    setStakeLpTokenDialog({ open: false, token: null });
    setLockTokenDialog({ open: false, token: null });
    if (action === 'lock_kvcm') {
      setLockTokenDialog({ open: true, token: 'kvcm' });
    }
    if (action === 'lock_k2') {
      setLockTokenDialog({ open: true, token: 'k2' });
    }
    if (action === 'lock_kvcm-k2') {
      setStakeLpTokenDialog({ open: true, token: 'kvcm-k2' });
    }
    if (action === 'lock_kvcm-usdc') {
      setStakeLpTokenDialog({ open: true, token: 'kvcm-usdc' });
    }
  }, [searchParams, setLockTokenDialog, setStakeLpTokenDialog]);

  return (
    <>
      <Dialog open={lockTokenDialog.open}>
        <LockTokenFlow />
      </Dialog>
      <Dialog open={stakeLpTokenDialog.open}>
        <StakeLpTokenFlow />
      </Dialog>
    </>
  );
}
