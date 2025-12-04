import { Address } from 'viem';
import {
  AllocatableToken,
  LockableToken,
  LpToken,
  Token,
} from '../constants/tokens.constants';

export type Lock = {
  id: string;
  balance: number;
  valueUSD: number;
  endTimestamp: number;
  token: LockableToken;
  riskyYieldApyPercent: number;
  syntheticYieldApyPercent: number;
  k2YieldApyPercent: number;
  rewards: {
    kvcm: number;
    k2: number;
    carbonTonnes: number;
  };
};

export type Locks = Lock[];

export type Balances = Record<LpToken | Token, number>;

export type Allocation = {
  id: string;
  carbonClass: string;
  priceUSD: number;
  amount: number;
  holder: Address;
  sharePercent: number;
  token: {
    name: AllocatableToken;
    address: Address;
  };
};
export type Allocations = Allocation[];

/* Wallet Data */
export type WalletData = {
  locks: Locks;
  balances: Balances;
  allocations: Allocations;
};
