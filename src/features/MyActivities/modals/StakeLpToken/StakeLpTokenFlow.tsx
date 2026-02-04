'use client';

import Steps from '@/shared/components/Steps/Steps';
import { DEFAULT_LP_TOKEN } from '@/shared/constants/tokens.constants';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  stakeLpTokenDialogAtom,
  StakeLpTokenFields,
} from './stakeLpToken.utils';
import { StakeLpTokenForm } from './steps/StakeLpTokenForm';

export default function StakeLpTokenFlow() {
  const stakeLpTokenDialog = useAtomValue(stakeLpTokenDialogAtom);

  const schema = z.object({
    token: z.string(),
    duration: z.coerce.number(),
    maturityId: z.coerce.number().optional(),
    maturityDate: z.coerce.number().optional(),
    amount: z.coerce
      .number()
      .gt(0, 'Amount must be a positive number')
      .finite('Amount must be a valid number'),
  });

  const form = useForm<StakeLpTokenFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      token: stakeLpTokenDialog.token ?? DEFAULT_LP_TOKEN,
      amount: 0,
      duration: 365,
      maturityId: undefined,
      maturityDate: undefined,
    },
  });

  const parsedForm = useParsedForm(form, schema);
  return (
    <Steps
      components={[StakeLpTokenForm]}
      data={{ form, schema, parsedForm }}
    />
  );
}
