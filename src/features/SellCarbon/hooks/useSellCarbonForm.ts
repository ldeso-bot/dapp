import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { parseAmount } from '@/shared/utils/string.utils';
import { useMemo } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { SellCarbonFields } from '../sellCarbon.constants';

export const useSellCarbonForm = (watch: UseFormWatch<SellCarbonFields>) => {
  const { data: walletData, isLoading, refetch } = useWalletData();
  const creditBalances = useMemo(
    () => walletData?.creditBalances ?? [],
    [walletData?.creditBalances]
  );

  const token = watch('token');
  const carbonClass = watch('carbonClass');
  const amountToSellTonnes = watch('amountToSellTonnes');

  const selectedBalance = useMemo(
    () => creditBalances.find((b) => b.creditToken.creditTokenId === token),
    [creditBalances, token]
  );

  const carbonClasses = useMemo(
    () => selectedBalance?.registeredClasses ?? [],
    [selectedBalance]
  );

  const selectedCarbonClass = useMemo(
    () => carbonClasses.find((c) => c.carbonClassId === carbonClass),
    [carbonClasses, carbonClass]
  );

  const amountToSellWei = useMemo(
    () =>
      selectedBalance && amountToSellTonnes
        ? parseAmount(amountToSellTonnes, selectedBalance.creditToken.decimals)
        : BigInt(0),
    [selectedBalance, amountToSellTonnes]
  );

  return {
    walletData,
    isLoading,
    creditBalances,
    token,
    carbonClass,
    selectedBalance,
    selectedCarbonClass,
    carbonClasses,
    amountToSellTonnes,
    amountToSellWei,
    refetch,
  };
};
