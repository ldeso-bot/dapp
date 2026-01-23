import { useTransactionWithValidation } from '@/features/MyHoldings/hooks/useTransactionWithValidation';
import { useContract } from '@/shared/hooks/web3/useContract';
import { WalletData } from '@/shared/models/walletData';
import { handleWeb3Error } from '@/shared/utils/web3.utils';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { isAddress } from 'viem';
import { useAccount } from 'wagmi';

type AllocateK2Params = {
  carbonClass: string;
  amount: bigint;
};

type DeallocateK2Params = {
  carbonClass: string;
  amount: bigint;
};

export const useAllocateK2 = () => {
  const queryClient = useQueryClient();
  const { contract } = useContract('StakingManagerDiamond');
  const { chain, address: userAddress } = useAccount();
  const queryKey = [`wallet-data-${userAddress}`];

  const { executeWithValidation } = useTransactionWithValidation<WalletData>({
    queryKey,
    validate: (walletData, previousData) => {
      if (!walletData?.allocations) return false;

      const currentTotal = walletData.allocations.reduce(
        (sum, alloc) => sum + alloc.amount,
        0
      );
      const previousTotal =
        previousData?.allocations.reduce(
          (sum, alloc) => sum + alloc.amount,
          0
        ) ?? 0;

      return currentTotal !== previousTotal;
    },
    getPreviousData: () => queryClient.getQueryData<WalletData>(queryKey),
  });

  const allocate = useCallback(
    async (params: AllocateK2Params): Promise<{ error: string | null }> => {
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
          contract.write.allocateK2(
            [params.amount, params.carbonClass as `0x${string}`],
            { chain }
          );

        return await executeWithValidation(executeTransaction);
      } catch (error) {
        console.error('❌ K2 allocation error:', error);
        return handleWeb3Error(error);
      }
    },
    [contract, chain, executeWithValidation]
  );

  const deallocate = useCallback(
    async (params: DeallocateK2Params): Promise<{ error: string | null }> => {
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
          contract.write.deallocateK2(
            [params.amount, params.carbonClass as `0x${string}`],
            { chain }
          );

        return await executeWithValidation(executeTransaction);
      } catch (error) {
        console.error('❌ K2 deallocation error:', error);
        return handleWeb3Error(error);
      }
    },
    [contract, chain, executeWithValidation]
  );

  return { allocate, deallocate, contract };
};