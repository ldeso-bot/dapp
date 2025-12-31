import { AllocatableToken } from '@/shared/constants/tokens.constants';
import { useRefetchWithRetry } from '@/shared/hooks/useRefetchWithRetry';
import { useContract } from '@/shared/hooks/web3/useContract';
import { usePermit } from '@/shared/hooks/web3/usePermit';
import { useWaitForTransaction } from '@/shared/hooks/web3/useWaitForTransaction';
import { YieldRate } from '@/shared/models/ProtocolData';
import { WalletData } from '@/shared/models/walletData';
import { PermitReturn } from '@/shared/utils/web3.types';
import { handleWeb3Error } from '@/shared/utils/web3.utils';
import { useQueryClient } from '@tanstack/react-query';
import { atom } from 'jotai';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';

export type LockTokenFields = {
  token: string;
  amount: number;
  duration: number;
  maturityId?: number;
  maturityDate?: number;
};

export const lockTokenDialogAtom = atom({
  open: false,
  token: null as AllocatableToken | null,
});

export const useTransferWithPermit = () => {
  const permit = usePermit({
    spenderName: 'USDCTransferWithPermit',
    tokenName: 'USDC',
    value: 1n,
  });

  const { contract } = useContract('USDCTransferWithPermit');
  const { chain } = useAccount();

  const send = useCallback(async () => {
    let signature: PermitReturn | null = null;
    try {
      signature = await permit.getPermitSignature();

      if (!signature) {
        return {
          error: 'Signature is not ready',
        };
      }
      if (!contract) {
        return {
          error: 'Contract is not ready',
        };
      }
      const { owner, value, deadline, r, s, v } = signature;

      await contract.write.transferWithPermit(
        [
          owner,
          '0x061138CBfEA4531D9ae118e36B86e7CD27649523',
          value,
          deadline,
          v,
          r,
          s,
        ],
        { chain }
      );

      return {
        error: null,
      };
    } catch (error) {
      return handleWeb3Error(error);
    }
  }, [permit, contract, chain]);

  return {
    contract,
    send,
  };
};

export const useLockToken = (params: {
  token: AllocatableToken;
  amount: bigint;
  maturityId: number;
}) => {
  const queryClient = useQueryClient();
  const { refetchWithRetry } = useRefetchWithRetry();
  const { waitForTransaction } = useWaitForTransaction();

  const { token, amount, maturityId } = params;
  const { address: userAddress, chain } = useAccount();

  const stakingContractName = token === 'kvcm' ? 'KvcmStaking' : 'K2Staking';
  const tokenContractName = token.toUpperCase() as 'KVCM' | 'K2';

  const { contract: tokenContract } = useContract(tokenContractName);
  const { contract: stakingContract } = useContract(stakingContractName);

  const permit = usePermit({
    value: amount,
    spenderName: stakingContractName,
    tokenName: token.toUpperCase() as 'KVCM' | 'K2',
  });

  const checkAllowance = useCallback(async () => {
    if (!tokenContract || !stakingContract || !userAddress) {
      const missingParts = [];
      if (!tokenContract) missingParts.push('tokenContract');
      if (!stakingContract) missingParts.push('stakingContract');
      if (!userAddress) missingParts.push('userAddress');
      throw new Error(
        `Contracts or user address not ready. Missing: ${missingParts.join(', ')}`
      );
    }

    try {
      const allowance = (await tokenContract.read.allowance([
        userAddress,
        stakingContract.address,
      ])) as bigint;
      return allowance >= amount;
    } catch (error) {
      console.error('❌ Error checking allowance:', error);
      return false;
    }
  }, [tokenContract, stakingContract, userAddress, amount]);

  const lockWithAllowance = useCallback(async () => {
    if (!stakingContract || !chain) {
      throw new Error('Contract or chain not ready');
    }

    if (token === 'kvcm') {
      const txHash = await stakingContract.write.lockKvcm(
        [amount, maturityId],
        {
          chain,
        }
      );
      return txHash;
    } else {
      throw new Error('K2 locking not yet implemented');
    }
  }, [stakingContract, token, amount, maturityId, chain]);

  const approveAndLock = useCallback(async () => {
    if (!tokenContract || !stakingContract || !chain) {
      throw new Error('Contract or chain not ready');
    }
    await tokenContract.write.approve([stakingContract.address, amount], {
      chain,
    });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return await lockWithAllowance();
  }, [tokenContract, stakingContract, amount, chain, lockWithAllowance]);

  const lockWithPermit = useCallback(async () => {
    if (!stakingContract || !chain) {
      throw new Error('Contract or chain not ready');
    }

    const signature = await permit.getPermitSignature();
    if (!signature) {
      throw new Error('Failed to get permit signature');
    }

    const { deadline, r, s, v } = signature;
    if (token === 'kvcm') {
      const tx = await stakingContract.write.lockKvcmWithPermit(
        [amount, maturityId, deadline, v, r, s],
        { chain }
      );
      return tx;
    } else {
      throw new Error('K2 locking with permit not yet implemented');
    }
  }, [stakingContract, token, amount, maturityId, chain, permit]);

  const lock = useCallback(async () => {
    try {
      // Get current wallet data before transaction
      const currentData = queryClient.getQueryData<WalletData>([
        `wallet-data-${userAddress}`,
      ]);
      const currentLockCount = currentData?.locks.length ?? 0;

      let txHash: `0x${string}`;
      const hasSufficientAllowance = await checkAllowance();
      if (hasSufficientAllowance) {
        txHash = await lockWithAllowance();
      } else {
        try {
          txHash = await lockWithPermit();
        } catch (permitError) {
          console.warn('Permit failed, using approve + lock flow', permitError);
          txHash = await approveAndLock();
        }
      }
      await waitForTransaction(txHash);

      const dataUpdated = await refetchWithRetry({
        queryKey: [`wallet-data-${userAddress}`],
        maxRetries: 10,
        retryDelay: 1000,
        validate: (data: unknown) => {
          const walletData = data as WalletData;
          if (!walletData?.locks) return false;
          // For new locks: check if the lock count increased
          if (walletData.locks.length > currentLockCount) {
            return true;
          }
          // For topups: check if the existing lock amount for this maturity changed
          const existingLock = walletData.locks.find(
            (lock) => lock.maturityId === maturityId && lock.token === token
          );
          const previousLock = currentData?.locks.find(
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
          return false;
        },
      });

      if (!dataUpdated) {
        console.warn(
          '⚠️ Data validation timeout, but transaction was successful'
        );
      }
      return {
        error: null,
      };
    } catch (error) {
      console.error('❌ Lock error:', error);
      return handleWeb3Error(error);
    }
  }, [
    checkAllowance,
    lockWithAllowance,
    lockWithPermit,
    approveAndLock,
    waitForTransaction,
    queryClient,
    userAddress,
    refetchWithRetry,
    maturityId,
    token,
  ]);

  return {
    lock,
    checkAllowance,
    contract: stakingContract,
  };
};

export const findClosestMaturityByDays = (
  targetDays: number,
  yieldData: YieldRate[]
) => {
  if (yieldData.length === 0) {
    return null;
  }

  const nowInSeconds = Math.floor(Date.now() / 1000);
  const targetTimestamp = nowInSeconds + targetDays * 24 * 60 * 60;

  return yieldData?.reduce((closest: YieldRate, current: YieldRate) => {
    const currentDiff = Math.abs(
      (current.maturationTimestamp ?? 0) - targetTimestamp
    );
    const closestDiff = Math.abs(
      (closest.maturationTimestamp ?? 0) - targetTimestamp
    );
    return currentDiff < closestDiff ? current : closest;
  });
};
