import { PROTOCOL_DATA_CACHE_TIME_SECONDS } from '@/shared/constants/config.constants';
import {
  AERODROME_K2_USDC_POOL_INDEX,
  AERODROME_KVCM_USDC_POOL_INDEX,
} from '@/shared/constants/contracts.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { SubgraphTokenSymbol } from '@/shared/constants/tokens.constants';
import { AllMetrics, Metrics } from '@/shared/models/ProtocolData';
import { getAerodromePoolInfoByIndex } from '@/shared/utils/aerodrome.utils';
import {
  formatStringToNumber,
  getSdk,
  Sdk,
} from '@/shared/utils/subgraph.utils';
import { TokenSnapshot_Filter } from '@generated/gql/types/protocol.types';
import { unstable_cache } from 'next/cache';
import { mapToObj } from 'remeda';
import { base } from 'viem/chains';
import { getHoursSinceEpoch24HoursAgo } from './protocol.utils';

export const getTokenMetrics = async (
  chainId: ChainId
): Promise<AllMetrics> => {
  const sdk = getSdk(chainId);
  return unstable_cache(
    async () => getTokenMetricsUncached(sdk),
    [`token-metrics-${chainId}`],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )();
};

const getMainnetKvcmPrice = async (): Promise<number> => {
  try {
    const mainnetSdk = getSdk(base.id);
    const tokensResponse = await mainnetSdk.protocol.getTokens();
    const kvcmToken = tokensResponse.tokens.find((t) => t?.symbol === 'KVCM');
    if (kvcmToken?.priceUsdc?.priceUsdc) {
      return formatStringToNumber(kvcmToken.priceUsdc.priceUsdc, 6);
    }
    return 0;
  } catch (error) {
    console.error('Failed to fetch mainnet KVCM price:', error);
    return 0;
  }
};

const getMainnetK2Price = async (): Promise<number> => {
  try {
    const mainnetSdk = getSdk(base.id);
    const tokensResponse = await mainnetSdk.protocol.getTokens();
    const k2Token = tokensResponse.tokens.find((t) => t?.symbol === 'K2');
    if (k2Token?.priceUsdc?.priceUsdc) {
      return formatStringToNumber(k2Token.priceUsdc.priceUsdc, 6);
    }
    return 0;
  } catch (error) {
    console.error('Failed to fetch mainnet K2 price:', error);
    return 0;
  }
};

const getTokenMetricsUncached = async (sdk: Sdk): Promise<AllMetrics> => {
  const [kvcmUsdcPool, k2UsdcPool, tokensResponse, ...tokenSnapshotsResponses] =
    await Promise.all([
      getAerodromePoolInfoByIndex(AERODROME_KVCM_USDC_POOL_INDEX),
      getAerodromePoolInfoByIndex(AERODROME_K2_USDC_POOL_INDEX),
      sdk.protocol.getTokens(),
      ...['KVCM', 'K2', 'KVCM_K2_LP', 'KVCM_USDC_LP'].map((symbol) =>
        sdk.protocol
          .getTokenSnapshots({
            where: {
              hoursSinceEpoch_lte: getHoursSinceEpoch24HoursAgo().toString(),
              symbol,
            } as TokenSnapshot_Filter,
          })
          .then((response) => response.tokenSnapshots[0])
      ),
    ]);

  // Create maps for faster lookups
  const tokensMap = mapToObj(tokensResponse.tokens, (t) => [
    t?.symbol ?? '',
    t,
  ]);

  const tokenSnapshotsMap = mapToObj(tokenSnapshotsResponses, (t) => [
    t?.symbol ?? '',
    t,
  ]);

  const getProtocolTokenMetrics = async (
    symbol: SubgraphTokenSymbol
  ): Promise<Metrics> => {
    const token = tokensMap[symbol];
    const snapshot = tokenSnapshotsMap[symbol];

    // Supply
    const supply = formatStringToNumber(token?.totalSupply, 18);

    const snapshotSupply = snapshot?.supply
      ? formatStringToNumber(snapshot.supply, 18)
      : supply;

    const supplyChangePercent24h =
      supply && snapshotSupply ? (supply - snapshotSupply) / snapshotSupply : 0;

    // Supply locked
    const supplyLocked = formatStringToNumber(token?.totalAmountLocked, 18);

    const snapshotSupplyLocked = snapshot?.totalAmountLocked
      ? formatStringToNumber(snapshot.totalAmountLocked, 18)
      : supplyLocked;

    const supplyLockedChangePercent24h =
      supplyLocked && snapshotSupplyLocked
        ? (supplyLocked - snapshotSupplyLocked) / snapshotSupplyLocked
        : 0;

    let tokenPriceUSD = formatStringToNumber(token?.priceUsdc?.priceUsdc, 6);
    if (symbol === 'KVCM') {
      const mainnetPrice = await getMainnetKvcmPrice();
      if (mainnetPrice > 0) {
        tokenPriceUSD = mainnetPrice;
      }
    } else if (symbol === 'K2') {
      const mainnetPrice = await getMainnetK2Price();
      if (mainnetPrice > 0) {
        tokenPriceUSD = mainnetPrice;
      }
    }
    const valueUSD = tokenPriceUSD;

    const snapshotValueUSD = snapshot?.priceUsdc
      ? formatStringToNumber(snapshot.priceUsdc, 6)
      : valueUSD;

    const valueUSDChangePercent24h =
      valueUSD && snapshotValueUSD
        ? (valueUSD - snapshotValueUSD) / snapshotValueUSD
        : 0;

    // Address
    const address = token?.address || '';

    const valueLockedUSD = supplyLocked * valueUSD;

    return {
      valueUSD,
      valueUSDChangePercent24h,
      supply,
      supplyChangePercent24h,
      supplyLocked,
      supplyLockedChangePercent24h,
      address,
      valueLockedUSD,
    };
  };

  const getLpTokenMetrics = (
    symbol: SubgraphTokenSymbol,
    token0PriceUSD: number,
    token1PriceUSD: number
  ): Metrics => {
    const token = tokensMap[symbol];
    const pool = symbol === 'KVCM_K2_LP' ? k2UsdcPool : kvcmUsdcPool;

    // Supply
    const supply = pool.liquidity;

    // Supply locked
    const supplyLocked = pool.liquidity;

    // Price
    const valueLockedUSD =
      pool.reserve0 * token0PriceUSD + pool.reserve1 * token1PriceUSD;

    // Address
    const address = token?.address || '';

    return {
      valueUSD: 0,
      valueUSDChangePercent24h: 0,
      supply,
      supplyChangePercent24h: 0,
      supplyLocked,
      supplyLockedChangePercent24h: 0,
      valueLockedUSD,
      address,
    };
  };

  const kvcmMetrics = await getProtocolTokenMetrics('KVCM');
  const k2Metrics = await getProtocolTokenMetrics('K2');

  const kvcmK2LpMetrics = getLpTokenMetrics(
    'KVCM_K2_LP',
    kvcmMetrics.valueUSD,
    k2Metrics.valueUSD
  );
  const kvcmUsdcLpMetrics = getLpTokenMetrics(
    'KVCM_USDC_LP',
    kvcmMetrics.valueUSD,
    1
  );

  return {
    kvcm: kvcmMetrics,
    k2: k2Metrics,
    'kvcm-k2': kvcmK2LpMetrics,
    'kvcm-usdc': kvcmUsdcLpMetrics,
  };
};
