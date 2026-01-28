export const SUPPORTED_TABS = [
  'overview',
  'kvcm',
  'k2',
  'liquidity',
  'test',
] as const;

export type HoldingsTabValue = (typeof SUPPORTED_TABS)[number];
