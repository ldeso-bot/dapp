import { Address } from 'viem';
import { Token, TokenPair } from '../constants/tokens.constants';

export type Bonds = {
  id: string;
  balance: number;
  valueUSD: number;
  apyPercent: number;
}[];

export type LiquidityPositions = {
  id: string;
  pair: TokenPair;
  balance: number;
  valueUSD: number;
  apyPercent: number;
}[];

export type KlimaXLocks = {
  id: string;
  balance: number;
  valueUSD: number;
  apyPercent: number;
  riskyYieldPercent: number;
  baseApyPercent: number;
}[];

export type Balances = Record<TokenPair | Token, number>;

export type Allocations = {
  id: string;
  class: string;
  priceUSD: number;
  amountTonnes: number;
  holder: Address;
  sharePercent: number;
  token: {
    address: Address;
  };
}[];

/* Wallet Data */
export type WalletData = {
  bonds: Bonds;
  liquidityPositions: LiquidityPositions;
  klimaXLocks: KlimaXLocks;
  balances: Balances;
  allocations: Allocations;
};
