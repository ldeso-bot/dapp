import { AllocatableToken } from '@/shared/constants/tokens.constants';
import { atom } from 'jotai';

export const sellCarbonDialogAtom = atom({
  open: false,
  token: null as AllocatableToken | null,
});
