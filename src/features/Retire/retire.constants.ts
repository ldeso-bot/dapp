import { z } from 'zod';

interface CarbonPrice {
  id: number;
  category: string;
  type: string;
  priceUSD: number;
  changeUSD: number;
}

export const retireCarbonSchema = z.object({
  carbonClass: z.string(),
  carbonCredit: z.string(),
  paymentMethod: z.string(),
  amount: z.coerce
    .number()
    .gt(0, 'Amount must be a positive integer')
    .int('Amount must be a positive integer'),
});

export const carbonPrices: CarbonPrice[] = [
  { id: 0, category: 'Removal', type: 'High Durability', priceUSD: 5.75, changeUSD: 4.5 },
  { id: 1, category: 'Removal', type: 'Biochar', priceUSD: 4.20, changeUSD: 0.0 },
  { id: 2, category: 'Removal', type: 'NBS', priceUSD: 3.85, changeUSD: -3.0 },
  { id: 3, category: 'Avoidance', type: 'NBS', priceUSD: 2.95, changeUSD: 1.7 },
  { id: 4, category: 'Avoidance', type: 'Energy Efficiency', priceUSD: 2.40, changeUSD: -3.2 },
];

export type RetireCarbonFields = {
  carbonClass: string;
  carbonCredit: string;
  amount: number;
  paymentMethod: string;
};