import { atom } from 'jotai';

export type KycSource =
  | 'lock_kvcm'
  | 'stake_lp'
  | 'deposit_k2'
  | 'allocate_kvcm'
  | 'allocate_k2'
  | 'test';

export type KycPath = 'kyc' | null;

export const kycDialogAtom = atom<{
  open: boolean;
  source: KycSource | null;
}>({
  open: false,
  source: null,
});

/** Set by useHasKycVerification so KycModal can trigger refetch after successful verification. */
export const kycRefetchAtom = atom<(() => void) | null>(null);
