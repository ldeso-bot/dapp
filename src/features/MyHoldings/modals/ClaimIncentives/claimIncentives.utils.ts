import { atom } from 'jotai';

export type ClaimIncentivesFields = {
  claimablePrincipal: number;
  totalAccruedRewards: number;
};

export const claimIncentivesDialogAtom = atom({
  open: false,
  claimablePrincipal: 0 as number | null,
  totalAccruedRewards: 0 as number | null,
});
