import { alertAtom } from '@/features/Alert/alert.atom';
import { useSetAtom } from 'jotai';
import { useState } from 'react';

type TransactionOptions = {
  successTitle?: string;
  successDescription: string;
  errorTitle?: string;
  errorDescription?: string;
  successLinks?: Array<{ label: string; href: string }>;
  onSuccess?: () => void;
};

export const useTransactionHandler = () => {
  const setAlert = useSetAtom(alertAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTransaction = async (
    transactionFn: () => Promise<{ error: string | null }>,
    options: TransactionOptions
  ) => {
    setIsSubmitting(true);
    try {
      const { error } = await transactionFn();

      if (!error) {
        setAlert({
          title: options.successTitle ?? 'Success',
          description: options.successDescription,
          type: 'success',
          links: options.successLinks ?? [],
        });
        options.onSuccess?.();
        return { success: true, error: null };
      } else {
        return { success: false, error };
      }
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
