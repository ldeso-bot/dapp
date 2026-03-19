import { ChainId } from '../constants/networks.constants';
import { LpToken } from '../constants/tokens.constants';
import { CarbonClass } from './shared';

export enum YieldType {
  K2 = 'K2',
  RISKY = 'RISKY',
  SYNTHETIC = 'SYNTHETIC',
}

/* Maturity 0 is for K2 */
export type MaturityId = number;

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
  k2Locked: number; // For Lp pools amount of K2 locked in the pool
  kvcmLocked: number; // For Lp pools amount of KVCM locked in the pool
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

export type Yield = {
  kvcmApy: number;
  k2Apy: number;
  kvcmEquivalentLocked: number;
  k2EquivalentLocked: number;
  k2Distributed: number;
  kvcmDistributed: number;
};

type MaturityApys = {
  k2: Yield;
  kvcm: Yield;
  'kvcm-k2': Yield;
  'kvcm-usdc': Yield;
};

export type Maturity = {
  maturationTimestamp: number;
  maturityId: MaturityId;
  kvcmUsdcLPLocked: number;
  kvcmK2LPLocked: number;
  kvcmLocked: number;
  apys: MaturityApys;
};

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

export type ProtocolState = {
  protocolStartTimestamp: number;
  maturityPeriod: number;
  firstActiveMaturityId: number;
  lastActiveMaturityId: number;
  midnightIndex: number;
  lastProcessedMidnightIndex: number;
};

/* Protocol Data */
export type ProtocolData = {
  chainId: ChainId;
  metrics: AllMetrics;
  liquidityPools: LiquidityPools;
  maturities: Maturity[];
  carbonClasses: CarbonClass[];
  midnightInfos: MidnightInfos;
  protocolState: ProtocolState;
};
