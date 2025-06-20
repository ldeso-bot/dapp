import { ONE_MONTH, ONE_YEAR } from '@/shared/constants/protocol.constants';

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

export type PurchaseBondFields = {
  token: string;
  amount: number;
  maturityDate: number;
};
