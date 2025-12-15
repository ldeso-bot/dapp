import { HoldingsTabValue } from '@/features/MyHoldings/constants/tab.constants';
import KlimaXIcon from '@/shared/images/k2.svg';
import KVcmK2LPIcon from '@/shared/images/kvcm-k2.svg';
import KVcmUsdcLPIcon from '@/shared/images/kvcm-usdc.svg';
import KlimaIcon from '@/shared/images/kvcm.svg';
import USDCIcon from '@/shared/images/usdc.svg';
import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';
import Icon from '../components/Icon/Icon';

export type LpToken = 'kvcm-usdc' | 'kvcm-k2';
export type AllocationToken = 'k2' | 'kvcm';
export type AllocatableToken = 'k2' | 'kvcm' | 'kvcm-usdc';
export type LockableToken = 'k2' | 'kvcm' | 'kvcm-usdc' | 'kvcm-k2';
export type Token = 'usdc' | 'k2' | 'kvcm' | 'kvcm-usdc' | 'kvcm-k2';
export type SubgraphTokenSymbol =
  | 'K2'
  | 'KVCM'
  | 'KVCM_USDC_LP'
  | 'KVCM_K2_LP'
  | 'USDC';

/**
 * Decimals for the Aerodrome liquidity tokens
 * This is not really important as long that it is consistent across liquidity values
 * It helps to display the liquidity values nicely though...
 */
export const AERODROME_LIQUIDITY_DECIMALS = 12;

export type TokenInfo = {
  id: Token;
  symbol: string;
  subgraphSymbol: SubgraphTokenSymbol;
  icon: (size?: number) => ReactNode;
  iconSrc: StaticImageData;
  description: string;
  lockDescription: string;
  holdingsTab?: HoldingsTabValue;
  decimals: number;
};

export const tokens: Record<Token, TokenInfo> = {
  usdc: {
    id: 'usdc',
    symbol: 'USDC',
    icon: (size = 1.6) => <Icon icon={USDCIcon} alt="USDC" size={size} />,
    iconSrc: USDCIcon,
    subgraphSymbol: 'USDC',
    description: 'USDC',
    lockDescription: '',
    decimals: 6,
  },
  k2: {
    id: 'k2',
    symbol: 'K2',
    icon: (size = 1.6) => <Icon icon={KlimaXIcon} alt="K2" size={size} />,
    iconSrc: KlimaXIcon,
    subgraphSymbol: 'K2',
    description: 'K2 Token',
    lockDescription: 'K2 lock',
    holdingsTab: 'k2',
    decimals: 18,
  },
  kvcm: {
    id: 'kvcm',
    symbol: 'kVCM',
    icon: (size = 1.6) => <Icon icon={KlimaIcon} alt="kVCM" size={size} />,
    iconSrc: KlimaIcon,
    subgraphSymbol: 'KVCM',
    description: 'KVCM Token',
    lockDescription: 'kVCM lock',
    holdingsTab: 'kvcm',
    decimals: 18,
  },
  'kvcm-usdc': {
    id: 'kvcm-usdc',
    symbol: 'kVCM/USDC',
    icon: (size = 1.6) => (
      <Icon icon={KVcmUsdcLPIcon} alt="kVCM/USDC LP" size={size} />
    ),
    iconSrc: KVcmUsdcLPIcon,
    subgraphSymbol: 'KVCM_USDC_LP',
    description: 'KVCM/USDC Liquidity Pool',
    lockDescription: 'LP stake',
    holdingsTab: 'liquidity',
    decimals: AERODROME_LIQUIDITY_DECIMALS,
  },
  'kvcm-k2': {
    id: 'kvcm-k2',
    symbol: 'kVCM/K2',
    icon: (size = 1.6) => (
      <Icon icon={KVcmK2LPIcon} alt="kVCM/K2 LP" size={size} />
    ),
    subgraphSymbol: 'KVCM_K2_LP',
    iconSrc: KVcmK2LPIcon,
    description: 'KVCM/K2 Liquidity Pool',
    lockDescription: 'LP stake',
    holdingsTab: 'liquidity',
    decimals: AERODROME_LIQUIDITY_DECIMALS,
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

const lockableTokens = {
  ...allocationTokens,
  'kvcm-usdc': tokens['kvcm-usdc'],
  'kvcm-k2': tokens['kvcm-k2'],
};

export const tokenInfoFromSubgraphSymbol = (
  symbol: string
): TokenInfo | null => {
  const res = Object.values(tokens).find(
    (token) => token.subgraphSymbol === symbol
  );
  return res ?? null;
};

export const isLpToken = (token: unknown): token is LpToken => {
  return typeof token === 'string' && Object.keys(lpTokens).includes(token);
};

export const isToken = (token: unknown): token is Token => {
  return typeof token === 'string' && Object.keys(tokens).includes(token);
};

export const isAllocatableToken = (
  token: unknown
): token is AllocatableToken => {
  return isToken(token) && Object.keys(allocationTokens).includes(token);
};

export const isLockableToken = (token: unknown): token is LockableToken => {
  return isToken(token) && Object.keys(lockableTokens).includes(token);
};
