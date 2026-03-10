import { usePermitSignature } from '@/features/MyActivities/hooks/usePermitSignature';
import { useTransactionAndWaitForWalletUpdate } from '@/shared/hooks/useTransactionAndWaitForWalletUpdate';
import { useContract } from '@/shared/hooks/web3/useContract';
import { WalletData } from '@/shared/models/walletData';
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

  const { getPermitSignature } = usePermitSignature({
    amount,
    spenderName: 'StakingManagerDiamond',
    tokenName: 'K2',
  });

  const { executeWithValidation } = useTransactionAndWaitForWalletUpdate({
    valueFetcher: (walletData: WalletData) =>
      walletData?.locks.find((lock) => lock.token === 'k2')?.lockedAmount ?? 0,
  });

  const deposit = useCallback(async () => {
    try {
      const lockK2WithPermit = stakingContract?.write.lockK2WithPermit;
      if (!lockK2WithPermit || !chain) {
        throw new Error('Contract or chain not ready');
      }
      const signature = await getPermitSignature();
      const { deadline, r, s, v } = signature;
      const executeTransaction = () =>
        lockK2WithPermit([amount, deadline, v, r, s], {
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
    getPermitSignature,
    amount,
    executeWithValidation,
  ]);

  return {
    deposit,
    contract: stakingContract,
  };
};
