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

  const schema = z.object({
    token: z.string(),
    duration: z.coerce.number(),
    maturityId: z.coerce.number().optional(),
    maturityDate: z.coerce.number().optional(),
    amount: z.coerce
      .number()
      .gt(0, 'Amount must be a positive integer')
      .int('Amount must be a positive integer'),
  });

  const form = useForm<LockTokenFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 0,
      duration: 365,
      maturityId: undefined,
      maturityDate: undefined,
      token: lockTokenDialog.token ?? DEFAULT_ALLOCATION_TOKEN,
    },
  });

  const parsedForm = useParsedForm(form, schema);

  return (
    <Steps components={[LockTokenForm]} data={{ form, schema, parsedForm }} />
  );
}
