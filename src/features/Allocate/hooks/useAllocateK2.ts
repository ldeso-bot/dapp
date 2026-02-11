import { useTransactionAndWaitForWalletUpdate } from '@/shared/hooks/useTransactionAndWaitForWalletUpdate';
import { useContract } from '@/shared/hooks/web3/useContract';
import { WalletData } from '@/shared/models/walletData';
import { handleWeb3Error } from '@/shared/utils/web3.utils';
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
  const { contract } = useContract('StakingManagerDiamond');
  const { chain } = useAccount();

  const { executeWithValidation } = useTransactionAndWaitForWalletUpdate({
    valueFetcher: (walletData: WalletData) =>
      walletData?.allocations?.reduce((sum, alloc) => sum + alloc.amount, 0) ??
      0,
  });

  const allocate = useCallback(
    async (params: AllocateK2Params): Promise<{ error: string | null }> => {
      try {
        const allocateK2 = contract?.write.allocateK2;
        if (!allocateK2) {
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
          allocateK2([params.amount, params.carbonClass as `0x${string}`], {
            chain,
          });

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
        const deallocateK2 = contract?.write.deallocateK2;
        if (!deallocateK2) {
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
          deallocateK2([params.amount, params.carbonClass as `0x${string}`], {
            chain,
          });

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
