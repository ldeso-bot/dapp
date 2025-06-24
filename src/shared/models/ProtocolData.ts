/* Token Metrics */
type Metrics = {
  valueUSD: number;
  valueChangePercent24h: number;
  amountTonnes: number;
  amountChangePercent24h: number;
};

export type AllMetrics = {
  klimaBonded: Metrics;
  klimaXLocked: Metrics;
};

import { Token } from '../constants/tokens.constants';

/* Liquidity Pool Info */
export type LiquidityPoolInfo = {
  id: string;
  token1: Token; // e.g., 'klima'
  token2: Token; // e.g., 'usdc'
  tvl: number; // Total Value Locked in USD
  description: string; // e.g., 'Basic Volatile 1.0%'
  apyPercent: number; // Annual Percentage Yield
};

export type LiquidityPools = LiquidityPoolInfo[];

/* Klima Bond Yield Rates */
type KlimaBondYieldRate = {
  durationDays: number;
  yieldPercent: number;
};

export type YieldRates = KlimaBondYieldRate[];

type CarbonBackingBreakdownItem = {
  category: string;
  amountTonnes: number;
};

/* Carbon Backing */
export type CarbonBacking = {
  totalTonnes: number;
  marketValueUSD: number;
  breakdown: CarbonBackingBreakdownItem[];
};

/* Carbon Liquidity */
type CarbonLiquidityBreakdownItem = {
  category: string;
  valueUSD: number;
};

export type CarbonLiquidity = {
  marketValueUSD: number;
  breakdown: CarbonLiquidityBreakdownItem[];
};

/* Carbon Market */
type CarbonMarketBreakdownItem = {
  category: string;
  capacityTonnes: number;
  priceUSD: number;
};

export type CarbonMarket = CarbonMarketBreakdownItem[];

/* Protocol Data */
export type ProtocolData = {
  metrics: AllMetrics;
  liquidityPools: LiquidityPools;
  klimaBondYieldRates: YieldRates;
  liquidityPoolRiskyYield: YieldRates;
  carbonYieldRates: YieldRates;
  carbonBacking: CarbonBacking;
  carbonLiquidity: CarbonLiquidity;
  carbonMarket: CarbonMarket;
};
