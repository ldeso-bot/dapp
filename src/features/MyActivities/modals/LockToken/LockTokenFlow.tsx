'use client';

import Steps from '@/shared/components/Steps/Steps';
import { DEFAULT_ALLOCATION_TOKEN } from '@/shared/constants/tokens.constants';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { lockTokenDialogAtom, LockTokenFields } from './lockToken.utils';
import { LockTokenForm } from './steps/LockTokenForm';

export default function LockTokenFlow() {
  const lockTokenDialog = useAtomValue(lockTokenDialogAtom);
  const token = lockTokenDialog.token ?? DEFAULT_ALLOCATION_TOKEN;

  const schema = z.object({
    token: z.string(),
    amount: z.coerce.number().gt(0, 'Amount must be a positive'),
    duration: z.coerce.number(),
    maturityId: z.coerce.number(),
    maturityDate: z.coerce.number(),
  });

  const form = useForm<LockTokenFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      token,
      amount: 0,
      duration: 365,
      maturityId: undefined,
      maturityDate: undefined,
    },
  });

  const parsedForm = useParsedForm(form, schema);
  return (
    <Steps components={[LockTokenForm]} data={{ form, schema, parsedForm }} />
  );
}
