import contracts from '@/shared/constants/contracts.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import AerodromePoolAbi from '@/shared/utils/abis/AerodromePool';
import { getSdk } from '@/shared/utils/subgraph.utils';
import { getPublicClient } from '@/shared/utils/web3.utils';
import { CarbonClass_Filter } from '@generated/gql/types/protocol.types';
import { filter, isNonNullish } from 'remeda';
import { Address, formatUnits } from 'viem';
import { getCreditsTokenMap, mapToApiCreditToken } from './protocol.utils';

const KVCM_DECIMALS = 18;
const USDC_DECIMALS = 6;

type ClassWithCredit = {
  carbonClassId: string;
  creditAddress: Address;
  creditTokenId: bigint;
  creditDecimals: number;
};

export type CarbonClassQuote = {
  carbonClassId: string;
  /** Human-readable kVCM amount per tonne */
  kvcmPerTonne: number;
  /** Human-readable USDC equivalent per tonne (via KVCM/USDC pool) */
  usdcPerTonne: number;
};

/**
 * Fetches all registered carbon classes from the subgraph and resolves each
 * to its first registered credit's on-chain parameters.
 */
export const getClassesWithCredit = async (
  chainId: ChainId
): Promise<ClassWithCredit[]> => {
  const sdk = getSdk(chainId);
  const [classesResponse, creditsMap] = await Promise.all([
    sdk.protocol.getCarbonClasses({
      where: { isRegistered: true } as CarbonClass_Filter,
    }),
    getCreditsTokenMap(sdk),
  ]);

  return filter(
    (classesResponse?.carbonClasses ?? []).map((c) => {
      const firstRegistered = c.registeredCredits[0];
      if (!firstRegistered) return null;

      const credit = mapToApiCreditToken(
        sdk,
        firstRegistered.creditTokenId,
        creditsMap[firstRegistered.creditTokenId]
      );
      if (!credit) return null;

      return {
        carbonClassId: c.carbonClassId.toLowerCase(),
        creditAddress: credit.address as Address,
        creditTokenId: BigInt(credit.tokenId),
        creditDecimals: credit.decimals,
      };
    }),
    isNonNullish
  );
};

/**
 * Converts an array of raw kVCM wei amounts to USDC via the Aerodrome
 * KVCM/USDC pool's getAmountOut, using multicall.
 */
export const kvcmWeiAmountsToUsdc = async (
  chainId: ChainId,
  kvcmWeiAmounts: bigint[]
): Promise<(bigint | null)[]> => {
  const client = getPublicClient(chainId);
  const kvcmAddress = contracts.KVCM[chainId] as Address;
  const kvcmUsdcPoolAddress = contracts.KVCM_USDC[chainId] as Address;

  const poolContracts = kvcmWeiAmounts.map((kvcmWei) => ({
    address: kvcmUsdcPoolAddress,
    abi: AerodromePoolAbi,
    functionName: 'getAmountOut' as const,
    args: [kvcmWei, kvcmAddress] as const,
  }));

  const results = await client.multicall({ contracts: poolContracts });

  return results.map((r) =>
    r?.status === 'success' && r.result ? (r.result as bigint) : null
  );
};

/**
 * Maps parallel arrays of kVCM wei amounts and USDC amounts into
 * CarbonClassQuote objects.
 */
export const mapToQuotes = (
  classesWithCredit: ClassWithCredit[],
  kvcmWeiAmounts: bigint[],
  usdcAmounts: (bigint | null)[]
): CarbonClassQuote[] =>
  classesWithCredit.map(({ carbonClassId }, i) => ({
    carbonClassId,
    kvcmPerTonne: Number(formatUnits(kvcmWeiAmounts[i] ?? 0n, KVCM_DECIMALS)),
    usdcPerTonne:
      usdcAmounts[i] != null
        ? Number(formatUnits(usdcAmounts[i]!, USDC_DECIMALS))
        : 0,
  }));
