import { atom } from 'jotai';

export const claimIncentivesDialogAtom = atom({
  open: false,
  claimableK2: 0 as number | null,
  accruedK2: 0 as number | null,
  accruingK2: 0 as number | null,
  claimableK2Usd: 0 as number | null,
});
