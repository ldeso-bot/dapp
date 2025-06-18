'use client';

import Steps from '@/shared/components/Steps/steps';
import { tokens } from '@/shared/constants/tokens.constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { MATURITY_DATES, PurchaseBondFields } from './purchaseBond.constants';
import PurchaseBondConfirm from './steps/PurchaseBondConfirm';
import PurchaseBondForm from './steps/PurchaseBondForm';

export default function PurchaseBondFlow() {
  const schema = z.object({
    token: z.string(),
    amount: z.coerce.number().gt(0),
    maturityDate: z.enum(MATURITY_DATES),
  });
  const form = useForm<PurchaseBondFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      token: tokens.klima.symbol,
      amount: 10,
      maturityDate: MATURITY_DATES[0],
    },
  });
  return (
    <Steps
      components={[PurchaseBondForm, PurchaseBondConfirm]}
      data={{ form }}
    />
  );
}
