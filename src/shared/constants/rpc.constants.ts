import { base, baseSepolia } from 'viem/chains';
import { ChainId } from './networks.constants';

let rpcUrls: Record<ChainId, string> = {
  [base.id]: base.rpcUrls.default.http[0],
  [baseSepolia.id]: baseSepolia.rpcUrls.default.http[0],
};

if (process.env.ALCHEMY_API_KEY) {
  rpcUrls = {
    [base.id]: `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    [baseSepolia.id]: `https://base-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
  };
} else {
  console.warn(`No API key found for ALCHEMY_API_KEY. Using public networks.`);
}

export { rpcUrls };
