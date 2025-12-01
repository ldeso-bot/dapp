export const SUPPORTED_TABS = ['overview', 'kvcm', 'k2', 'liquidity'] as const;

export type TabValue = (typeof SUPPORTED_TABS)[number];
