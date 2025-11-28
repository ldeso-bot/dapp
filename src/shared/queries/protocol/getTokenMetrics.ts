import { PROTOCOL_DATA_CACHE_TIME_SECONDS } from '@/shared/constants/config.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { SubgraphTokenSymbol } from '@/shared/constants/tokens.constants';
import { AllMetrics, Metrics } from '@/shared/models/ProtocolData';
import { formatStringToNumber, getSdk } from '@/shared/utils/subgraph.utils';
import { TokenSnapshot_Filter } from '@generated/gql/types/protocol.types';
import { unstable_cache } from 'next/cache';
import { mapToObj } from 'remeda';
import { getHoursSinceEpoch24HoursAgo } from './protocol.utils';

export const getTokenMetrics = async (
  chainId: ChainId
): Promise<AllMetrics> => {
  return unstable_cache(
    async () => getTokenMetricsUncached(chainId),
    [`token-metrics-${chainId}`],
    { revalidate: PROTOCOL_DATA_CACHE_TIME_SECONDS }
  )();
};

const getTokenMetricsUncached = async (
  chainId: ChainId
): Promise<AllMetrics> => {
  const sdk = getSdk(chainId);

  const [tokensResponse, ...tokenSnapshotsResponses] = await Promise.all([
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

  const getOneTokenMetrics = (symbol: SubgraphTokenSymbol): Metrics => {
    const token = tokensMap[symbol];
    const snapshot = tokenSnapshotsMap[symbol];

    // Supply
    const supply = formatStringToNumber(token?.totalSupply, 18);

    const snapshotSupply = snapshot?.supply
      ? formatStringToNumber(snapshot.supply, 18)
      : supply;

    const supplyChangePercent24h =
      supply && snapshotSupply ? (supply - snapshotSupply) / snapshotSupply : 0;

    // TVL
    const supplyLocked = formatStringToNumber(token?.totalAmountLocked, 18);

    const snapshotTVL = snapshot?.totalAmountLocked
      ? formatStringToNumber(snapshot.totalAmountLocked, 18)
      : supplyLocked;

    const supplyLockedChangePercent24h =
      supplyLocked && snapshotTVL
        ? (supplyLocked - snapshotTVL) / snapshotTVL
        : 0;

    // Price
    const valueUSD = formatStringToNumber(token?.priceUsdc?.priceUsdc, 6);

    const snapshotValueUSD = snapshot?.priceUsdc
      ? formatStringToNumber(snapshot.priceUsdc, 6)
      : valueUSD;

    const valueUSDChangePercent24h =
      valueUSD && snapshotValueUSD
        ? (valueUSD - snapshotValueUSD) / snapshotValueUSD
        : 0;

    // Address
    const address = token?.address || '';

    return {
      valueUSD,
      valueUSDChangePercent24h,
      supply,
      supplyChangePercent24h,
      supplyLocked,
      supplyLockedChangePercent24h,
      address,
    };
  };

  return {
    kvcm: getOneTokenMetrics('KVCM'),
    k2: getOneTokenMetrics('K2'),
    'kvcm-k2': getOneTokenMetrics('KVCM_K2_LP'),
    'kvcm-usdc': getOneTokenMetrics('KVCM_USDC_LP'),
  };
};
