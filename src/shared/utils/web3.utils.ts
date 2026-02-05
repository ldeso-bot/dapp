import { ExecuteWithValidationResult } from '@/features/MyActivities/hooks/useTransactionWithValidation';
import contracts, {
  ContractName,
} from '@/shared/constants/contracts.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { isChainId } from '@/shared/utils/typeguards';
import { QueryClient } from '@tanstack/react-query';
import { filter, isNonNullish } from 'remeda';
import {
  type Abi,
  Address,
  Client,
  Hash,
  type PublicClient,
  Transport,
  type WalletClient,
  createPublicClient,
  decodeEventLog,
  http,
  toEventSelector,
  getContract as viemGetContract,
} from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { rpcUrls } from '../constants/rpc.constants';
import Transfer from './abis/Transfer';
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

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export function getContract<T extends Abi>(
  chainId: ChainId,
  name: ContractName,
  client: PublicClient | WalletClient
) {
  const contractInfo = contracts[name];

  return viemGetContract<Transport, Address, T, Client>({
    address: contractInfo[chainId],
    abi: contractInfo.abi as unknown as T, // TODO: fix type resolution
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

/**
 * Fetches and decodes logs from a transaction receipt filtered by event ABI
 * @param chainId - The chain ID
 * @param txHash - The transaction hash
 * @param abiItem - The event ABI item to filter and decode logs
 * @returns Array of decoded logs matching the event
 */
export const getTransactionTransferLogs = async (
  chainId: ChainId,
  txHash: Hash
) => {
  const publicClient = getPublicClient(chainId);
  const receipt = await publicClient.getTransactionReceipt({ hash: txHash });

  const eventSelector = toEventSelector(Transfer[0]);

  const filteredLogs = receipt.logs.filter(
    (log) => log.topics[0] === eventSelector
  );

  const decodedLogs = filter(
    filteredLogs.map((log) => {
      try {
        return decodeEventLog({
          abi: Transfer,
          data: log.data,
          topics: log.topics,
        });
      } catch (error) {
        console.error('Error decoding log:', error);
        return null;
      }
    }),
    isNonNullish
  );
  return decodedLogs;
};

export const exitWithErrorMessage = (
  message: string
): ExecuteWithValidationResult => {
  console.error(message);
  return {
    error: message,
    hash: null,
  };
};

export const getScanLink = (chainId: ChainId, txHash: Hash) => {
  if (chainId === baseSepolia.id) {
    return `https://sepolia.basescan.org/tx/${txHash}`;
  }
  return `https://basescan.org/tx/${txHash}`;
};
