'use client';

import Steps from '@/shared/components/Steps/Steps';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DepositK2TokenFields } from './depositK2Token.utils';
import { DepositK2TokenForm } from './steps/DepositK2TokenForm';

export default function DepositK2TokenFlow() {
  const schema = z.object({
    amount: z.coerce
      .number()
      .gt(0, 'Amount must be a positive integer')
      .int('Amount must be a positive integer'),
  });

  const form = useForm<DepositK2TokenFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 0,
    },
  });

  const parsedForm = useParsedForm(form, schema);
  return (
    <Steps
      components={[DepositK2TokenForm]}
      data={{ form, schema, parsedForm }}
    />
  );
}
