import { AllocationToken } from '@/shared/constants/tokens.constants';
import { atom } from 'jotai';

export type ClaimTokenFields = {
  token: string;
  amount: number;
};

export const claimTokenDialogAtom = atom({
  open: false,
  token: null as AllocationToken | null,
  amount: 0 as number | null,
});
