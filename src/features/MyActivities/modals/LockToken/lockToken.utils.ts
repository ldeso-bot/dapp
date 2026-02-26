import { useTransactionWithValidation } from '@/features/MyActivities/hooks/useTransactionWithValidation';
import { LockableToken } from '@/shared/constants/tokens.constants';
import { getWalletDataQueryKey } from '@/shared/hooks/api/walletData.queryKey';
import { useAllowance } from '@/shared/hooks/useAllowance';
import { useChainId } from '@/shared/hooks/web3/useChainId';
import { useContract } from '@/shared/hooks/web3/useContract';
import { WalletData } from '@/shared/models/walletData';
import { ERC20Abi } from '@/shared/utils/abis/ERC20';
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
  const chainId = useChainId();

  const queryKey = getWalletDataQueryKey(chainId, userAddress);
  const { contract: stakingContract } = useContract('StakingManagerDiamond');
  const { contract: kvcmContract } = useContract<ERC20Abi>('KVCM');
  const { contract: kvcmUsdcContract } = useContract<ERC20Abi>('KVCM_USDC');
  const { contract: kvcmK2Contract } = useContract<ERC20Abi>('KVCM_K2');

  const tokenAddress =
    token === 'kvcm'
      ? kvcmContract?.address
      : token === 'kvcm-usdc'
        ? kvcmUsdcContract?.address
        : kvcmK2Contract?.address;

  const { isAllowed, setAllowance } = useAllowance({
    tokenAddress: tokenAddress || '',
    tokenStandard: 'ERC20',
    spender: stakingContract?.address || '',
    amount,
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
      const lockKvcm = stakingContract?.write.lockKvcm;
      if (!lockKvcm || !chain) {
        throw new Error('Contract or chain not ready');
      }

      if (maturityId === undefined) {
        throw new Error('MaturityId is required for kVCM locking');
      }

      if (!isAllowed) {
        const approved = await setAllowance();
        if (!approved) {
          throw new Error('Failed to approve KVCM');
        }
      }
      const executeTransaction = () =>
        lockKvcm([amount, maturityId], {
          chain,
        });

      return await executeWithValidation(executeTransaction);
    } catch (error) {
      console.error('❌ Lock error:', error);
      return handleWeb3Error(error);
    }
  }, [
    stakingContract,
    chain,
    maturityId,
    amount,
    executeWithValidation,
    isAllowed,
    setAllowance,
  ]);

  const stakeLp = useCallback(async () => {
    try {
      const stakeLP = stakingContract?.write.stakeLP;

      if (!stakeLP || !kvcmUsdcContract || !kvcmK2Contract || !chain) {
        throw new Error('Contract or chain not ready');
      }

      if (!userAddress) {
        throw new Error('Use r account not ready');
      }

      const lpAddress =
        token === 'kvcm-usdc'
          ? kvcmUsdcContract.address
          : token === 'kvcm-k2'
            ? kvcmK2Contract.address
            : null;

      if (!lpAddress) {
        throw new Error('LP token address not available');
      }
      if (!isAllowed) {
        const approved = await setAllowance();
        if (!approved) {
          throw new Error('Failed to approve LP token');
        }
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
    kvcmUsdcContract,
    kvcmK2Contract,
    userAddress,
    maturityId,
    amount,
    executeWithValidation,
    isAllowed,
    setAllowance,
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
