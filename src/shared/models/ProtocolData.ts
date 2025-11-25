import { LpToken, Token } from '../constants/tokens.constants';

export enum YieldType {
  K2 = 'K2',
  RISKY = 'RISKY',
  SYNTHETIC = 'SYNTHETIC',
}

/* Token Metrics */
export type Metrics = {
  valueUSD: number;
  valueUSDChangePercent24h: number;
  supply: number;
  supplyChangePercent24h: number;
  supplyLocked: number;
  supplyLockedChangePercent24h: number;
  address: string;
};

export type AllMetrics = {
  kvcm: Metrics;
  k2: Metrics;
  'kvcm-k2': Metrics;
  'kvcm-usdc': Metrics;
};

/* Liquidity Pool Info */
export type LiquidityPoolInfo = {
  token: LpToken;
  tvlUSD: number; // Total Value Locked in USD
  apyYearly: number; // Yearly APY
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
  supplyTonnes: number;
};

export type CarbonMarket = CarbonMarketBreakdownItem[];

/* Protocol Data */
export type ProtocolData = {
  metrics: AllMetrics;
  liquidityPools: LiquidityPools;
  lockedkVcmYieldRates: YieldRates;
  liquidityPoolRiskyYield: YieldRates;
  carbonMarket: CarbonMarket;
  carbonClasses: CarbonClass[];
};
