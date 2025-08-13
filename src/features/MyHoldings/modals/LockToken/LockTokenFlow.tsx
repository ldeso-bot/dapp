'use client';

import Steps from '@/shared/components/Steps/Steps';
import { DEFAULT_ALLOCATION_TOKEN } from '@/shared/constants/tokens.constants';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { MATURITY_DATES } from '@/shared/utils/protocol.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { lockTokenDialogAtom, LockTokenFields } from './lockToken.utils';
import LockTokenConfirm from './steps/LockTokenConfirm';
import LockTokenForm from './steps/LockTokenForm';

export default function LockTokenFlow() {
  const lockTokenDialog = useAtomValue(lockTokenDialogAtom);
  // Form and schema are deffined at the flow level
  const schema = z.object({
    token: z.string(),
    amount: z.coerce
      .number()
      .gt(0, 'Amount must be a positive integer')
      .int('Amount must be a positive integer'),
    maturityDate: z.coerce.number(),
  });
  const form = useForm<LockTokenFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      token: lockTokenDialog.token ?? DEFAULT_ALLOCATION_TOKEN,
      amount: 0,
      maturityDate: MATURITY_DATES[0],
    },
  });
  const parsedForm = useParsedForm(form, schema);

  // Form is passed to each step (we could pass schema too)
  return (
    <Steps
      components={[LockTokenForm, LockTokenConfirm]}
      data={{ form, schema, parsedForm }}
    />
  );
}
