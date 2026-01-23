import { useTransactionHandler } from '@/shared/hooks/useTransactionHandler';
import { useContractInfo } from '@/shared/hooks/web3/useContract';
import RewardManagerDiamond from '@/shared/utils/abis/RewardManagerDiamond';
import { useQueryClient } from '@tanstack/react-query';
import { Address } from 'viem';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';

export const useClaimKvcmLockRewards = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const { handleTransaction, isSubmitting } = useTransactionHandler();
  const rewardManager = useContractInfo('RewardManagerDiamond');
  const queryClient = useQueryClient();

  const claimToken = async (lockId: number) => {
    if (!address || !walletClient || !publicClient || !rewardManager.address) {
      return {
        success: false,
        error: 'Wallet not connected or contract not found',
      };
    }

    return handleTransaction(
      async () => {
        try {
          const hash = await walletClient.writeContract({
            address: rewardManager.address as Address,
            abi: RewardManagerDiamond,
            functionName: 'handleUnlockAndClaim',
            args: [address, BigInt(lockId), address],
          });

          await publicClient.waitForTransactionReceipt({
            hash,
            confirmations: 2,
          });

          await queryClient.invalidateQueries({
            queryKey: [`wallet-data-${address}`],
          });

          return { error: null };
        } catch (error) {
          console.error('Error claiming token:', error);
          return {
            error:
              error instanceof Error
                ? error.message
                : 'An unexpected error occurred',
          };
        }
      },
      {
        successTitle: 'Success',
        successDescription: 'Token claimed successfully',
      }
    );
  };

  return { claimToken, isSubmitting };
};
