'use client';

import Steps from '@/shared/components/Steps/Steps';
import { DEFAULT_LP_TOKEN } from '@/shared/constants/tokens.constants';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import TopupLockConfirm from './steps/TopupLockConfirm';
import TopupLockForm from './steps/TopupLockForm';
import { topupLockDialogAtom, TopupLockFields } from './topupLock.utils';

export default function TopupLockFlow() {
  const topupLockDialog = useAtomValue(topupLockDialogAtom);

  const schema = z.object({
    token: z.string(),
    currentLockAmount: z.number(),
    totalAccruingRewards: z.number(),
    baseApy: z.number(),
    maturityDate: z.number(),
    tokenSymbol: z.string(),
    amount: z.coerce
      .number()
      .gt(0, 'Amount must be a positive integer')
      .int('Amount must be a positive integer'),
  });

  const form = useForm<TopupLockFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 0,
      currentLockAmount: topupLockDialog.currentLockAmount ?? 0,
      totalAccruingRewards: topupLockDialog.totalAccruingRewards ?? 0,
      baseApy: topupLockDialog.baseApy ?? 0,
      maturityDate: topupLockDialog.maturityDate ?? 0,
      token: topupLockDialog.token ?? DEFAULT_LP_TOKEN,
      tokenSymbol: topupLockDialog.tokenSymbol ?? '',
    },
  });
  const parsedForm = useParsedForm(form, schema);

  // Form is passed to each step (we could pass schema too)
  return (
    <Steps
      components={[TopupLockForm, TopupLockConfirm]}
      data={{ form, schema, parsedForm }}
    />
  );
}
