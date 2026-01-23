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
import EditAllocationForm from './steps/EditAllocationForm';

export default function EditAllocationFlow() {
  const editAllocationDialog = useAtomValue(editAllocationDialogAtom);

  const schema = z.object({
    carbonClass: z.string(),
    allocationId: z.string(),
    amount: z.coerce
      .number()
      .gte(0, 'Amount must be 0 or greater')
      .int('Amount must be an integer'),
  });
  const form = useForm<EditAllocationFields>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      carbonClass: editAllocationDialog.allocation?.carbonClass,
      allocationId: editAllocationDialog.allocation?.id,
      amount: editAllocationDialog.allocation?.amount ?? 0,
    },
  });

  const parsedForm = useParsedForm(form, schema);
  return (
    <Steps
      components={[EditAllocationForm]}
      data={{ form, schema, parsedForm }}
    />
  );
}
