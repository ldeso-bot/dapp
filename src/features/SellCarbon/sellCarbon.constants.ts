import { CarbonCreditsIcon } from '@/shared/components/Svg/CarbonCreditsIcon';
import { FairPricingIcon } from '@/shared/components/Svg/FairPricingIcon';
import { InstantLiquidityIcon } from '@/shared/components/Svg/InstantLiquidityIcon';
import { KvcmIcon } from '@/shared/components/Svg/KvcmIcon';
import { SwapHorizontalIcon } from '@/shared/components/Svg/SwapHorizontalIcon';
import type {
  DocsCalloutProps,
  StatItem,
} from '@/shared/utils/emptyState.utils';
import {
  createFlowItem,
  DEFAULT_DOCS_CALLOUT,
} from '@/shared/utils/emptyState.utils';
import { z } from 'zod';

export const sellCarbonSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  carbonClass: z.string().min(1, 'Carbon class is required'),
  slippage: z.coerce.number(),
  amountToSellTonnes: z.coerce.number().gt(0, 'Amount must be positive'),
  kvcmOutQuoteWei: z.coerce.bigint(),
});

export type SellCarbonFields = {
  carbonClass: string;
  token: string;
  amountToSellTonnes: number;
  kvcmOutQuoteWei: bigint;
  slippage: number;
};

export const sellCarbonFlowItems = [
  createFlowItem(
    CarbonCreditsIcon,
    'Your carbon credits',
    'Carbon credits in your wallet.',
    0
  ),
  createFlowItem(
    SwapHorizontalIcon,
    'Supply to protocol',
    'Choose class and amount.',
    1
  ),
  createFlowItem(
    KvcmIcon,
    'Receive kVCM',
    'Instant exchange for your carbon credits',
    2
  ),
];

export const sellCarbonInfoCards = {
  title: 'Why supply to Klima Protocol?',
  description:
    'Convert your carbon credits into kVCM with instant liquidity and transparent pricing.',
  cards: [
    {
      icon: CarbonCreditsIcon,
      title: 'Carbon classes',
      description:
        'Supply into curated carbon credit baskets. Each class represents specific credit types like Biochar, Avoided Deforestation, or Ocean Alkalinity Enhancement.',
    },
    {
      icon: FairPricingIcon,
      title: 'Fair pricing',
      description:
        'Prices reflect real market demand. Rates are transparent and publicly visible before you supply your credits to Klima Protocol.',
    },
    {
      icon: InstantLiquidityIcon,
      title: 'Instant liquidity',
      description:
        'Exchange your carbon credits directly with the protocol. No order books, no waiting. Receive kVCM immediately.',
    },
  ],
};

export const sellCarbonStats: StatItem[] = [
  {
    value: 'Instant',
    label:
      'No order books, no waiting. Supply directly and receive kVCM immediately.',
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

export const sellCarbonDocsCallout: DocsCalloutProps = {
  title: 'Learn about carbon classes & governance',
  description:
    'Explore documentation on carbon class whitelisting, stakeholder governance, and how pricing is determined across the Klima Protocol ecosystem.',
  ...DEFAULT_DOCS_CALLOUT,
};
