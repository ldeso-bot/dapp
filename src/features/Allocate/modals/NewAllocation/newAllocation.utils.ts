import { AllocatableToken } from '@/shared/constants/tokens.constants';
import { atom } from 'jotai';

export type NewAllocationFields = {
  token: string;
  amount: number;
  carbonClass: string;
};

export const newAllocationDialogAtom = atom({
  open: false,
  token: null as AllocatableToken | null,
});
