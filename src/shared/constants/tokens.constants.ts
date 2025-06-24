import KlimaIcon from '@/shared/images/klima.svg';
import KlimaXIcon from '@/shared/images/klimax.svg';
import USDCIcon from '@/shared/images/usdc.svg';
import { StaticImageData } from 'next/image';

export type TokenInfo = {
  symbol: string;
  icon: StaticImageData;
};

export type Token = 'usdc' | 'klimax' | 'klima';

export const tokens: Record<Token, TokenInfo> = {
  usdc: {
    symbol: 'USDC',
    icon: USDCIcon,
  },
  klimax: {
    symbol: 'KlimaX',
    icon: KlimaXIcon,
  },
  klima: {
    symbol: 'KLIMA',
    icon: KlimaIcon,
  },
} as const;

export type TokenPair = 'klima/usdc' | 'klima/klimax';
