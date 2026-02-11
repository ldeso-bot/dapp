import RetirementAggregator from '@/shared/utils/abis/RetirementAggregator';
import { parseAmount } from '@/shared/utils/string.utils';
import { useEffect, useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useReadContract } from 'wagmi';
import { RetireCarbonFields } from '../retire.constants';
import { useRetireCarbonForm } from './useRetireCarbonForm';

type UseRetireCarbonQuoterParams = {
  form: UseFormReturn<RetireCarbonFields>;
};

const useRetirementQuote = (
  params: UseRetireCarbonQuoterParams & { amount: bigint }
) => {
  const [priceQuotedWei, setPriceQuotedWei] = useState<bigint>(BigInt(0));
  const { form, amount } = params;
  const {
    selectedCarbonCredit,
    selectedCarbonClass,
    inputTokenInfo,
    retirementContractInfo,
  } = useRetireCarbonForm(form.watch);

  const args = useMemo(() => {
    return [
      selectedCarbonCredit?.address as `0x${string}`, // creditToken
      BigInt(selectedCarbonCredit?.tokenId ?? 0), // tokenId
      amount, // amount
      inputTokenInfo.address as `0x${string}`, // inputTokenAddress
      selectedCarbonClass?.carbonClassId as `0x${string}`, // carbonClass
      BigInt(0), // couponTonnes
    ] as const;
  }, [selectedCarbonCredit, selectedCarbonClass, inputTokenInfo, amount]);

  const res = useReadContract({
    address: retirementContractInfo?.address as `0x${string}` | undefined,
    abi: RetirementAggregator,
    functionName: 'quoteRetireCreditViaKlima',
    args,
    query: {
      enabled:
        !!args &&
        !!retirementContractInfo &&
        !!selectedCarbonCredit &&
        !!inputTokenInfo,
      staleTime: 0,
    },
  });
  useEffect(() => {
    if (amount === BigInt(0)) {
      setPriceQuotedWei(BigInt(0));
      return;
    }
    if (res.isLoading) {
      return;
    }
    if (!res.data) {
      setPriceQuotedWei(BigInt(0));
      return;
    }
    if (res.data.length < 2) {
      console.error('Invalid quote data', res.data);
      return;
    }
    const quoteWei = res.data[1];
    setPriceQuotedWei(quoteWei);
  }, [res, amount]);

  return {
    ...res,
    data: priceQuotedWei,
  };
};

/**
 * Make data available given the state of the Retire Carbon Form
 * @param param0
 * @returns
 */
export const useRetireCarbonQuoter = ({
  form,
}: UseRetireCarbonQuoterParams) => {
  const { selectedCarbonCredit } = useRetireCarbonForm(form.watch);

  const amountTonnes = form.watch('amountTonnes');
  const amountForTransaction = parseAmount(
    amountTonnes,
    selectedCarbonCredit?.decimals
  );

  const priceQuotedWei = useRetirementQuote({
    form,
    amount: amountForTransaction,
  });
  const priceQuotedForOneTonWei = useRetirementQuote({
    form,
    amount: parseAmount(1, selectedCarbonCredit?.decimals),
  });

  return {
    priceQuotedWei: priceQuotedWei.data,
    priceQuotedForOneTonWei: priceQuotedForOneTonWei.data,
    isError: priceQuotedWei.isError || priceQuotedForOneTonWei.isError,
  };
};
