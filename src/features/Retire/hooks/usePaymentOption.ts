import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { paymentOptions } from '../retire.constants';

export const usePaymentOption = (id: string | undefined) => {
  const selectedPaymentOption =
    paymentOptions.find((option) => option.token.id === id) ??
    paymentOptions[0];

  const { data: walletData } = useWalletData();
  const balance =
    selectedPaymentOption && selectedPaymentOption.token
      ? walletData?.balances[selectedPaymentOption.token.id]
      : 0;
  return {
    ...selectedPaymentOption,
    balance,
  };
};
