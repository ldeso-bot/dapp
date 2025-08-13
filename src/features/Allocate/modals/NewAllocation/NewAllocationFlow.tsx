'use client';

import Steps from '@/shared/components/Steps/Steps';
import { DEFAULT_ALLOCATION_TOKEN } from '@/shared/constants/tokens.constants';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  newAllocationDialogAtom,
  NewAllocationFields,
} from './newAllocation.utils';
import NewAllocationConfirm from './steps/NewAllocationConfirm';
import NewAllocationForm from './steps/NewAllocationForm';

export default function NewAllocationFlow() {
  const newAllocationDialog = useAtomValue(newAllocationDialogAtom);

  // Form and schema are deffined at the flow level
  const schema = z.object({
    token: z.string(),
    amount: z.coerce
      .number()
      .gt(0, 'Amount must be a positive integer')
      .int('Amount must be a positive integer'),
    carbonClass: z.string().min(1, 'Carbon class is required'),
  });
  const form = useForm<NewAllocationFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      token: newAllocationDialog.token ?? DEFAULT_ALLOCATION_TOKEN,
      amount: 0,
      carbonClass: '',
    },
  });
  const parsedForm = useParsedForm(form, schema);

  // Form is passed to each step (we could pass schema too)
  return (
    <Steps
      components={[NewAllocationForm, NewAllocationConfirm]}
      data={{ form, schema, parsedForm }}
    />
  );
}
