/** Token standards */
export type TokenStandard = 'ERC20' | 'ERC1155';

export const TOKEN_STANDARDS: Record<TokenStandard, TokenStandard> = {
  ERC20: 'ERC20',
  ERC1155: 'ERC1155',
};
/**
 * Credit Token
 */
export type ApiCreditToken = {
  creditTokenId: string;
  tokenId: number;
  address: string;
  name: string;
  decimals: number;
  standard: TokenStandard;
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
  registeredTokens: string[];
};
export type CouponBurnParams = {
  tonnes: number;
  from: string;
};
