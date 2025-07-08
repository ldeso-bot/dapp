import { LpToken } from '@/shared/constants/tokens.constants';
import { atom } from 'jotai';

export type StakeLpTokenFields = {
  token: string;
  amount: number;
  maturityDate: number;
};

export const stakeLpTokenDialogAtom = atom({
  open: false,
  token: null as LpToken | null,
});
