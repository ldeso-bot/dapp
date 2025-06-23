'use client';

import Steps from '@/shared/components/Steps/Steps';
import { tokens } from '@/shared/constants/tokens.constants';
import { useParsedForm } from '@/shared/hooks/web3/useParsedForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { MATURITY_DATES, PurchaseBondFields } from './purchaseBond.constants';
import { zodMaturityDate } from './PurchaseBond.utils';
import PurchaseBondConfirm from './steps/PurchaseBondConfirm';
import PurchaseBondForm from './steps/PurchaseBondForm';

export default function PurchaseBondFlow() {
  // Form and schema are deffined at the flow level
  const schema = z.object({
    token: z.string(),
    amount: z.coerce
      .number()
      .gt(0, 'Amount must be a positive integer')
      .int('Amount must be a positive integer'),
    maturityDate: zodMaturityDate,
  });
  const form = useForm<PurchaseBondFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      token: tokens.klima.symbol,
      amount: 0,
      maturityDate: MATURITY_DATES[0],
    },
  });
  const parsedForm = useParsedForm(form, schema);

  // Form is passed to each step (we could pass schema too)
  return (
    <Steps
      components={[PurchaseBondForm, PurchaseBondConfirm]}
      data={{ form, schema, parsedForm }}
    />
  );
}
