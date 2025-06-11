import constants from '@/shared/constants';
import { ContractName } from '../constants/contracts.constants';
import { getContract } from '../dal/web3/web3.utils';

import { useWalletClient } from 'wagmi';

export const useGetContract = (contractName: ContractName) => {
  const { data: walletClient } = useWalletClient({
    chainId: constants.CHAIN.id,
  });
  if (!walletClient) {
    return null;
  }
  const contract = getContract(contractName, walletClient);
  return contract;
};
