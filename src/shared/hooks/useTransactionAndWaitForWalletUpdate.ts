import { useTransactionWithValidation } from '@/features/MyActivities/hooks/useTransactionWithValidation';
import { useAccount } from 'wagmi';
import { WalletData } from '../models/walletData';

type UseTransactionAndWaitForWalletUpdateParams = {
  valueFetcher: (walletData: WalletData) => number | string;
};

export const useTransactionAndWaitForWalletUpdate = ({
  valueFetcher,
}: UseTransactionAndWaitForWalletUpdateParams) => {
  const { address: userAddress } = useAccount();
  const queryKey = [`wallet-data-${userAddress}`];

  return useTransactionWithValidation<WalletData>({
    queryKey,
    validate: (walletData, previousData) => {
      if (!previousData) return false;
      const currentValue = valueFetcher(walletData);
      const previousValue = valueFetcher(previousData);

      if (currentValue && previousValue && currentValue !== previousValue) {
        return true;
      }
      return false;
    },
  });
};
