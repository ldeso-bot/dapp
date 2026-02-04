'use client';

import Steps from '@/shared/components/Steps/Steps';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z, ZodNumber } from 'zod';
import UnlockK2TokenConfirm from './steps/UnlockK2TokenConfirm';
import UnlockK2TokenForm from './steps/UnlockK2TokenForm';
import { UnlockTokenFields } from './unlockK2Token.utils';

export default function UnlockK2TokenFlow() {
  const { data } = useWalletData();
  const lock = data?.locks.find((lock) => lock.token === 'k2') ?? null;

  // Form and schema are defined at the flow level
  const schemaObj: {
    amount: ZodNumber;
  } = {
    amount: z.coerce.number(),
  };
  const defaultValues: {
    amount: number;
  } = {
    amount: lock?.lockedAmount ?? 0,
  };

  const schema = z.object(schemaObj);

  const form = useForm<UnlockTokenFields>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const parsedForm = useParsedForm(form, schema);

  // Form is passed to each step
  return (
    <Steps
      components={[UnlockK2TokenForm, UnlockK2TokenConfirm]}
      data={{ form, schema, parsedForm }}
    />
  );
}
