import { DEFAULT_SLIPPAGE } from '@/shared/constants/config.constants';
import { useCarbonClassRegisteredCreditTokens } from '@/shared/hooks/api/useCreditTokens';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useContractInfo } from '@/shared/hooks/web3/useContract';
import { applySlippage } from '@/shared/utils/math.utils';
import { parseAmount } from '@/shared/utils/string.utils';
import { formatStringToNumber } from '@/shared/utils/subgraph.utils';
import { useMemo } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { RetireCarbonFields } from '../retire.constants';
import { usePaymentOption } from './usePaymentOption';

/**
 * Make data available given the state of the Retire Carbon Form
 * @param watch - form.watch function from react-hook-form
 * @returns
 */
export const useRetireCarbonForm = (
  watch: UseFormWatch<RetireCarbonFields>
) => {
  // Wallet data for refetch
  const { refetch: refetchWalletData, data: walletData } = useWalletData();

  // Protocol data
  const {
    data: protocolData,
    isLoading: isLoadingProtocolData,
    refetch: refetchProtocolData,
  } = useProtocolData();

  const carbonClasses = useMemo(
    () => protocolData?.carbonClasses ?? [],
    [protocolData?.carbonClasses]
  );

  const selectedCarbonClassId = watch('carbonClass');
  const selectedCarbonClass = useMemo(
    () => carbonClasses.find((c) => c.carbonClassId === selectedCarbonClassId),
    [carbonClasses, selectedCarbonClassId]
  );

  const selectedCarbonCreditId = watch('carbonCredit');
  const amountTonnes = watch('amountTonnes');
  const paymentMethod = watch('paymentMethod');
  const priceQuotedWei = watch('priceQuotedWei');

  // Fetch credit registered for the selected carbon class
  const { data: carbonCredits } =
    useCarbonClassRegisteredCreditTokens(selectedCarbonClass);

  const selectedCarbonCredit = useMemo(
    () =>
      carbonCredits?.find((c) => c.creditTokenId === selectedCarbonCreditId),
    [carbonCredits, selectedCarbonCreditId]
  );

  // Payment method
  const selectedPaymentOption = usePaymentOption(paymentMethod);

  const inputTokenInfo = useContractInfo(
    selectedPaymentOption?.token?.contractName ?? 'KVCM'
  );
  const retirementContractInfo = useContractInfo('RetirementAggregator');

  // Computed values for transaction
  const amountWei = useMemo(
    () =>
      selectedCarbonCredit && amountTonnes
        ? parseAmount(amountTonnes, selectedCarbonCredit.decimals)
        : BigInt(0),
    [selectedCarbonCredit, amountTonnes]
  );

  const maxInputTokenInWei = useMemo(
    () =>
      priceQuotedWei
        ? applySlippage(priceQuotedWei, DEFAULT_SLIPPAGE)
        : BigInt(0),
    [priceQuotedWei]
  );

  const refetch = async () => {
    await Promise.all([refetchWalletData(), refetchProtocolData()]);
  };

  const priceQuoted = formatStringToNumber(
    priceQuotedWei,
    selectedPaymentOption?.token?.decimals ?? 18
  );

  // Check if selected credit symbol starts with PURO
  const isConsumptionInfoRequiredCredit =
    selectedCarbonCredit?.symbol?.startsWith('PURO') ||
    selectedCarbonCredit?.symbol?.startsWith('KLIM');

  const inputTokenBalance =
    walletData?.balances?.[selectedPaymentOption?.token?.id ?? 'kvcm'] ?? 0;
  const asSufficientInputToken = inputTokenBalance > priceQuoted;

  return {
    carbonClasses,
    carbonCredits,
    selectedCarbonClass,
    selectedCarbonCredit,
    selectedPaymentOption,
    isLoading: isLoadingProtocolData,
    inputTokenInfo,
    retirementContractInfo,
    amountTonnes,
    priceQuotedWei,
    priceQuoted,
    amountWei,
    maxInputTokenInWei,
    isConsumptionInfoRequiredCredit,
    asSufficientInputToken,
    refetch,
  };
};
