'use client';

import { useAtomValue } from 'jotai';
import { claimMaturedLockRewardsDialogAtom } from './claimKvcmLockRewards.utils';
import ClaimKvcmLockRewardsForm from './ClaimKvcmLockRewardsForm';

const ClaimMaturedLockRewardsDialog = () => {
  const { lockId, token } = useAtomValue(claimMaturedLockRewardsDialogAtom);

  if (!lockId) return null;

  return token === 'kvcm' ? (
    <ClaimKvcmLockRewardsForm lockId={lockId} />
  ) : (
    <>Not implemented</>
  );
};

export default ClaimMaturedLockRewardsDialog;
