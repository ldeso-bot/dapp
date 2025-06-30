import { Address } from 'viem';
import { LpToken, Token } from '../constants/tokens.constants';

export type Holding = {
  id: string;
  balance: number;
  valueUSD: number;
  apyPercent: number;
};

export type KVcmLock = Holding & {
  endTimestamp: number;
};

export type KVcmLocks = KVcmLock[];

export type LiquidityPosition = Holding & {
  token: LpToken;
};
export type LiquidityPositions = LiquidityPosition[];

export type K2Lock = Holding & {
  riskyYieldPercent: number;
  baseApyPercent: number;
  endTimestamp: number;
};

export type K2Locks = K2Lock[];

export type Balances = Record<LpToken | Token, number>;

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
  kvcmLocks: KVcmLocks;
  liquidityPositions: LiquidityPositions;
  k2Locks: K2Locks;
  balances: Balances;
  allocations: Allocations;
};
