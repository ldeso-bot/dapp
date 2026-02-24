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
import NewAllocationForm from './steps/NewAllocationForm';

export default function NewAllocationFlow() {
  const newAllocationDialog = useAtomValue(newAllocationDialogAtom);

  const schema = z
    .object({
      token: z.string(),
      amount: z.coerce.number().gt(0, 'Amount must be a positive integer'),
      carbonClass: z.string().min(1, 'Carbon class is required'),
      contractLockId: z.coerce.number().optional(),
    })
    .refine(
      (data) => {
        // For kVCM, contractLockId is required
        if (data.token === 'kvcm') {
          return data.contractLockId !== undefined && data.contractLockId > 0;
        }
        return true;
      },
      {
        message: 'Please select a lock',
        path: ['contractLockId'],
      }
    );
  const form = useForm<NewAllocationFields>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      token: newAllocationDialog.token ?? DEFAULT_ALLOCATION_TOKEN,
      amount: 0,
      carbonClass: '',
    },
  });
  const parsedForm = useParsedForm(form, schema);
  return (
    <Steps
      components={[NewAllocationForm]}
      data={{ form, schema, parsedForm }}
    />
  );
}
