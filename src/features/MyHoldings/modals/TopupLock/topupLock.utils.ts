import { AllocationToken } from '@/shared/constants/tokens.constants';
import { atom } from 'jotai';

export type TopupLockFields = {
  token: string;
  amount: number;
  tokenSymbol: string;
  currentLockAmount: number;
  totalAccruingRewards: number;
  baseApy: number;
  maturityDate: number;
  maturityId: number;
};

const topupLockDialogState = {
  open: false,
  token: null as AllocationToken | null,
  tokenSymbol: null as string | null,
  currentLockAmount: 0 as number | null,
  totalAccruingRewards: 0 as number | null,
  baseApy: 0 as number | null,
  maturityDate: null as number | null,
  maturityId: null as number | null,
};

export const topupLockDialogAtom = atom(topupLockDialogState);

export const resetTopupLockDialog = () => topupLockDialogState;
