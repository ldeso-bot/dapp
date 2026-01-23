import { atom } from 'jotai';

export const claimKvcmLockRewardsDialogAtom = atom({
  open: false,
  lockId: null as number | null,
});
