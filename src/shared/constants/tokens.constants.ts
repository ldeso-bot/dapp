import KlimaIcon from '@/shared/images/klima.svg';
import KlimaXIcon from '@/shared/images/klimax.svg';
import USDCIcon from '@/shared/images/usdc.svg';

export type ImageMetadata = {
  src: string;
};
export type TokenInfo = {
  symbol: string;
  icon: ImageMetadata;
};

export const tokens: Record<string, TokenInfo> = {
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
};

export type Token = keyof typeof tokens;
