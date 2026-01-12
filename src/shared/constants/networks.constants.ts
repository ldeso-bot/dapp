import { base, baseSepolia } from 'wagmi/chains';

export const chains = [baseSepolia, base] as const;
export const CHAIN_IDS = [base.id, baseSepolia.id] as const;
export type ChainId = (typeof CHAIN_IDS)[number];
