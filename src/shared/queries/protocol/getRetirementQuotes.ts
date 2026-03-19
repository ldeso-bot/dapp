import { QUOTES_CACHE_TIME_SECONDS } from '@/shared/constants/config.constants';
import contracts from '@/shared/constants/contracts.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import RetirementAggregatorAbi from '@/shared/utils/abis/RetirementAggregator';
import { getPublicClient } from '@/shared/utils/web3.utils';
import { cached } from '@/shared/utils/cache.utils';
import { Address, parseUnits } from 'viem';
import {
  CarbonClassQuote,
  getClassesWithCredit,
  kvcmWeiAmountsToUsdc,
  mapToQuotes,
} from './quotes.utils';

type RetirementQuote = CarbonClassQuote;

/**
 * Fetches on-chain retirement quotes from the Retirement Aggregator for each
 * registered carbon class, then converts the kVCM amounts to USDC via the
 * Aerodrome KVCM/USDC pool's getAmountOut.
 */
const getRetirementQuotes = async (
  chainId: ChainId,
  tonneSizes: number[] = [1]
): Promise<RetirementQuote[]> => {
  const tonneSize = tonneSizes[0] ?? 1;
  const raAddress = contracts.RetirementAggregator[chainId] as Address;
  const kvcmAddress = contracts.KVCM[chainId] as Address;
  const client = getPublicClient(chainId);

  const classesWithCredit = await getClassesWithCredit(chainId);
  if (classesWithCredit.length === 0) return [];

  const quoteContracts = classesWithCredit.map(
    ({ creditAddress, creditTokenId, creditDecimals, carbonClassId }) => ({
      address: raAddress,
      abi: RetirementAggregatorAbi,
      functionName: 'quoteRetireCreditViaKlima' as const,
      args: [
        creditAddress,
        creditTokenId,
        parseUnits(String(tonneSize), creditDecimals),
        kvcmAddress, // pay with KVCM → result is kVCM cost
        carbonClassId as Address,
        BigInt(0), // couponTonnes: 0
      ] as const,
    })
  );

  const quoteResults = await client.multicall({ contracts: quoteContracts });

  // Output tuple: [amount, kvcmCost, ...]
  const kvcmWeiAmounts = quoteResults.map((result) => {
    if (!result || result.status !== 'success' || !result.result) return 0n;
    return (result.result as readonly [bigint, bigint, unknown, unknown])[1];
  });

  const usdcAmounts = await kvcmWeiAmountsToUsdc(chainId, kvcmWeiAmounts);
  return mapToQuotes(classesWithCredit, kvcmWeiAmounts, usdcAmounts);
};

export const getRetirementQuotesCached = async (
  chainId: ChainId,
  sizes: number[] = [1]
) => {
  const sortedSizes = [...sizes].sort((a, b) => a - b);

  return cached(
    async (chainId: ChainId, sizes: number[]) =>
      getRetirementQuotes(chainId, sizes),
    ['retirement-quotes', chainId, ...sortedSizes],
    { revalidate: QUOTES_CACHE_TIME_SECONDS }
  )(chainId, sortedSizes);
};
