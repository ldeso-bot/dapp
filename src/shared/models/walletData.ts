import { Address } from 'viem';
import { ChainId } from '../constants/networks.constants';
import {
  AllocatableToken,
  LockableToken,
  Token,
} from '../constants/tokens.constants';
import { ApiCreditToken, CarbonClass } from './shared';

type LockStatus = 'active' | 'matured' | 'claimed';
export type EarningStatus = 'earning' | 'paused';

export type Lock = {
  id: string;
  /** Contract lock ID (used in contract calls) */
  contractLockId: number;
  /** Amount locked */
  lockedAmount: number;
  /** Value of the locked tokens in USD */
  lockedValueUSD: number;
  /** Amount locked */
  originalLockedAmount: number;
  /** Value of the locked tokens in USD */
  originalLockedValueUSD: number;
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
  /** Whether the lock is pending unlock (K2 only) */
  isPendingUnlock: boolean;
  /** Amount that can be requested for unlocked (K2 only) */
  availableForUnlockRequestAmount: number;
  /** Amount that can be unlocked */
  unlockableLockedAmount: number;
  /** Amount that is pending unlock (K2 only) */
  requestedForUnlockAmount: number;
  /** The time when the user can request unlock (K2 only) */
  availableForUnlockRequestAt: number;
  /** Whether the lock can be requested to be unlocked (K2 only) */
  canRequestUnlock: boolean;
  /** Status of the lock */
  status: LockStatus;
  /** Earning status of the lock */
  earningStatus: EarningStatus;
  /** Date of lock creation */
  created: number;
  /* Whether the lock can be topped up */
  canTopUp: boolean;
  /* Whether the lock was claimed partially */
  isPartiallyClaimed: boolean;
};

export type Locks = Lock[];

export type Balances = Record<Token, number>;

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
  contractLockId?: number;
  maturityId?: number;
  lockedUntil?: number;
};
export type Allocations = Allocation[];

export type CreditBalance = {
  balance: number;
  creditToken: ApiCreditToken;
  registeredClasses: CarbonClass[];
};

/* Wallet Data */
export type WalletData = {
  address: string;
  chainId: ChainId;
  locks: Locks;
  balances: Balances;
  allocations: Allocations;
  creditBalances: CreditBalance[];
};
