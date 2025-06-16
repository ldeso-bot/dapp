import { createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';

export const wagmiConfig = createConfig({
  chains: [base, baseSepolia],
  transports: {
    //TODO use our custom endpoints?
    [base.id]: http(base.rpcUrls.default.http[0]),
    [baseSepolia.id]: http(baseSepolia.rpcUrls.default.http[0]),
  },
});
