'use client';

import Dialog from '@/shared/components/Dialog/Dialog';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { lockTokenDialogAtom } from '../LockToken/lockToken.utils';
import LockTokenFlow from '../LockToken/LockTokenFlow';
import { stakeLpTokenDialogAtom } from '../StakeLpToken/stakeLpToken.utils';
import StakeLpTokenFlow from '../StakeLpToken/StakeLpTokenFlow';
import { unstakeLpTokenDialogAtom } from '../UnstakeLpToken/unstakeLpToken.utils';
import UnstakeLpTokenFlow from '../UnstakeLpToken/UnstakeLpTokenFlow';

export default function MyHoldingsModals() {
  const [lockTokenDialog, setLockTokenDialog] = useAtom(lockTokenDialogAtom);
  const [stakeLpTokenDialog, setStakeLpTokenDialog] = useAtom(
    stakeLpTokenDialogAtom
  );
  const [unstakeLpTokenDialog, setUnstakeLpTokenDialog] = useAtom(
    unstakeLpTokenDialogAtom
  );
  const data = useWalletData();

  const searchParams = useSearchParams();

  useEffect(() => {
    const action = searchParams.get('action');
    /* Close dialogs if navigation to /my_holdings with empty action parameter */
    setStakeLpTokenDialog({ open: false, token: null });
    setLockTokenDialog({ open: false, token: null });
    setUnstakeLpTokenDialog({ open: false, liquidityPosition: null });
    if (!action) return;

    /* Open dialogs if navigation to /my_holdings with action parameter */
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
    if (action.startsWith('unlock_lp_')) {
      const id = action.split('_')[2];
      const liquidityPosition =
        data.data?.liquidityPositions.find((lp) => lp.id === id) ?? null;
      setUnstakeLpTokenDialog({ open: true, liquidityPosition });
    }
  }, [
    searchParams,
    setLockTokenDialog,
    setStakeLpTokenDialog,
    setUnstakeLpTokenDialog,
    data.data?.liquidityPositions,
  ]);

  return (
    <>
      <Dialog open={lockTokenDialog.open}>
        <LockTokenFlow />
      </Dialog>
      <Dialog open={stakeLpTokenDialog.open}>
        <StakeLpTokenFlow />
      </Dialog>
      <Dialog open={unstakeLpTokenDialog.open}>
        <UnstakeLpTokenFlow />
      </Dialog>
    </>
  );
}
