import { LockableToken } from '@/shared/constants/tokens.constants';
import { atom } from 'jotai';

export const claimMaturedLockRewardsDialogAtom = atom({
  open: false,
  lockId: null as string | null,
  token: null as LockableToken | null,
});
