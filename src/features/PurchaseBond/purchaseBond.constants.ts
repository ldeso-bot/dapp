import { StepProps } from '@/shared/components/Steps/steps';
import { FC } from 'react';

type PurchaseBondData = null;

export type PurchaseBondFC = FC<StepProps<PurchaseBondData>>;

export const maturityDates = [
  {
    value: '30',
    label: '1 month',
  },
  {
    value: '365',
    label: '1 year',
  },
];
