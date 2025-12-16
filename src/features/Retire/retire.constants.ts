import { BadgeIcon } from '@/shared/components/Svg/BadgeIcon';
import { CarbonCreditsIcon } from '@/shared/components/Svg/CarbonCreditsIcon';
import { DocIcon } from '@/shared/components/Svg/DocIcon';
import { GlobeIcon } from '@/shared/components/Svg/GlobeIcon';
import { KvcmIcon } from '@/shared/components/Svg/KvcmIcon';
import { tokens } from '@/shared/constants/tokens.constants';
import {
  BenefitCard,
  createFlowItem,
  StatItem,
} from '@/shared/utils/emptyState.utils';
import { z } from 'zod';

interface CarbonPrice {
  id: number;
  category: string;
  type: string;
  priceUSD: number;
  changeUSD: number;
}

export type RetireCarbonFields = {
  carbonClass: string;
  carbonCredit: string;
  amount: number;
  paymentMethod: string;
};

export const paymentOptions = [
  {
    icon: tokens.kvcm.iconSrc,
    label: 'KVCM',
    value: 'kvcm',
  },
  {
    icon: tokens.usdc.iconSrc,
    label: 'USDC',
    value: 'usdc',
  },
];

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

export const retireCarbonFlowItems = [
  createFlowItem(KvcmIcon, 'Your kVCM', 'kVCM tokens in your wallet.', 0),
  createFlowItem(
    BadgeIcon,
    'Retire Credits',
    'Select and retire carbon credits.',
    1
  ),
  createFlowItem(
    GlobeIcon,
    'Climate Impact',
    'Verifiable proof of your contribution.',
    2
  ),
];

export const retireCarbonStats: StatItem[] = [
  {
    value: 'Permanent',
    label: 'Credits are permanently retired, never resold.',
  },
  {
    value: 'Verifiable',
    label: 'Blockchain-secured proof via Carbonmark.',
  },
  {
    value: 'Impactful',
    label: 'Real climate action with verified impact.',
  },
];

const retireCarbonBenefitCards: BenefitCard[] = [
  {
    icon: BadgeIcon,
    title: 'Blockchain-Verified',
    description:
      'Receive a proof-of-retirement certificate that is publicly verifiable and blockchain-secured via Carbonmark.',
  },
  {
    icon: DocIcon,
    title: 'Public Beneficiary Details',
    description:
      'Connect the certificate to yourself or your enterprise by publishing public beneficiary details.',
  },
  {
    icon: CarbonCreditsIcon,
    title: 'Diverse Selection',
    description:
      'Choose from a wide selection of carbon credits, vintages, and methodologies.',
  },
];

export const retireCarbonInfoCardsSection = {
  title: 'Why Retire with Klima?',
  description:
    'Retire carbon credits to permanently offset emissions and receive verifiable proof of your climate action.',
  cards: retireCarbonBenefitCards,
};
