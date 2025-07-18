'use client';

import Steps from '@/shared/components/Steps/Steps';
import { DEFAULT_LP_TOKEN } from '@/shared/constants/tokens.constants';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { MATURITY_DATES } from '@/shared/utils/protocol.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  stakeLpTokenDialogAtom,
  StakeLpTokenFields,
} from './stakeLpToken.utils';
import StakeLpTokenConfirm from './steps/StakeLpTokenConfirm';
import StakeLpTokenForm from './steps/StakeLpTokenForm';

export default function StakeLpTokenFlow() {
  const stakeLpTokenDialog = useAtomValue(stakeLpTokenDialogAtom);
  // Form and schema are deffined at the flow level
  const schema = z.object({
    token: z.string(),
    amount: z.coerce
      .number()
      .gt(0, 'Amount must be a positive integer')
      .int('Amount must be a positive integer'),
    maturityDate: z.coerce.number(),
  });
  const form = useForm<StakeLpTokenFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      token: stakeLpTokenDialog.token ?? DEFAULT_LP_TOKEN,
      amount: 0,
      maturityDate: MATURITY_DATES[0],
    },
  });
  const parsedForm = useParsedForm(form, schema);

  // Form is passed to each step (we could pass schema too)
  return (
    <Steps
      components={[StakeLpTokenForm, StakeLpTokenConfirm]}
      data={{ form, schema, parsedForm }}
    />
  );
}
