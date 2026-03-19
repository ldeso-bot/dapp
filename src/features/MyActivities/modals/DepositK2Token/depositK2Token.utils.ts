import { useAllowance } from '@/shared/hooks/useAllowance';
import { useTransactionAndWaitForWalletUpdate } from '@/shared/hooks/useTransactionAndWaitForWalletUpdate';
import { useContract } from '@/shared/hooks/web3/useContract';
import { WalletData } from '@/shared/models/walletData';
import { ERC20Abi } from '@/shared/utils/abis/ERC20';
import { handleWeb3Error } from '@/shared/utils/web3.utils';
import { atom } from 'jotai';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';

export type DepositK2TokenFields = {
  amount: number;
};

export const depositK2TokenDialogAtom = atom({ open: false });

export const useDepositK2Token = (params: { amount: bigint }) => {
  const { amount } = params;
  const { chain } = useAccount();

  const { contract: stakingContract } = useContract('StakingManagerDiamond');
  const { contract: k2Contract } = useContract<ERC20Abi>('K2');

  const { isAllowed, setAllowance } = useAllowance({
    tokenAddress: k2Contract?.address || '',
    tokenStandard: 'ERC20',
    spender: stakingContract?.address || '',
    amount,
  });

  const { executeWithValidation } = useTransactionAndWaitForWalletUpdate({
    valueFetcher: (walletData: WalletData) =>
      walletData?.locks.find((lock) => lock.token === 'k2')?.lockedAmount ?? 0,
  });

  const deposit = useCallback(async () => {
    try {
      const lockK2 = stakingContract?.write.lockK2;
      if (!lockK2 || !chain) {
        throw new Error('Contract or chain not ready');
      }

      if (!isAllowed) {
        const approved = await setAllowance();
        if (!approved) {
          throw new Error('Failed to approve K2');
        }
      }

      const executeTransaction = () =>
        lockK2([amount], {
          chain,
        });

      return await executeWithValidation(executeTransaction);
    } catch (error) {
      console.error('❌ Deposit error:', error);
      return handleWeb3Error(error);
    }
  }, [
    stakingContract,
    chain,
    amount,
    executeWithValidation,
    isAllowed,
    setAllowance,
  ]);

  return {
    deposit,
    contract: stakingContract,
  };
};
