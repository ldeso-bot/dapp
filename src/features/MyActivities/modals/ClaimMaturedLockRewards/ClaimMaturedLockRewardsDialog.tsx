'use client';

import { useAtomValue } from 'jotai';
import ClaimK2LockRewardsForm from './ClaimK2LockRewardsForm';
import { claimMaturedLockRewardsDialogAtom } from './claimKvcmLockRewards.utils';
import ClaimKvcmLockRewardsForm from './ClaimKvcmLockRewardsForm';
import ClaimLpLockRewardsForm from './ClaimLpLockRewardsForm';

const ClaimMaturedLockRewardsDialog = () => {
  const { lock } = useAtomValue(claimMaturedLockRewardsDialogAtom);

  if (!lock) return null;

  return lock.token === 'kvcm' ? (
    <ClaimKvcmLockRewardsForm lock={lock} />
  ) : lock.token === 'kvcm-usdc' || lock.token === 'kvcm-k2' ? (
    <ClaimLpLockRewardsForm lock={lock} />
  ) : lock.token === 'k2' ? (
    <ClaimK2LockRewardsForm lock={lock} />
  ) : null;
};

export default ClaimMaturedLockRewardsDialog;
