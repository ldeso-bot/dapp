'use client';

import Dialog from '@/shared/components/Dialog/Dialog';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useAtom } from 'jotai';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { claimMaturedLockRewardsDialogAtom } from './ClaimMaturedLockRewards/claimKvcmLockRewards.utils';
import ClaimMaturedLockRewardsDialog from './ClaimMaturedLockRewards/ClaimMaturedLockRewardsDialog';
import { depositK2TokenDialogAtom } from './DepositK2Token/depositK2Token.utils';
import DepositK2TokenFlow from './DepositK2Token/DepositK2TokenFlow';
import { lockTokenDialogAtom } from './LockToken/lockToken.utils';
import LockTokenFlow from './LockToken/LockTokenFlow';
import { stakeLpTokenDialogAtom } from './StakeLpToken/stakeLpToken.utils';
import StakeLpTokenFlow from './StakeLpToken/StakeLpTokenFlow';
import TopupLockFlow from './TopupLock/TopupLock';
import {
  resetTopupLockDialog,
  topupLockDialogAtom,
} from './TopupLock/topupLock.utils';
import { unlockTokenDialogAtom } from './UnlockToken/unlockToken.utils';
import UnlockTokenFlow from './UnlockToken/UnlockTokenFlow';
import { unstakeLpTokenDialogAtom } from './UnstakeLpToken/unstakeLpToken.utils';
import UnstakeLpTokenFlow from './UnstakeLpToken/UnstakeLpTokenFlow';

export const MyActivitiesModals = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data } = useWalletData();

  // tracks previous dialog state to detect when a dialog closes
  const prevHasOpenDialogRef = useRef(false);
  const [lockTokenDialog, setLockTokenDialog] = useAtom(lockTokenDialogAtom);
  const [stakeLpTokenDialog, setStakeLpTokenDialog] = useAtom(
    stakeLpTokenDialogAtom
  );
  const [unstakeLpTokenDialog, setUnstakeLpTokenDialog] = useAtom(
    unstakeLpTokenDialogAtom
  );
  const [unlockTokenDialog, setUnlockTokenDialog] = useAtom(
    unlockTokenDialogAtom
  );
  const [topupLockDialog, setTopupLockDialog] = useAtom(topupLockDialogAtom);
  const [depositK2TokenDialog, setDepositK2TokenDialog] = useAtom(
    depositK2TokenDialogAtom
  );
  const [claimMaturedLockRewardsDialog, setClaimMaturedLockRewardsDialog] =
    useAtom(claimMaturedLockRewardsDialogAtom);

  useEffect(() => {
    const hasOpenDialog =
      lockTokenDialog.open ||
      stakeLpTokenDialog.open ||
      unstakeLpTokenDialog.open ||
      unlockTokenDialog.open ||
      topupLockDialog.open ||
      claimMaturedLockRewardsDialog.open || 
      depositK2TokenDialog.open;

    const shouldRemoveActionParam =
      !hasOpenDialog &&
      prevHasOpenDialogRef.current &&
      searchParams.get('action');

    if (shouldRemoveActionParam) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('action');
      const newSearch = params.toString();
      router.replace(newSearch ? `?${newSearch}` : pathname, {
        scroll: false,
      });
    }
    // tracks current state for next render to detect dialog close
    prevHasOpenDialogRef.current = hasOpenDialog;
  }, [
    lockTokenDialog.open,
    stakeLpTokenDialog.open,
    unstakeLpTokenDialog.open,
    unlockTokenDialog.open,
    topupLockDialog.open,
    claimMaturedLockRewardsDialog.open,
    depositK2TokenDialog.open,
    searchParams,
    router,
    pathname,
  ]);

  useEffect(() => {
    const action = searchParams.get('action');

    /* Close dialogs if navigation to /my_holdings with empty action parameter */
    setStakeLpTokenDialog({ open: false, token: null });
    setLockTokenDialog({ open: false, token: null });
    setUnstakeLpTokenDialog({ open: false, lock: null });
    setUnlockTokenDialog({ open: false, lock: null });
    setTopupLockDialog({
      open: false,
      token: null,
      currentLockAmount: null,
      maturityId: null,
      totalAccruingRewards: 0,
      baseApy: 0,
      maturityDate: null,
      tokenSymbol: null,
    });
    setClaimMaturedLockRewardsDialog({
      open: false,
      lockId: null,
      token: null,
    });
    setDepositK2TokenDialog({ open: false });

    if (action === null) return;

    /* Open dialogs if navigation to /my_holdings with action parameter */
    if (action === 'lock_kvcm') {
      setLockTokenDialog({ open: true, token: 'kvcm' });
    }
    if (action === 'lock_k2') {
      setDepositK2TokenDialog({ open: true });
    }
    if (action === 'lock_kvcm-k2') {
      setStakeLpTokenDialog({ open: true, token: 'kvcm-k2' });
    }
    if (action === 'lock_kvcm-usdc') {
      setStakeLpTokenDialog({ open: true, token: 'kvcm-usdc' });
    }
    if (action === 'topup') {
      setTopupLockDialog({
        open: true,
        token: 'kvcm',
        currentLockAmount: null,
        maturityId: null,
        totalAccruingRewards: 0,
        baseApy: 0,
        maturityDate: null,
        tokenSymbol: null,
      });
    }
    if (action === 'claim_matured_lock') {
      setClaimMaturedLockRewardsDialog({
        open: true,
        lockId: null,
        token: null,
      });
    }

    if (action.startsWith('unlock_token_')) {
      const id = action.split('_')[2];
      const lock = data?.locks.find((lock) => lock.id === id) ?? null;
      if (lock && (lock.token === 'kvcm' || lock.token === 'k2')) {
        setUnlockTokenDialog({ open: true, lock });
      } else if (lock && lock.token === 'kvcm-usdc') {
        setUnstakeLpTokenDialog({ open: true, lock });
      }
    }
  }, [
    searchParams,
    setLockTokenDialog,
    setStakeLpTokenDialog,
    setUnstakeLpTokenDialog,
    setUnlockTokenDialog,
    setTopupLockDialog,
    setDepositK2TokenDialog,
    setClaimMaturedLockRewardsDialog,
    data?.locks,
  ]);

  return (
    <>
      <Dialog
        open={lockTokenDialog.open}
        onClose={() => setLockTokenDialog({ open: false, token: null })}
      >
        <LockTokenFlow />
      </Dialog>
      <Dialog open={stakeLpTokenDialog.open}>
        <StakeLpTokenFlow />
      </Dialog>
      <Dialog open={unstakeLpTokenDialog.open}>
        <UnstakeLpTokenFlow />
      </Dialog>
      <Dialog open={unlockTokenDialog.open}>
        <UnlockTokenFlow />
      </Dialog>
      <Dialog
        open={topupLockDialog.open}
        onClose={() => setTopupLockDialog(resetTopupLockDialog())}
      >
        <TopupLockFlow />
      </Dialog>
      <Dialog open={claimMaturedLockRewardsDialog.open}>
        <ClaimMaturedLockRewardsDialog />
      </Dialog>
      <Dialog open={depositK2TokenDialog.open}>
        <DepositK2TokenFlow />
      </Dialog>
    </>
  );
};
