import { useRefetchWithRetry } from '@/shared/hooks/useRefetchWithRetry';
import { useWaitForTransaction } from '@/shared/hooks/web3/useWaitForTransaction';
import { WalletData } from '@/shared/models/walletData';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

type ValidationFunction<T = unknown> = (data: T, previousData?: T) => boolean;

type UseTransactionWithValidationParams<T = unknown> = {
  queryKey: string[];
  validate?: ValidationFunction<T>;
  getPreviousData?: () => T | undefined;
};

export const useTransactionWithValidation = <T = WalletData>(
  props: UseTransactionWithValidationParams<T>
) => {
  const queryClient = useQueryClient();
  const { refetchWithRetry } = useRefetchWithRetry();
  const { waitForTransaction } = useWaitForTransaction();
  const { queryKey, validate, getPreviousData } = props;
  const [isExecuting, setIsExecuting] = useState(false);

  const executeWithValidation = useCallback(
    async (
      executeTransaction: () => Promise<`0x${string}`>
    ): Promise<{ error: string | null }> => {
      setIsExecuting(true);
      try {
        const previousData = getPreviousData?.();
        const txHash = await executeTransaction();

        if (!txHash) {
          throw new Error('No transaction hash');
        }

        await waitForTransaction(txHash);
        await queryClient.invalidateQueries({ queryKey });
        if (validate) {
          const dataUpdated = await refetchWithRetry({
            queryKey,
            maxRetries: 10,
            retryDelay: 1000,
            validate: (data: unknown) => {
              return validate(data as T, previousData);
            },
          });

          if (!dataUpdated) {
            console.warn(
              '⚠️ Data validation timeout, but transaction was successful'
            );
          }
        }
        return { error: null };
      } catch (error) {
        console.error('❌ Transaction error:', error);
        throw error;
      } finally {
        setIsExecuting(false);
      }
    },
    [
      queryKey,
      validate,
      getPreviousData,
      waitForTransaction,
      queryClient,
      refetchWithRetry,
    ]
  );

  return { executeWithValidation, isExecuting };
};
