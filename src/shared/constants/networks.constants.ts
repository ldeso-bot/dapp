import { createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';

export const validChains = [base, baseSepolia];
export const validChainIds = validChains.map((chain) => chain.id);
export type ValidNetworkId = (typeof validChainIds)[number];
export const defaultChain = validChains[0];

export const wagmiConfig = createConfig({
  chains: [base, baseSepolia],
  transports: {
    //TODO use our custom endpoints?
    [base.id]: http(base.rpcUrls.default.http[0]),
    [baseSepolia.id]: http(baseSepolia.rpcUrls.default.http[0]),
  },
});
