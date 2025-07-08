import KlimaXIcon from '@/shared/images/k2.svg';
import KVcmK2LPIcon from '@/shared/images/kvcm-k2.svg';
import KVcmUsdcLPIcon from '@/shared/images/kvcm-usdc.svg';
import KlimaIcon from '@/shared/images/kvcm.svg';
import USDCIcon from '@/shared/images/usdc.svg';
import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';
import Icon from '../components/Icon/Icon';

export type TokenInfo = {
  symbol: string;
  icon: (size?: number) => ReactNode;
  iconSrc: StaticImageData;
};

export type LpToken = 'kvcm-usdc' | 'kvcm-k2';
export type AllocationToken = 'k2' | 'kvcm';
export type Token = 'usdc' | AllocationToken | LpToken;

export const tokens: Record<Token, TokenInfo> = {
  usdc: {
    symbol: 'USDC',
    icon: (size = 1.6) => <Icon icon={USDCIcon} alt="USDC" size={size} />,
    iconSrc: USDCIcon,
  },
  k2: {
    symbol: 'K2',
    icon: (size = 1.6) => <Icon icon={KlimaXIcon} alt="K2" size={size} />,
    iconSrc: KlimaXIcon,
  },
  kvcm: {
    symbol: 'kVCM',
    icon: (size = 1.6) => <Icon icon={KlimaIcon} alt="kVCM" size={size} />,
    iconSrc: KlimaIcon,
  },
  'kvcm-usdc': {
    symbol: 'kVCM/USDC',
    icon: (size = 1.6) => (
      <Icon icon={KVcmUsdcLPIcon} alt="kVCM/USDC LP" size={size} />
    ),

    iconSrc: KVcmUsdcLPIcon,
  },
  'kvcm-k2': {
    symbol: 'kVCM/K2',
    icon: (size = 1.6) => (
      <Icon icon={KVcmK2LPIcon} alt="kVCM/K2 LP" size={size} />
    ),

    iconSrc: KVcmK2LPIcon,
  },
} as const;

export const DEFAULT_ALLOCATION_TOKEN = 'kvcm';
export const DEFAULT_LP_TOKEN = 'kvcm-k2';

export const lpTokens = {
  'kvcm-usdc': tokens['kvcm-usdc'],
  'kvcm-k2': tokens['kvcm-k2'],
} as const;

export const allocationTokens = {
  kvcm: tokens.kvcm,
  k2: tokens.k2,
} as const;
