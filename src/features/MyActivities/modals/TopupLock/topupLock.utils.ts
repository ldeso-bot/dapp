import { Lock } from '@/shared/models/walletData';
import { atom } from 'jotai';

export type TopupLockFields = {
  token: string;
  amount: number;
  maturityId: number;
};

const topupLockDialogState = {
  open: false,
  lock: null as Lock | null,
};

export const topupLockDialogAtom = atom(topupLockDialogState);

export const resetTopupLockDialog = () => topupLockDialogState;
