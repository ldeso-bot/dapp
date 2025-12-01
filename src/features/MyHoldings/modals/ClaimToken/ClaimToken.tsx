'use client';

import Steps from '@/shared/components/Steps/Steps';
import { DEFAULT_ALLOCATION_TOKEN } from '@/shared/constants/tokens.constants';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { claimTokenDialogAtom, ClaimTokenFields } from './claimToken.utils';
import ClaimTokenForm from './steps/ClaimTokenForm';

export default function ClaimTokenFlow() {
  const claimTokenDialog = useAtomValue(claimTokenDialogAtom);

  // Form and schema are deffined at the flow level
  const schema = z.object({
    token: z.string(),
    amount: z.coerce.number(),
  });

  const form = useForm<ClaimTokenFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 0,
      token: claimTokenDialog.token ?? DEFAULT_ALLOCATION_TOKEN,
    },
  });

  const parsedForm = useParsedForm(form, schema);

  // Form is passed to each step (we could pass schema too)
  return (
    <Steps components={[ClaimTokenForm]} data={{ form, schema, parsedForm }} />
  );
}
