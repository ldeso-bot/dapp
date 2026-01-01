import { ChainId } from '../constants/networks.constants';
import { LpToken, Token } from '../constants/tokens.constants';
import { CarbonClass } from './shared';

export enum YieldType {
  K2 = 'K2',
  RISKY = 'RISKY',
  SYNTHETIC = 'SYNTHETIC',
}

/* Maturity 0 is for K2 */
type MaturityId = number;

/* Token Metrics */
export type Metrics = {
  valueUSD: number;
  valueUSDChangePercent24h: number;
  supply: number;
  supplyChangePercent24h: number;
  supplyLocked: number;
  supplyLockedChangePercent24h: number;
  valueLockedUSD: number;
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
  maturityId: MaturityId; // protocol maturity Id
  maturationTimestamp: number;
  yieldPercent: number;
  incentivesYield?: number;
  tokens: Token[]; // Tokens that are eligible for incentives
};

export type YieldRates = YieldRate[];

export type ApyInfo = {
  kvcm: number;
  k2: number;
  'kvcm-k2': number;
  'kvcm-usdc': number;
};

export type ApyMidnightInfo = {
  maturityId: MaturityId;
  k2ApyFor: ApyInfo; // Yearly APY for each token
  kvcmApyFor: ApyInfo; // Yearly APY for each token
  k2PyFor: ApyInfo; // APY between two given midnights for each token
  kvcmPyFor: ApyInfo; // APY between two given midnights for each token
};

/* Midnight Info */
export type MidnightInfos = {
  midnightIndex: number;
  k2ApyForK2: number;
  k2ApyForKVCM_K2_LP: number;
  k2ApyForKVCM: number;
  kvcmApyForKVCM_K2_LP: number;
  kvcmApyForKVCM_USDC_LP: number;
  kvcmApyForK2: number;
  maturityApys: Record<MaturityId, ApyMidnightInfo>;
};

/* Protocol Data */
export type ProtocolData = {
  chainId: ChainId;
  metrics: AllMetrics;
  liquidityPools: LiquidityPools;
  lockedkVcmYieldRates: YieldRates;
  liquidityPoolRiskyYield: YieldRates;
  carbonClasses: CarbonClass[];
  midnightInfos: MidnightInfos;
};
