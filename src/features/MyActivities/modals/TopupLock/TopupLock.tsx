'use client';

import Steps from '@/shared/components/Steps/Steps';
import { DEFAULT_LP_TOKEN } from '@/shared/constants/tokens.constants';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TopupLockForm } from './steps/TopupLockForm';
import { topupLockDialogAtom, TopupLockFields } from './topupLock.utils';

export default function TopupLockFlow() {
  const topupLockDialog = useAtomValue(topupLockDialogAtom);

  const schema = z.object({
    token: z.string(),
    currentLockAmount: z.number(),
    totalAccruingRewards: z.number(),
    baseApy: z.number(),
    maturityDate: z.number(),
    maturityId: z.number(),
    tokenSymbol: z.string(),
    amount: z.coerce
      .number()
      .gt(0, 'Amount must be greater than 0')
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
      maturityId: topupLockDialog.maturityId ?? 1,
      token: topupLockDialog.token ?? DEFAULT_LP_TOKEN,
      tokenSymbol: topupLockDialog.tokenSymbol ?? '',
    },
  });

  const parsedForm = useParsedForm(form, schema);
  return (
    <Steps components={[TopupLockForm]} data={{ form, schema, parsedForm }} />
  );
}
