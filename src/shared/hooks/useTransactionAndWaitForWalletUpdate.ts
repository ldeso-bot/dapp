import { useTransactionWithValidation } from '@/features/MyActivities/hooks/useTransactionWithValidation';
import { getWalletDataQueryKey } from '@/shared/hooks/api/walletData.queryKey';
import { useChainId } from '@/shared/hooks/web3/useChainId';
import { useAccount } from 'wagmi';
import { WalletData } from '../models/walletData';

type UseTransactionAndWaitForWalletUpdateParams = {
  valueFetcher: (walletData: WalletData) => number | string | boolean;
};

export const useTransactionAndWaitForWalletUpdate = ({
  valueFetcher,
}: UseTransactionAndWaitForWalletUpdateParams) => {
  const { address: userAddress } = useAccount();
  const chainId = useChainId();
  const queryKey = getWalletDataQueryKey(chainId, userAddress);

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
