export const SUPPORTED_TABS = [
  'overview',
  'kvcm',
  'k2',
  'liquidity',
  'test',
] as const;

export type ActivitiesTabValue = (typeof SUPPORTED_TABS)[number];
