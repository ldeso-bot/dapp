'use client';

import Steps from '@/shared/components/Steps/Steps';
import { DEFAULT_ALLOCATION_TOKEN } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { TopupLockForm } from './steps/TopupLockForm';
import { topupLockDialogAtom, TopupLockFields } from './topupLock.utils';

export default function TopupLockFlow() {
  const topupLockDialog = useAtomValue(topupLockDialogAtom);
  const { data: walletData } = useWalletData();
  const token = topupLockDialog.lock?.token ?? DEFAULT_ALLOCATION_TOKEN;
  const availableBalance = Number(walletData?.balances?.[token] ?? 0);

  const schema = z.object({
    token: z.string(),
    maturityId: z.number(),
    amount: z.coerce
      .number()
      .gt(0, 'Amount must be greater than 0')
      .lte(availableBalance, 'Amount exceeds available balance'),
  });

  const form = useForm<TopupLockFields>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      amount: 0,
      token: topupLockDialog.lock?.token ?? 'kvcm',
      maturityId: topupLockDialog.lock?.maturityId ?? 1,
    },
  });

  const parsedForm = useParsedForm(form, schema);
  return (
    <Steps components={[TopupLockForm]} data={{ form, schema, parsedForm }} />
  );
}
