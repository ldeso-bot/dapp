import contracts, {
  ContractName,
} from '@/shared/constants/contracts.constants';
import { isChainId } from '@/shared/utils/typeguards';
import { getContract } from '@/shared/utils/web3.utils';
import { Abi } from 'viem';
import { useAccount } from 'wagmi';
import { useChainId } from './useChainId';
import { useGetWalletClient } from './useGetWalletClient';

export const useContract = <T extends Abi>(contractName: ContractName) => {
  const { data: walletClient, ...rest } = useGetWalletClient();
  const { chain } = useAccount();
  const chainId = useChainId();

  const contract =
    walletClient && isChainId(chain?.id)
      ? getContract<T>(chain?.id, contractName, walletClient)
      : null;
  const contractInfo = contracts[contractName];
  return {
    contract,
    address: contractInfo[chainId],
    abi: contractInfo.abi,
    ...rest,
  };
};

/**
 * Returns the contract information for the connected chain
 * @param contractName
 * @returns
 */
export const useContractInfo = (contractName: ContractName) => {
  const chainId = useChainId();

  const contractInfo = contracts[contractName];

  return {
    name: contractName,
    address: contractInfo[chainId],
    abi: contractInfo.abi,
  };
};
