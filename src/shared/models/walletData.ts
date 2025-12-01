import { Address } from 'viem';
import {
  AllocatableToken,
  LockableToken,
  LpToken,
  Token,
} from '../constants/tokens.constants';

type Holding = {
  id: string;
  balance: number;
  valueUSD: number;
  apyPercent: number;
};

export type Lock = Holding & {
  endTimestamp: number;
  token: LockableToken;
  riskyYieldPercent: number;
  baseApyPercent: number;
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
