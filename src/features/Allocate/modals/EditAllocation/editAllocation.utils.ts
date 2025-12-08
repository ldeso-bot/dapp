import { Allocation } from '@/shared/models/walletData';
import { atom } from 'jotai';

export type EditAllocationFields = {
  amount: number;
  carbonClass: string;
  allocationId: string;
};

export const editAllocationDialogAtom = atom({
  open: false,
  allocation: null as Allocation | null,
});
