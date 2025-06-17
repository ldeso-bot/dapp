import constants from '@/shared/constants';
import contracts, {
  ContractName,
} from '@/shared/constants/contracts.constants';
import {
  type Abi,
  type Address,
  type PublicClient,
  type WalletClient,
  getContract as viemGetContract,
} from 'viem';
import { ViemError } from './web3.types';

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
