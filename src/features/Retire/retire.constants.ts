import { BadgeIcon } from '@/shared/components/Svg/BadgeIcon';
import { CarbonCreditsIcon } from '@/shared/components/Svg/CarbonCreditsIcon';
import { DocIcon } from '@/shared/components/Svg/DocIcon';
import { GlobeIcon } from '@/shared/components/Svg/GlobeIcon';
import { KvcmIcon } from '@/shared/components/Svg/KvcmIcon';
import { tokens } from '@/shared/constants/tokens.constants';
import { createFlowItem, type StatItem } from '@/shared/utils/emptyState.utils';
import { z } from 'zod';

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

export const retireCarbonInfoCards = {
  title: 'Why Retire with Klima?',
  description:
    'Retire carbon credits to permanently offset emissions and receive verifiable proof of your climate action.',
  cards: [
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
  ],
};
