import contracts, {
  ContractName,
} from '@/shared/constants/contracts.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { isChainId } from '@/shared/utils/typeguards';
import {
  type Abi,
  type PublicClient,
  type WalletClient,
  createPublicClient,
  http,
  getContract as viemGetContract,
} from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { rpcUrls } from '../constants/rpc.constants';
import { ViemError } from './web3.types';

/**
 * Gets the public client for the given chain ID
 * @param chainId - The chain ID
 * @returns The public client for the given chain
 * @throws Error if chainId is invalid
 */
export const getPublicClient = (chainId: ChainId): PublicClient => {
  if (!isChainId(chainId)) {
    throw new Error(`Invalid chain ID: ${chainId}`);
  }
  const chain = chainId === base.id ? base : baseSepolia;

  return createPublicClient({
    chain,
    transport: http(rpcUrls[chainId]),
  }) as PublicClient;
};

export function getContract(
  chainId: ChainId,
  name: ContractName,
  client: PublicClient | WalletClient
) {
  const contractInfo = contracts[name];

  return viemGetContract({
    address: contractInfo[chainId],
    abi: contractInfo.abi as Abi,
    client,
  });
}

const isViemError = (error: unknown): error is ViemError => {
  return typeof error == 'object' && error !== null && 'shortMessage' in error;
};

export const handleWeb3Error = (error: unknown) => {
  if (isViemError(error)) {
    return {
      error: error.shortMessage,
    };
  }
  if (error instanceof Error) {
    return {
      error: error.message,
    };
  }
  console.warn('Found unknown error type', error, typeof error);
  return {
    error: 'An unknown error occurred',
  };
};
