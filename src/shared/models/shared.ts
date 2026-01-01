/**
 * Credit Token
 */
export type ApiCreditToken = {
  creditTokenId: string;
  project: {
    name: string;
  };
};

/** Carbon Class */
export type CarbonClass = {
  carbonClassId: string;
  name: string;
  category: string;
  valueUSD: number;
  supplyTonnes: number;
  valueUSDChangePercent24h: number;
  registeredTokens: ApiCreditToken[];
};
