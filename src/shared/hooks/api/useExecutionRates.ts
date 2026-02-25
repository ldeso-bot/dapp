import { QuoteType } from '@/shared/components/CarbonClassCard/CarbonClassCard';
import { useQuery } from '@tanstack/react-query';
import { useChainId } from '../web3/useChainId';
import { useApi } from './useApi';

type ExecutionRateQuote = {
  carbonClassId: string;
  kvcmPerTonne: number;
  usdcPerTonne: number;
};

/**
 * Fetches execution-rate quotes for all registered carbon classes.
 * Only one API call is made — the endpoint is selected based on quoteType.
 */
export function useExecutionRates(quoteType: QuoteType) {
  const { get } = useApi();
  const chainId = useChainId();

  const path =
    quoteType === QuoteType.retire
      ? '/api/retirement-quotes'
      : '/api/swap-quotes';

  return useQuery({
    queryKey: ['execution-rates', quoteType, chainId],
    queryFn: async () => {
      const result = await get<unknown>(path);
      return Array.isArray(result) ? (result as ExecutionRateQuote[]) : [];
    },
    staleTime: 60_000,
  });
}
