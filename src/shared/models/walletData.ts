import { Address } from 'viem';
import { ChainId } from '../constants/networks.constants';
import {
  AllocatableToken,
  LockableToken,
  LpToken,
  Token,
} from '../constants/tokens.constants';

type LockStatus = 'active' | 'matured' | 'claimed';
export type EarningStatus = 'earning' | 'paused';

export type Lock = {
  id: string;
  /** Amount locked */
  lockedAmount: number;
  /** Value of the locked tokens in USD */
  lockedValueUSD: number;
  /** Amount that participates to the rewards (same as lockedAmount except for KVCM locks where kvcm rewards are added) */
  positionAmount: number;
  /** Value of the position in USD */
  positionValueUSD: number;
  /** Timestamp of the lock's maturity */
  lockedUntil: number;
  /** Maturity ID */
  maturityId: number;
  /** Locked token */
  token: LockableToken;
  /** Risky yield APY */
  riskyYieldApyPercent: number;
  /** Synthetic yield APY */
  syntheticYieldApyPercent: number;
  /** K2 yield APY */
  k2YieldApyPercent: number;
  /** Accrued rewards */
  rewards: {
    kvcm: number;
    k2: number;
    carbonTonnes: number;
  };
  /** Claimable rewards */
  claimableRewards: {
    kvcm: number;
    k2: number;
  };
  /** Pending rewards -only for k2 locks- */
  accruingRewards: {
    kvcm: number;
    k2: number;
  };
  /** Whether the lock is claimable */
  isClaimable: boolean;
  /** Status of the lock */
  status: LockStatus;
  /** Earning status of the lock */
  earningStatus: EarningStatus;
};

export type Locks = Lock[];

export type Balances = Record<LpToken | Token, number>;

export type PriceEffect = 'Low' | 'Medium' | 'High';

export type Allocation = {
  id: string;
  carbonClass: string;
  priceUSD: number;
  amount: number;
  category: string; // add types for supported categories
  holder: Address;
  sharePercent: number;
  priceEffect: PriceEffect;
  token: {
    name: AllocatableToken;
    address: Address;
  };
};
export type Allocations = Allocation[];

/* Wallet Data */
export type WalletData = {
  address: string;
  chainId: ChainId;
  locks: Locks;
  balances: Balances;
  allocations: Allocations;
};
