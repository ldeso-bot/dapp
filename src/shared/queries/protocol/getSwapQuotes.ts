import contracts from '@/shared/constants/contracts.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import AAMDiamondAbi from '@/shared/utils/abis/AAMDiamond';
import { getPublicClient } from '@/shared/utils/web3.utils';
import { Address, parseUnits, zeroAddress } from 'viem';
import {
  CarbonClassQuote,
  getClassesWithCredit,
  kvcmWeiAmountsToUsdc,
  mapToQuotes,
} from './quotes.utils';

type SwapQuote = CarbonClassQuote;

/**
 * Fetches on-chain swap quotes from the AAMDiamond for each registered carbon
 * class, then converts the kVCM amounts to USDC via the Aerodrome KVCM/USDC
 * pool's getAmountOut.
 *
 * maturityId is fixed to 0 (K2), matching the existing sell-carbon flow.
 */
export const getSwapQuotes = async (
  chainId: ChainId,
  tonneSizes: number[] = [1]
): Promise<SwapQuote[]> => {
  const tonneSize = tonneSizes[0] ?? 1;
  const aamAddress = contracts.AAMDiamond[chainId] as Address;
  const client = getPublicClient(chainId);

  const classesWithCredit = await getClassesWithCredit(chainId);
  if (classesWithCredit.length === 0) return [];

  const quoteContracts = classesWithCredit.map(
    ({ creditAddress, creditTokenId, creditDecimals, carbonClassId }) => ({
      address: aamAddress,
      abi: AAMDiamondAbi,
      functionName: 'getSwapQuote' as const,
      args: [
        carbonClassId as Address,
        creditAddress,
        creditTokenId,
        parseUnits(String(tonneSize), creditDecimals),
        BigInt(0), // maturityId: 0 = K2 (matches existing sell flow)
        { tonnes: BigInt(0), from: zeroAddress },
      ] as const,
    })
  );

  const quoteResults = await client.multicall({ contracts: quoteContracts });

  // Output tuple: [tonnes, price, isLiquidSwap, ...]
  const kvcmWeiAmounts = quoteResults.map((result) => {
    if (!result || result.status !== 'success' || !result.result) return 0n;
    return (result.result as readonly [bigint, bigint, boolean, unknown])[1];
  });

  const usdcAmounts = await kvcmWeiAmountsToUsdc(chainId, kvcmWeiAmounts);
  return mapToQuotes(classesWithCredit, kvcmWeiAmounts, usdcAmounts);
};
