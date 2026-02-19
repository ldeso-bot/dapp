'use client';

import { useHasKycVerification } from '@/features/Kyc/useHasKycVerification';
import Dialog from '@/shared/components/Dialog/Dialog';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useClearActionParam } from '@/shared/hooks/useClearActionParam';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { claimMaturedLockRewardsDialogAtom } from './ClaimMaturedLockRewards/claimKvcmLockRewards.utils';
import ClaimMaturedLockRewardsDialog from './ClaimMaturedLockRewards/ClaimMaturedLockRewardsDialog';
import { depositK2TokenDialogAtom } from './DepositK2Token/depositK2Token.utils';
import DepositK2TokenFlow from './DepositK2Token/DepositK2TokenFlow';
import { lockTokenDialogAtom } from './LockToken/lockToken.utils';
import LockTokenFlow from './LockToken/LockTokenFlow';
import TopupLockFlow from './TopupLock/TopupLock';
import {
  resetTopupLockDialog,
  topupLockDialogAtom,
} from './TopupLock/topupLock.utils';
import { unlockK2TokenDialogAtom } from './UnlockK2Token/unlockK2Token.utils';
import UnlockK2TokenFlow from './UnlockK2Token/UnlockK2TokenFlow';

export const MyActivitiesModals = () => {
  const searchParams = useSearchParams();
  const { data } = useWalletData();
  const clearActionParam = useClearActionParam();

  // tracks previous dialog state to detect when a dialog closes
  const prevHasOpenDialogRef = useRef(false);
  const [lockTokenDialog, setLockTokenDialog] = useAtom(lockTokenDialogAtom);

  const [unlockK2TokenDialog, setUnlockK2TokenDialog] = useAtom(
    unlockK2TokenDialogAtom
  );
  const [topupLockDialog, setTopupLockDialog] = useAtom(topupLockDialogAtom);
  const [depositK2TokenDialog, setDepositK2TokenDialog] = useAtom(
    depositK2TokenDialogAtom
  );
  const [claimMaturedLockRewardsDialog, setClaimMaturedLockRewardsDialog] =
    useAtom(claimMaturedLockRewardsDialogAtom);
  const { openKycOrProceed } = useHasKycVerification();

  useEffect(() => {
    const hasOpenDialog =
      lockTokenDialog.open ||
      unlockK2TokenDialog.open ||
      topupLockDialog.open ||
      claimMaturedLockRewardsDialog.open ||
      depositK2TokenDialog.open;

    const shouldRemoveActionParam =
      !hasOpenDialog &&
      prevHasOpenDialogRef.current &&
      searchParams.get('action');

    if (shouldRemoveActionParam) {
      clearActionParam({ scroll: false });
    }
    // tracks current state for next render to detect dialog close
    prevHasOpenDialogRef.current = hasOpenDialog;
  }, [
    lockTokenDialog.open,
    unlockK2TokenDialog.open,
    topupLockDialog.open,
    claimMaturedLockRewardsDialog.open,
    depositK2TokenDialog.open,
    searchParams,
    clearActionParam,
  ]);

  useEffect(() => {
    const action = searchParams.get('action');

    /* Close dialogs if navigation to /my_holdings with empty action parameter */
    setLockTokenDialog({ open: false, token: null });
    setUnlockK2TokenDialog({ open: false, lock: null });
    setTopupLockDialog({
      open: false,
      lock: null,
    });
    setClaimMaturedLockRewardsDialog({
      open: false,
      lock: null,
    });
    setDepositK2TokenDialog({ open: false });

    if (action === null) return;

    if (action === 'lock_kvcm') {
      openKycOrProceed('lock_kvcm', () =>
        setLockTokenDialog({ open: true, token: 'kvcm' })
      );
      return;
    }
    if (action === 'lock_k2') {
      openKycOrProceed('deposit_k2', () =>
        setDepositK2TokenDialog({ open: true })
      );
      return;
    }
    if (action === 'lock_kvcm-k2') {
      openKycOrProceed('stake_lp', () =>
        setLockTokenDialog({ open: true, token: 'kvcm-k2' })
      );
      return;
    }
    if (action === 'lock_kvcm-usdc') {
      openKycOrProceed('stake_lp', () =>
        setLockTokenDialog({ open: true, token: 'kvcm-usdc' })
      );
      return;
    }
    if (action === 'topup') {
      const id = action.split('_')[2];
      const lock = data?.locks.find((lock) => lock.id === id) ?? null;
      setTopupLockDialog({
        open: true,
        lock,
      });
    }
    if (action === 'claim_matured_lock') {
      setClaimMaturedLockRewardsDialog({
        open: true,
        lock: null,
      });
    }

    if (action.startsWith('unlock_token_')) {
      const id = action.split('_')[2];
      const lock = data?.locks.find((lock) => lock.id === id) ?? null;
      if (lock) {
        if (lock.token === 'k2') {
          setUnlockK2TokenDialog({ open: true, lock });
        } else {
          setClaimMaturedLockRewardsDialog({
            open: true,
            lock,
          });
        }
      }
    }
  }, [
    searchParams,
    setLockTokenDialog,
    setUnlockK2TokenDialog,
    setClaimMaturedLockRewardsDialog,
    setTopupLockDialog,
    setDepositK2TokenDialog,
    data?.locks,
    openKycOrProceed,
  ]);

  return (
    <>
      <Dialog
        open={lockTokenDialog.open}
        onClose={() => setLockTokenDialog({ open: false, token: null })}
      >
        <LockTokenFlow />
      </Dialog>
      <Dialog open={unlockK2TokenDialog.open}>
        <UnlockK2TokenFlow />
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
