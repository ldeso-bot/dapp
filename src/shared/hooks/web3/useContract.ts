import contracts, {
  ContractName,
} from '@/shared/constants/contracts.constants';
import { isChainId } from '@/shared/utils/typeguards';
import { getContract } from '@/shared/utils/web3.utils';
import { useAccount } from 'wagmi';
import { useGetWalletClient } from './useGetWalletClient';

export const useContract = (contractName: ContractName) => {
  const { data: walletClient, ...rest } = useGetWalletClient();
  const { chain } = useAccount();
  const contract =
    walletClient && isChainId(chain?.id)
      ? getContract(chain?.id, contractName, walletClient)
      : null;
  return { contract, ...rest };
};

/**
 * Returns the contract information for the connected chain
 * @param contractName
 * @returns
 */
export const useContractInfo = (contractName: ContractName) => {
  const { chain } = useAccount();

  if (!isChainId(chain?.id)) {
    return null;
  }
  const contractInfo = contracts[contractName];

  return {
    address: contractInfo[chain.id],
    abi: contractInfo.abi,
  };
};
