import { Address } from 'viem';
import { AllocationToken, LpToken, Token } from '../constants/tokens.constants';

export type Holding = {
  id: string;
  balance: number;
  valueUSD: number;
  apyPercent: number;
};

export type Lock = Holding & {
  endTimestamp: number;
  token: AllocationToken;
  riskyYieldPercent: number;
  baseApyPercent: number;
};

export type Locks = Lock[];

export type LiquidityPosition = Holding & {
  token: LpToken;
  rewards: {
    k2: number;
    kvcm: number;
  };
};
export type LiquidityPositions = LiquidityPosition[];

export type Balances = Record<LpToken | Token, number>;

export type Allocation = {
  id: string;
  class: string;
  priceUSD: number;
  amountTonnes: number;
  holder: Address;
  sharePercent: number;
  token: {
    name: AllocationToken;
    address: Address;
  };
};
export type Allocations = Allocation[];

/* Wallet Data */
export type WalletData = {
  locks: Locks;
  liquidityPositions: LiquidityPositions;
  balances: Balances;
  allocations: Allocations;
};
