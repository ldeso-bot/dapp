import { Lock } from '@/shared/models/walletData';
import { atom } from 'jotai';
import z from 'zod';

export const topupLockSchema = z.object({
  token: z.string(),
  maturityId: z.number(),
  amount: z.coerce.number().gt(0, 'Amount must be greater than 0'),
});

export type TopupLockFields = z.infer<typeof topupLockSchema>;

const topupLockDialogState = {
  open: false,
  lock: null as Lock | null,
};

export const topupLockDialogAtom = atom(topupLockDialogState);

export const resetTopupLockDialog = () => topupLockDialogState;
