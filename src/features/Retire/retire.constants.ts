import { BadgeIcon } from '@/shared/components/Svg/BadgeIcon';
import { CarbonCreditsIcon } from '@/shared/components/Svg/CarbonCreditsIcon';
import { DocIcon } from '@/shared/components/Svg/DocIcon';
import { GlobeIcon } from '@/shared/components/Svg/GlobeIcon';
import { KvcmIcon } from '@/shared/components/Svg/KvcmIcon';
import { TokenInfo, tokens } from '@/shared/constants/tokens.constants';
import { createFlowItem, type StatItem } from '@/shared/utils/emptyState.utils';
import { isAddress } from 'viem';
import { z } from 'zod';

type PaymentOption = {
  token: TokenInfo;
  disabled: boolean;
  tooltip: string;
};

export const paymentOptions: PaymentOption[] = [
  {
    token: tokens.kvcm,
    tooltip: 'Pay with kVCM',
    disabled: false,
  },
  {
    token: tokens.usdc,
    tooltip: 'Coming soon',
    disabled: true,
  },
];

export const retireCarbonSchema = z.object({
  carbonClass: z.string(),
  carbonCredit: z.string(),
  paymentMethod: z.string(),
  amountTonnes: z.coerce.number().gt(0, 'Amount must be a positive'),
  priceQuotedWei: z.coerce.bigint(),
  beneficiaryName: z.string().min(1, 'Beneficiary name is required'),
  beneficiaryAddress: z
    .string()
    .optional()
    .refine(
      (val) => !val || isAddress(val),
      'Beneficiary address must be a valid Ethereum address'
    ),
  retirementMessage: z.string().min(1, 'Retirement message is required'),
  country: z.string().optional(),
  consumptionPeriodStart: z.string().optional(),
  consumptionPeriodEnd: z.string().optional(),
});

export type RetireCarbonFields = z.infer<typeof retireCarbonSchema>;

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
