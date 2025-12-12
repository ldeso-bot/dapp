'use client';

import Steps from '@/shared/components/Steps/Steps';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import UnstakeLpTokenConfirm from './steps/UnstakeLpTokenConfirm';
import UnstakeLpTokenForm from './steps/UnstakeLpTokenForm';
import {
  unstakeLpTokenDialogAtom,
  UnstakeLpTokenFields,
} from './unstakeLpToken.utils';

export default function StakeLpTokenFlow() {
  const unstakeLpTokenDialog = useAtomValue(unstakeLpTokenDialogAtom);

  const max = unstakeLpTokenDialog.lock?.lockedAmount ?? 0;
  // Form and schema are deffined at the flow level
  const schema = z.object({
    liquidityPositionId: z.string(),
    amount: z.coerce
      .number()
      .gt(0, 'Amount must be a positive integer')
      .max(max, `Amount cannot exceed ${max}`)
      .int('Amount must be a positive integer'),
  });
  const form = useForm<UnstakeLpTokenFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      liquidityPositionId: unstakeLpTokenDialog.lock?.id,
      amount: 0,
    },
  });
  const parsedForm = useParsedForm(form, schema);

  // Form is passed to each step (we could pass schema too)
  return (
    <Steps
      components={[UnstakeLpTokenForm, UnstakeLpTokenConfirm]}
      data={{ form, schema, parsedForm }}
    />
  );
}
