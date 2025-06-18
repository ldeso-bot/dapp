import { StepProps } from '@/shared/components/Steps/steps';
import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

export const MATURITY_DATES = ['1m', '1y'] as const;

export const MATURITY_DATES_OPTIONS = [
  {
    value: '1m',
    label: '1 month',
  },
  {
    value: '1y',
    label: '1 year',
  },
];

export type MaturityDate = (typeof MATURITY_DATES)[number];

export type PurchaseBondFields = {
  token: string;
  amount: number;
  maturityDate: MaturityDate;
};

type PurchaseBondData = {
  form: UseFormReturn<PurchaseBondFields>;
};

export type PurchaseBondFC = FC<StepProps<PurchaseBondData>>;
