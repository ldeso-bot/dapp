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
    tooltip: 'Pay with kVCM [t092]',
    disabled: false,
  },
  {
    token: tokens.usdc,
    tooltip: 'Pay with USDC [t093]',
    disabled: false,
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
  createFlowItem(KvcmIcon, 'Your kVCM [t094]', 'kVCM tokens in your wallet. [t095]', 0),
  createFlowItem(
    BadgeIcon,
    'Retire credits [t096]',
    'Select and retire carbon credits. [t097]',
    1
  ),
  createFlowItem(
    GlobeIcon,
    'Climate impact [t098]',
    'Verifiable proof of your contribution. [t099]',
    2
  ),
];

export const retireCarbonStats: StatItem[] = [
  {
    value: 'Permanent [t100]',
    label: 'Credits are permanently retired, never resold. [t101]',
  },
  {
    value: 'Verifiable [t102]',
    label: 'Blockchain-secured proof via Carbonmark. [t103]',
  },
  {
    value: 'Impactful [t104]',
    label: 'Real climate action with verified impact. [t105]',
  },
];

export const retireCarbonInfoCards = {
  title: 'Why retire with Klima? [t106]',
  description:
    'Retire carbon credits to permanently offset emissions and receive verifiable proof of your climate action. [t107]',
  cards: [
    {
      icon: BadgeIcon,
      title: 'Blockchain-verified [t108]',
      description:
        'Receive a proof-of-retirement certificate that is publicly verifiable and blockchain-secured via Carbonmark. [t109]',
    },
    {
      icon: DocIcon,
      title: 'Public beneficiary details [t110]',
      description:
        'Connect the certificate to yourself or your enterprise by publishing public beneficiary details. [t111]',
    },
    {
      icon: CarbonCreditsIcon,
      title: 'Diverse selection [t112]',
      description:
        'Choose from a wide selection of carbon credits, vintages, and methodologies. [t113]',
    },
  ],
};
