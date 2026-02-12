'use client';

import Steps from '@/shared/components/Steps/Steps';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { TopupLockForm } from './steps/TopupLockForm';
import {
  topupLockDialogAtom,
  TopupLockFields,
  topupLockSchema,
} from './topupLock.utils';

export default function TopupLockFlow() {
  const topupLockDialog = useAtomValue(topupLockDialogAtom);

  const schema = topupLockSchema;

  const form = useForm<TopupLockFields>({
    resolver: zodResolver(topupLockSchema),
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
