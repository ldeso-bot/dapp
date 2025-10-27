/* Token Metrics */
export type Metrics = {
  valueUSD: number;
  valueChangePercent24h: number;
  amountTonnes: number;
  amountChangePercent24h: number;
};

export type AllMetrics = {
  kVcmLocked: Metrics;
  k2Locked: Metrics;
};

import { LpToken, Token } from '../constants/tokens.constants';

/* Liquidity Pool Info */
export type LiquidityPoolInfo = {
  id: string;
  token: LpToken; // e.g., 'kVCM'
  tvl: number; // Total Value Locked in USD
  description: string; // e.g., 'Basic Volatile 1.0%'
  apyPercent: number; // Annual Percentage Yield
};

export type LiquidityPools = LiquidityPoolInfo[];

/* Klima Bond Yield Rates */
export type YieldRate = {
  days?: number;
  maturityId: string; // protocol maturity Id
  index: number; // relotive maturity Index. 0 for the next maturity
  maturationTimestamp: number;
  yieldPercent: number;
  token: Token;
  lockDuration?: number;
  incentivesYield?: number;
};

export type YieldRates = YieldRate[];

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
  changeUSD: number;
};

export type CarbonClass = {
  name: string;
  category: string;
  priceUSD: number;
};

export type CarbonMarket = CarbonMarketBreakdownItem[];

/* Protocol Data */
export type ProtocolData = {
  metrics: AllMetrics;
  liquidityPools: LiquidityPools;
  lockedkVcmYieldRates: YieldRates;
  liquidityPoolRiskyYield: YieldRates;
  carbonYieldRates: YieldRates;
  carbonBacking: CarbonBacking;
  carbonLiquidity: CarbonLiquidity;
  carbonMarket: CarbonMarket;
  carbonClasses: CarbonClass[];
};
