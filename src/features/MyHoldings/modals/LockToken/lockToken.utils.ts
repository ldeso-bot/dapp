import { usePermitSignature } from '@/features/MyHoldings/hooks/usePermitSignature';
import { useTransactionWithValidation } from '@/features/MyHoldings/hooks/useTransactionWithValidation';
import { AllocatableToken } from '@/shared/constants/tokens.constants';
import { useContract } from '@/shared/hooks/web3/useContract';
import { WalletData } from '@/shared/models/walletData';
import { handleWeb3Error } from '@/shared/utils/web3.utils';
import { atom } from 'jotai';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';

export type LockTokenFields = {
  token: string;
  amount: number;
  duration: number;
  maturityId: number;
  maturityDate: number;
};

export const lockTokenDialogAtom = atom({
  open: false,
  token: null as AllocatableToken | null,
});

export const useLockToken = (params: {
  token: AllocatableToken;
  amount: bigint;
  maturityId?: number;
}) => {
  const { token, amount, maturityId } = params;
  const { address: userAddress, chain } = useAccount();

  const tokenContractName = 'KVCM' as const;
  const queryKey = [`wallet-data-${userAddress}`];
  const { contract: stakingContract } = useContract('StakingManagerDiamond');

  const { getPermitSignature } = usePermitSignature({
    amount,
    spenderName: 'StakingManagerDiamond',
    tokenName: tokenContractName,
  });

  const { executeWithValidation } = useTransactionWithValidation<WalletData>({
    queryKey,
    validate: (walletData, previousData) => {
      if (!walletData?.locks) return false;
      const currentLockCount = previousData?.locks.length ?? 0;
      // For new locks: check if the lock count increased
      if (walletData.locks.length > currentLockCount) {
        return true;
      }
      // For topups: check if the existing lock amount for this maturity changed
      if (maturityId !== undefined) {
        const existingLock = walletData.locks.find(
          (lock) => lock.maturityId === maturityId && lock.token === token
        );
        const previousLock = previousData?.locks.find(
          (lock) => lock.maturityId === maturityId && lock.token === token
        );
        // If the lock exists and the amount is different, the data is updated
        if (
          existingLock &&
          previousLock &&
          existingLock.lockedAmount !== previousLock.lockedAmount
        ) {
          return true;
        }
      }
      return false;
    },
  });

  const lock = useCallback(async () => {
    try {
      if (!stakingContract || !chain) {
        throw new Error('Contract or chain not ready');
      }
      if (maturityId === undefined) {
        throw new Error('MaturityId is required for kVCM locking');
      }
      const signature = await getPermitSignature();
      const { deadline, r, s, v } = signature;
      const executeTransaction = () =>
        stakingContract.write.lockKvcmWithPermit(
          [amount, maturityId, deadline, v, r, s],
          { chain }
        );
      return await executeWithValidation(executeTransaction);
    } catch (error) {
      console.error('❌ Lock error:', error);
      return handleWeb3Error(error);
    }
  }, [
    stakingContract,
    chain,
    maturityId,
    getPermitSignature,
    amount,
    executeWithValidation,
  ]);

  return {
    lock,
    contract: stakingContract,
  };
};
