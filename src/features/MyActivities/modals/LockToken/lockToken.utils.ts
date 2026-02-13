import { usePermitSignature } from '@/features/MyActivities/hooks/usePermitSignature';
import { useTransactionWithValidation } from '@/features/MyActivities/hooks/useTransactionWithValidation';
import { LockableToken } from '@/shared/constants/tokens.constants';
import { useContract, useContractInfo } from '@/shared/hooks/web3/useContract';
import { WalletData } from '@/shared/models/walletData';
import { handleWeb3Error } from '@/shared/utils/web3.utils';
import { atom } from 'jotai';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';

export type LockTokenFields = {
  token: string;
  amount: number;
  maturityId: number;
};

export const lockTokenDialogAtom = atom({
  open: false,
  token: null as LockableToken | null,
});

export const useLockToken = (params: {
  token: LockableToken;
  amount: bigint;
  maturityId?: number;
}) => {
  const { token, amount, maturityId } = params;
  const { address: userAddress, chain } = useAccount();

  const tokenContractName = 'KVCM' as const;
  const queryKey = [`wallet-data-${userAddress}`];
  const { contract: stakingContract } = useContract('StakingManagerDiamond');

  const { address: kvcmUsdcAddress } = useContractInfo('KVCM_USDC');
  const { address: kvcmK2Address } = useContractInfo('KVCM_K2');

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

  const lockKvcm = useCallback(async () => {
    try {
      const lockKvcmWithPermit = stakingContract?.write.lockKvcmWithPermit;
      if (!lockKvcmWithPermit || !chain) {
        throw new Error('Contract or chain not ready');
      }
      if (maturityId === undefined) {
        throw new Error('MaturityId is required for kVCM locking');
      }
      const signature = await getPermitSignature();
      const { deadline, r, s, v } = signature;
      const executeTransaction = () =>
        lockKvcmWithPermit([amount, maturityId, deadline, v, r, s], { chain });
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

  const stakeLp = useCallback(async () => {
    try {
      const stakeLP = stakingContract?.write.stakeLP;
      const lpAddress =
        token === 'kvcm-usdc'
          ? kvcmUsdcAddress
          : token === 'kvcm-k2'
            ? kvcmK2Address
            : null;
      if (!stakeLP || !chain) {
        throw new Error('Contract or chain not ready');
      }
      if (!lpAddress) {
        throw new Error('LP token address not available');
      }

      const executeTransaction = () =>
        stakeLP([lpAddress, maturityId, amount], {
          chain,
        });
      return await executeWithValidation(executeTransaction);
    } catch (error) {
      console.error('❌ Stake LP error:', error);
      return handleWeb3Error(error);
    }
  }, [
    stakingContract,
    chain,
    token,
    kvcmUsdcAddress,
    kvcmK2Address,
    maturityId,
    amount,
    executeWithValidation,
  ]);

  const lockToken = useCallback(async () => {
    if (token === 'kvcm') {
      return await lockKvcm();
    }
    return await stakeLp();
  }, [token, lockKvcm, stakeLp]);

  return {
    lockToken,
    stakeLp,
    contract: stakingContract,
  };
};
