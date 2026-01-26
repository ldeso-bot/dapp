import { useTransactionAndWaitForWalletUpdate } from '@/shared/hooks/useTransactionAndWaitForWalletUpdate';
import { useContract } from '@/shared/hooks/web3/useContract';
import { WalletData } from '@/shared/models/walletData';
import { handleWeb3Error } from '@/shared/utils/web3.utils';
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
    async (params: AllocateKvcmParams): Promise<{ error: string | null }> => {
      try {
        if (!contract) {
          return { error: 'Contract is not ready' };
        }

        if (!chain) {
          return { error: 'Chain is not ready' };
        }

        if (!isAddress(params.carbonClass)) {
          return { error: 'Invalid carbon class address' };
        }

        if (params.amount <= 0n) {
          return { error: 'Amount must be greater than 0' };
        }

        const executeTransaction = () =>
          contract.write.allocateKvcm(
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
    async (params: DeallocateKvcmParams): Promise<{ error: string | null }> => {
      try {
        if (!contract) {
          return { error: 'Contract is not ready' };
        }

        if (!chain) {
          return { error: 'Chain is not ready' };
        }

        if (!isAddress(params.carbonClass)) {
          return { error: 'Invalid carbon class address' };
        }

        if (params.amount <= 0n) {
          return { error: 'Amount must be greater than 0' };
        }

        const executeTransaction = () =>
          contract.write.deallocateKvcm(
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
