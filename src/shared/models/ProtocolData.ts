export type Metrics = {
  klima: {
    valueUSD: number;
    valueChangePercentage24h: number;
    amountTonnes: number;
  };
};

import { Token } from '../constants/tokens.constants';

export type LiquidityPoolInfo = {
  id: string;
  token1: Token; // e.g., 'klima'
  token2: Token; // e.g., 'usdc'
  tvl: number; // Total Value Locked in USD
  description: string; // e.g., 'Basic Volatile 1.0%'
  apy: number; // Annual Percentage Yield
};

type KlimaBondYieldRate = {
  durationDays: number;
  yieldPercentage: number;
};

export type KlimaBondYieldRates = KlimaBondYieldRate[];

export type LiquidityPools = LiquidityPoolInfo[];

export type ProtocolData = {
  metrics: Metrics;
  liquidityPools: LiquidityPools;
  klimaBondYieldRates: KlimaBondYieldRates;
};
