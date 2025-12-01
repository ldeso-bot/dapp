import { Token, tokens } from '@/shared/constants/tokens.constants';
import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

export const getTokenSymbol = (tokenSymbol: Token): string =>
  tokens[tokenSymbol].symbol;

export const getTokenImage = (tokenSymbol: Token): StaticImageData =>
  tokens[tokenSymbol].iconSrc;

export const getTokenIcon = (tokenSymbol: Token, size?: number): ReactNode =>
  tokens[tokenSymbol].icon(size);
