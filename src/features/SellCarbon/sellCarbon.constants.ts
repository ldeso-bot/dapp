import { CarbonCreditsIcon } from '@/shared/components/Svg/CarbonCreditsIcon';
import { FairPricingIcon } from '@/shared/components/Svg/FairPricingIcon';
import { InstantLiquidityIcon } from '@/shared/components/Svg/InstantLiquidityIcon';
import { KvcmIcon } from '@/shared/components/Svg/KvcmIcon';
import { SwapHorizontalIcon } from '@/shared/components/Svg/SwapHorizontalIcon';
import type {
  BenefitCard,
  DocsCallout,
  StatItem,
} from '@/shared/utils/emptyState.utils';
import {
  createFlowItem,
  DEFAULT_DOCS_CALLOUT,
} from '@/shared/utils/emptyState.utils';
import { z } from 'zod';

interface CarbonPrice {
  id: number;
  category: string;
  type: string;
  priceUSD: number;
  changeUSD: number;
}

export const sellCarbonSchema = z.object({
  token: z.string(),
  carbonClass: z.string(),
  paymentMethod: z.string(),
  slippage: z.number(),
  amount: z.coerce
    .number()
    .gt(0, 'Amount must be a positive integer')
    .int('Amount must be a positive integer'),
});

// can remove once we read from api/subgraph
export const carbonPrices: CarbonPrice[] = [
  {
    id: 0,
    category: 'Removal',
    type: 'High Durability',
    priceUSD: 5.75,
    changeUSD: 4.5,
  },
  {
    id: 1,
    category: 'Removal',
    type: 'Biochar',
    priceUSD: 4.2,
    changeUSD: 0.0,
  },
  { id: 2, category: 'Removal', type: 'NBS', priceUSD: 3.85, changeUSD: -3.0 },
  { id: 3, category: 'Avoidance', type: 'NBS', priceUSD: 2.95, changeUSD: 1.7 },
  {
    id: 4,
    category: 'Avoidance',
    type: 'Energy Efficiency',
    priceUSD: 2.4,
    changeUSD: -3.2,
  },
];

export type SellCarbonFields = {
  carbonClass: string;
  token: string;
  amount: number;
  paymentMethod: string;
  slippage: number;
};

export const sellCarbonFlowItems = [
  createFlowItem(
    CarbonCreditsIcon,
    'Your Carbon Credits',
    'Carbon credits in your wallet.',
    0
  ),
  createFlowItem(
    SwapHorizontalIcon,
    'Sell to Protocol',
    'Choose class and amount.',
    1
  ),
  createFlowItem(KvcmIcon, 'Receive kVCM', 'Instant kVCM at market price.', 2),
];

const sellCarbonBenefitCards: BenefitCard[] = [
  {
    icon: CarbonCreditsIcon,
    title: 'Carbon Classes',
    description:
      'Sell into curated carbon credit baskets. Each class represents specific credit types like Biochar, Avoided Deforestation, or Ocean Alkalinity Enhancement.',
  },
  {
    icon: FairPricingIcon,
    title: 'Fair Pricing',
    description:
      'Prices reflect real market demand. Rates are transparent and publicly visible before you sell.',
  },
  {
    icon: InstantLiquidityIcon,
    title: 'Instant Liquidity',
    description:
      'Exchange your carbon credits directly with the protocol. No order books, no waiting - receive kVCM immediately.',
  },
];

export const sellCarbonInfoCardsSection = {
  title: 'Why Sell with Klima?',
  description:
    'Convert your carbon credits into kVCM with instant liquidity and transparent pricing.',
  cards: sellCarbonBenefitCards,
};

export const sellCarbonStats: StatItem[] = [
  {
    value: 'Instant',
    label:
      'No order books, no waiting - sell directly and receive kVCM immediately.',
  },
  {
    value: 'Transparent',
    label: 'Prices are public and reflect real market demand.',
  },
  {
    value: 'Curated',
    label: 'Sell into curated carbon credit categories.',
  },
];

export const sellCarbonDocsCallout: DocsCallout = {
  title: 'Learn About Carbon Classes & Governance',
  description:
    'Explore documentation on carbon class whitelisting, stakeholder governance, and how pricing is determined across the Klima ecosystem.',
  ...DEFAULT_DOCS_CALLOUT,
};
