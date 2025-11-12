import { createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { rpcUrls } from './rpc.constants';

export const wagmiConfig = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(rpcUrls[base.id]),
    [baseSepolia.id]: http(rpcUrls[baseSepolia.id]),
  },
});

export const CHAIN_IDS = [base.id, baseSepolia.id] as const;
export const DEFAULT_CHAIN_ID = base.id;
export type ChainId = (typeof CHAIN_IDS)[number];
