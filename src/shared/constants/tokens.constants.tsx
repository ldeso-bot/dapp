import KlimaIcon from '@/shared/images/klima.svg';
import KlimaXIcon from '@/shared/images/klimax.svg';
import USDCIcon from '@/shared/images/usdc.svg';
import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';
import Icon from '../components/Icon/Icon';
import TokenPair from '../components/TokenPair/TokenPair';

export type TokenInfo = {
  symbol: string;
  icon: (size?: number) => ReactNode;
  iconSrc: StaticImageData;
};

export type LpToken = 'kvcm/usdc' | 'kvcm/k2';
export type Token = 'usdc' | 'k2' | 'kvcm' | LpToken;

export const tokens: Record<Token, TokenInfo> = {
  usdc: {
    symbol: 'USDC',
    icon: (size = 16) => <Icon icon={USDCIcon} alt="USDC" size={size} />,
    iconSrc: USDCIcon,
  },
  k2: {
    symbol: 'K2',
    icon: (size = 16) => <Icon icon={KlimaXIcon} alt="KlimaX" size={size} />,
    iconSrc: KlimaXIcon,
  },
  kvcm: {
    symbol: 'kVCM',
    icon: (size = 16) => <Icon icon={KlimaIcon} alt="KlimaX" size={size} />,
    iconSrc: KlimaIcon,
  },
  'kvcm/usdc': {
    symbol: 'kVCM/USDC',
    icon: (size = 16) => (
      <TokenPair token1={KlimaIcon} token2={USDCIcon} size={size} />
    ),
    iconSrc: KlimaIcon,
  },
  'kvcm/k2': {
    symbol: 'kVCM/K2',
    icon: (size = 16) => (
      <TokenPair token1={KlimaIcon} token2={KlimaXIcon} size={size} />
    ),
    iconSrc: KlimaIcon,
  },
} as const;

export const lpTokens = {
  'kvcm/usdc': tokens['kvcm/usdc'],
  'kvcm/k2': tokens['kvcm/k2'],
} as const;
