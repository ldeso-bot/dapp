import { LiquidityPosition } from '@/shared/models/walletData';
import { atom } from 'jotai';

export type UnstakeLpTokenFields = {
  liquidityPositionId: string;
  amount: number;
};

export const unstakeLpTokenDialogAtom = atom({
  open: false,
  liquidityPosition: null as LiquidityPosition | null,
});

export const tooltip =
  'As part of our KlimaX Incentives program, we’re rewarding your contribution with some of our governance token. Learn more';
