import { Lock } from '@/shared/models/walletData';
import { atom } from 'jotai';

export type UnlockTokenFields = {
  amount: number;
};

export const unlockK2TokenDialogAtom = atom({
  open: false,
  lock: null as Lock | null,
});
