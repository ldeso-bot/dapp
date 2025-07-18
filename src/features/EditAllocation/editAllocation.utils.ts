import { Allocation } from '@/shared/models/walletData';
import { atom } from 'jotai';

export type EditAllocationFields = {
  allocationId: string;
  amount: number;
};

export const editAllocationDialogAtom = atom({
  open: false,
  allocation: null as Allocation | null,
});
