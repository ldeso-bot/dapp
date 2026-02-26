import { base, baseSepolia } from 'viem/chains';
import { ChainId } from './networks.constants';

const useLocalRpc = process.env.NEXT_PUBLIC_USE_LOCAL_RPC === 'true';

const baseRpcUrl =
  process.env.BASE_RPC_URL || process.env.NEXT_PUBLIC_BASE_RPC_URL;
const baseSepoliaRpcUrl =
  process.env.BASE_SEPOLIA_RPC_URL ||
  process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL;

if (!useLocalRpc && (!baseRpcUrl || !baseSepoliaRpcUrl)) {
  throw new Error(
    'Missing RPC configuration. Set BASE_RPC_URL and BASE_SEPOLIA_RPC_URL (or NEXT_PUBLIC equivalents).'
  );
}

const rpcUrls: Record<ChainId, string> = useLocalRpc
  ? {
      [base.id]: 'http://localhost:8545',
      [baseSepolia.id]: 'http://localhost:8545',
    }
  : {
      [base.id]: baseRpcUrl as string,
      [baseSepolia.id]: baseSepoliaRpcUrl as string,
    };

export { rpcUrls };
