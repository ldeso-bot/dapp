'use client';

import Steps from '@/shared/components/Steps/Steps';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  EditAllocationFields,
  editAllocationDialogAtom,
} from './editAllocation.utils';
import EditAllocationConfirm from './steps/EditAllocationConfirm';
import EditAllocationForm from './steps/EditAllocationForm';

export default function EditAllocationFlow() {
  const editAllocationDialog = useAtomValue(editAllocationDialogAtom);

  // Form and schema are deffined at the flow level
  const schema = z.object({
    allocationId: z.string(),
    amount: z.coerce
      .number()
      .gt(0, 'Amount must be a positive integer')
      .int('Amount must be a positive integer'),
  });
  const form = useForm<EditAllocationFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      allocationId: editAllocationDialog.allocation?.id,
      amount: editAllocationDialog.allocation?.amount ?? 0,
    },
  });
  const parsedForm = useParsedForm(form, schema);

  // Form is passed to each step (we could pass schema too)
  return (
    <Steps
      components={[EditAllocationForm, EditAllocationConfirm]}
      data={{ form, schema, parsedForm }}
    />
  );
}
