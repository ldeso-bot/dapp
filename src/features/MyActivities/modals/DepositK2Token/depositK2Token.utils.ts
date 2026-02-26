import { usePermitSignature } from '@/features/MyActivities/hooks/usePermitSignature';
import { useTransactionWithValidation } from '@/features/MyActivities/hooks/useTransactionWithValidation';
import { getWalletDataQueryKey } from '@/shared/hooks/api/walletData.queryKey';
import { useChainId } from '@/shared/hooks/web3/useChainId';
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
  const { address: userAddress, chain } = useAccount();
  const chainId = useChainId();

  const queryKey = getWalletDataQueryKey(chainId, userAddress);
  const { contract: stakingContract } = useContract('StakingManagerDiamond');

  const { getPermitSignature } = usePermitSignature({
    amount,
    spenderName: 'StakingManagerDiamond',
    tokenName: 'K2',
  });

  const { executeWithValidation } = useTransactionWithValidation<WalletData>({
    queryKey,
    validate: (walletData, previousData) => {
      if (!walletData?.locks) return false;
      const currentLockCount = previousData?.locks.length ?? 0;
      // For new deposits: check if the lock count increased
      if (walletData.locks.length > currentLockCount) {
        return true;
      }
      // For topups: check if the existing lock amount changed
      const existingLock = walletData.locks.find((lock) => lock.token === 'k2');
      const previousLock = previousData?.locks.find(
        (lock) => lock.token === 'k2'
      );
      if (
        existingLock &&
        previousLock &&
        existingLock.lockedAmount !== previousLock.lockedAmount
      ) {
        return true;
      }
      return false;
    },
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
