import { alertAtom } from '@/features/Alert/alert.atom';
import { ExecuteWithValidationResult } from '@/features/MyActivities/hooks/useTransactionWithValidation';
import { useFormo } from '@formo/analytics';
import { useSetAtom } from 'jotai';
import { useState } from 'react';

type TransactionOptions = {
  successTitle?: string;
  successDescription: string;
  errorTitle?: string;
  errorDescription?: string;
  successLinks?: Array<{ label: string; href: string }>;
  onSuccess?: () => void;
  successEvent?: {
    name: string;
    payload?: Record<string, unknown>;
  };
};

export const useTransactionHandler = () => {
  const analytics = useFormo();
  const setAlert = useSetAtom(alertAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTransaction = async (
    transactionFn: () => Promise<ExecuteWithValidationResult>,
    options: TransactionOptions
  ) => {
    setIsSubmitting(true);
    try {
      const result = await transactionFn();

      if (result.hash) {
        if (options.successEvent?.name && analytics) {
          analytics.track(options.successEvent.name, {
            ...options.successEvent.payload,
            hash: result.hash,
          });
        }
        setAlert({
          title: options.successTitle ?? 'Success',
          description: options.successDescription,
          type: 'success',
          links: options.successLinks ?? [],
        });
        options.onSuccess?.();
      }
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleTransaction, isSubmitting };
};
