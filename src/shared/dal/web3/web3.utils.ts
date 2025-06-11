import constants from '@/shared/constants';
import contracts, {
  ContractName,
} from '@/shared/constants/contracts.constants';
import {
  type Abi,
  type Address,
  type PublicClient,
  type WalletClient,
  createPublicClient,
  http,
  keccak256,
  toBytes,
  getContract as viemGetContract,
} from 'viem';

export function formatAddress(
  address: string | undefined,
  options: { startLength?: number; endLength?: number } = {}
): string {
  if (!address) return '';

  const { startLength = 4, endLength = 4 } = options;

  return `${address.slice(0, startLength + 2)}...${address.slice(-endLength)}`;
}

export function getPublicClient() {
  return createPublicClient({
    chain: constants.CHAIN,
    transport: http(),
  });
}

export function getContract(
  name: ContractName,
  client: PublicClient | WalletClient
) {
  const contractInfo = contracts[name];

  return viemGetContract({
    address: contractInfo[constants.NETWORK] as Address,
    abi: contractInfo.abi as Abi,
    client,
  });
}

export const getMethodHash = (methodSignature: string) => {
  return getMethodKeccak(methodSignature).slice(0, 10);
};

export const getMethodKeccak = (methodSignature: string) => {
  return keccak256(toBytes(methodSignature));
};
