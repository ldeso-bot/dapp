import { ExecuteWithValidationResult } from '@/features/MyActivities/hooks/useTransactionWithValidation';
import { useTransactionAndWaitForWalletUpdate } from '@/shared/hooks/useTransactionAndWaitForWalletUpdate';
import { useContract } from '@/shared/hooks/web3/useContract';
import { WalletData } from '@/shared/models/walletData';
import {
  exitWithErrorMessage,
  handleWeb3Error,
} from '@/shared/utils/web3.utils';
import { useCallback } from 'react';
import { isAddress } from 'viem';
import { useAccount } from 'wagmi';

type AllocateKvcmParams = {
  lockId: number;
  carbonClass: string;
  amount: bigint;
};

type DeallocateKvcmParams = {
  lockId: number;
  carbonClass: string;
  amount: bigint;
};

export const useAllocateKvcm = () => {
  const { contract } = useContract('StakingManagerDiamond');
  const { chain } = useAccount();

  const { executeWithValidation } = useTransactionAndWaitForWalletUpdate({
    valueFetcher: (walletData: WalletData) =>
      walletData?.allocations?.reduce((sum, alloc) => sum + alloc.amount, 0) ??
      0,
  });

  const allocate = useCallback(
    async (
      params: AllocateKvcmParams
    ): Promise<ExecuteWithValidationResult> => {
      try {
        const allocateKvcm = contract?.write.allocateKvcm;
        if (!allocateKvcm) {
          return exitWithErrorMessage('Contract is not ready');
        }

        if (!chain) {
          return exitWithErrorMessage('Chain is not ready');
        }

        if (!isAddress(params.carbonClass)) {
          return exitWithErrorMessage('Invalid carbon class address');
        }

        if (params.amount <= 0n) {
          return exitWithErrorMessage('Amount must be greater than 0');
        }

        const executeTransaction = () =>
          allocateKvcm(
            [
              BigInt(params.lockId),
              params.carbonClass as `0x${string}`,
              params.amount,
            ],
            { chain }
          );

        return await executeWithValidation(executeTransaction);
      } catch (error) {
        console.error('❌ Allocation error:', error);
        return handleWeb3Error(error);
      }
    },
    [contract, chain, executeWithValidation]
  );

  const deallocate = useCallback(
    async (
      params: DeallocateKvcmParams
    ): Promise<ExecuteWithValidationResult> => {
      try {
        const deallocateKvcm = contract?.write.deallocateKvcm;
        if (!deallocateKvcm) {
          return exitWithErrorMessage('Contract is not ready');
        }

        if (!chain) {
          return exitWithErrorMessage('Chain is not ready');
        }

        if (!isAddress(params.carbonClass)) {
          return exitWithErrorMessage('Invalid carbon class address');
        }

        if (params.amount <= 0n) {
          return exitWithErrorMessage('Amount must be greater than 0');
        }

        const executeTransaction = () =>
          deallocateKvcm(
            [
              BigInt(params.lockId),
              params.carbonClass as `0x${string}`,
              params.amount,
            ],
            { chain }
          );

        return await executeWithValidation(executeTransaction);
      } catch (error) {
        console.error('❌ Deallocation error:', error);
        return handleWeb3Error(error);
      }
    },
    [contract, chain, executeWithValidation]
  );

  return { allocate, deallocate, contract };
};
