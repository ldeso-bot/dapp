import { StepProps } from '@/shared/components/Steps/Steps';
import { ONE_MONTH, ONE_YEAR } from '@/shared/constants/protocol.constants';
import { FC, RefObject } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ZodSchema } from 'zod';

export const MATURITY_DATES = [ONE_MONTH, ONE_YEAR] as const;

export const MATURITY_DATES_OPTIONS = [
  {
    value: ONE_MONTH,
    label: '1 month',
  },
  {
    value: 365,
    label: '1 year',
  },
];

export type MaturityDate = (typeof MATURITY_DATES)[number];

export type PurchaseBondFields = {
  token: string;
  amount: number;
  maturityDate: number;
};

type PurchaseBondData = {
  form: UseFormReturn<PurchaseBondFields>;
  schema: ZodSchema<PurchaseBondFields>;
  parsedForm: RefObject<PurchaseBondFields | null>;
};

export type PurchaseBondFC = FC<StepProps<PurchaseBondData>>;
