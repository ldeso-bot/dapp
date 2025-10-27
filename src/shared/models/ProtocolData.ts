import { LpToken, Token } from '../constants/tokens.constants';

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

/* Liquidity Pool Info */
export type LiquidityPoolInfo = {
  token: LpToken;
  tvl: number; // Total Value Locked in USD
  apyPercent: number; // Annual Percentage Yield
};

export type LiquidityPools = LiquidityPoolInfo[];

/* Klima Bond Yield Rates */
export type YieldRate = {
  index: number; // Index relative to the first active maturity
  maturityId: string; // protocol maturity Id
  maturationTimestamp: number;
  yieldPercent: number;
  incentivesYield?: number;
  tokens: Token[]; // Tokens that are eligible for incentives
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
