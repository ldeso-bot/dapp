import { PROTOCOL_DATA_CACHE_TIME_SECONDS } from '@/shared/constants/config.constants';
import {
  AERODROME_K2_USDC_POOL_INDEX,
  AERODROME_KVCM_USDC_POOL_INDEX,
} from '@/shared/constants/contracts.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import {
  SubgraphTokenSymbol,
  tokens,
} from '@/shared/constants/tokens.constants';
import { AllMetrics, Metrics } from '@/shared/models/ProtocolData';
import { getAerodromePoolInfoByIndex } from '@/shared/utils/aerodrome.utils';
import { cached } from '@/shared/utils/cache.utils';
import {
  formatStringToNumber,
  getSdk,
  Sdk,
} from '@/shared/utils/subgraph.utils';
import { getContract, getPublicClient } from '@/shared/utils/web3.utils';
import { TokenSnapshot_Filter } from '@generated/gql/types/protocol.types';
import { mapToObj } from 'remeda';
import { getHoursSinceEpoch24HoursAgo } from './protocol.utils';

export const getTokenMetrics = async (
  chainId: ChainId
): Promise<AllMetrics> => {
  const sdk = getSdk(chainId);
  return cached(
    async () => getTokenMetricsUncached(sdk),
    ['token-metrics', chainId],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )();
};

const getK2Supply = async (chainId: ChainId): Promise<number> => {
  const publicClient = getPublicClient(chainId);
  const contract = getContract(chainId, 'ProtocolOracle', publicClient);

  if (!contract.read.getK2Supply) {
    throw new Error('getK2Supply function not found on contract');
  }

  const result = (await contract.read.getK2Supply()) as bigint;
  return formatStringToNumber(result, 18);
};

const getTokenMetricsUncached = async (sdk: Sdk): Promise<AllMetrics> => {
  const [
    kvcmUsdcPool,
    kvcmK2Pool,
    k2Supply,
    tokensResponse,
    ...tokenSnapshotsResponses
  ] = await Promise.all([
    getAerodromePoolInfoByIndex(AERODROME_KVCM_USDC_POOL_INDEX),
    getAerodromePoolInfoByIndex(AERODROME_K2_USDC_POOL_INDEX),
    getK2Supply(sdk.chain),
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
    const supply =
      symbol === 'K2' ? k2Supply : formatStringToNumber(token?.totalSupply, 18);

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

    const tokenPriceUSD = formatStringToNumber(
      token?.priceUsdc?.priceUsdc,
      tokens.usdc.decimals
    );
    let k2Locked = 0;
    let kvcmLocked = 0;
    if (symbol === 'KVCM') {
      kvcmLocked = supplyLocked;
    } else if (symbol === 'K2') {
      k2Locked = supplyLocked;
    }
    const valueUSD = tokenPriceUSD;

    const snapshotValueUSD = snapshot?.priceUsdc
      ? formatStringToNumber(snapshot.priceUsdc, tokens.usdc.decimals)
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
      k2Locked,
      kvcmLocked,
    };
  };

  const getLpTokenMetrics = (
    symbol: SubgraphTokenSymbol,
    token0PriceUSD: number,
    token1PriceUSD: number
  ): Metrics => {
    const token = tokensMap[symbol];
    const getKvcmUsdcSpecifics = () => ({
      pool: kvcmUsdcPool,
      k2Locked: 0,
      kvcmLocked: kvcmUsdcPool.reserve0,
    });

    const getKvcmK2Specifics = () => ({
      pool: kvcmK2Pool,
      k2Locked: kvcmK2Pool.reserve1,
      kvcmLocked: kvcmK2Pool.reserve0,
    });

    const { pool, k2Locked, kvcmLocked } =
      symbol === 'KVCM_K2_LP' ? getKvcmK2Specifics() : getKvcmUsdcSpecifics();

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
      k2Locked,
      kvcmLocked,
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
