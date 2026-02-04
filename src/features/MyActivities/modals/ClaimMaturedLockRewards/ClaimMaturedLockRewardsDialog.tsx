'use client';

import { useAtomValue } from 'jotai';
import { claimMaturedLockRewardsDialogAtom } from './claimKvcmLockRewards.utils';
import ClaimKvcmLockRewardsForm from './ClaimKvcmLockRewardsForm';
import ClaimLpLockRewardsForm from './ClaimLpLockRewardsForm';

const ClaimMaturedLockRewardsDialog = () => {
  const { lockId, token } = useAtomValue(claimMaturedLockRewardsDialogAtom);

  if (!lockId) return null;

  return token === 'kvcm' ? (
    <ClaimKvcmLockRewardsForm lockId={lockId} />
  ) : (
    <ClaimLpLockRewardsForm lockId={lockId} />
  );
};

export default ClaimMaturedLockRewardsDialog;
