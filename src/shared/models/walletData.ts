import { Address } from 'viem';
import { Token, TokenPair } from '../constants/tokens.constants';

type Bond = {
  id: string;
  balance: number;
  valueUSD: number;
  apyPercent: number;
};

export type Bonds = Bond[];

type LiquidityPosition = {
  id: string;
  pair: TokenPair;
  balance: number;
  valueUSD: number;
  apyPercent: number;
};
export type LiquidityPositions = LiquidityPosition[];

type KlimaXLock = {
  id: string;
  balance: number;
  valueUSD: number;
  apyPercent: number;
  riskyYieldPercent: number;
  baseApyPercent: number;
};

export type KlimaXLocks = KlimaXLock[];

export type Balances = Record<TokenPair | Token, number>;

type Allocation = {
  id: string;
  class: string;
  priceUSD: number;
  amountTonnes: number;
  holder: Address;
  sharePercent: number;
  token: {
    address: Address;
  };
};
export type Allocations = Allocation[];

/* Wallet Data */
export type WalletData = {
  bonds: Bonds;
  liquidityPositions: LiquidityPositions;
  klimaXLocks: KlimaXLocks;
  balances: Balances;
  allocations: Allocations;
};
