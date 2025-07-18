import { Lock } from '@/shared/models/walletData';
import { atom } from 'jotai';

export type UnlockTokenFields = {
  proportional: boolean;
  options: Record<string, boolean>;
};

export const unlockTokenDialogAtom = atom({
  open: false,
  lock: null as Lock | null,
});

export const tooltip =
  'As part of our KlimaX Incentives program, we’re rewarding your contribution with some of our governance token. Learn more';
