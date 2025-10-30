import { SubgraphTokenSymbol } from '@/shared/constants/tokens.constants';
import { AllMetrics, Metrics } from '@/shared/models/ProtocolData';
import { Sdk } from '@/shared/utils/subgraph.utils';
import { formatUnits } from 'viem';

export const getTokenMetrics = async (sdk: Sdk): Promise<AllMetrics> => {
  const daysSinceEpoch = Math.floor(Date.now() / 1000 / 86400);
  const [tokensResponse, tokenSnapshotsResponse] = await Promise.all([
    sdk.protocol.getTokens(),
    sdk.protocol.getTokenSnapshots({
      daysSinceEpoch: (daysSinceEpoch -1).toString(),
    }),
  ]);

  const getOneTokenMetrics = (symbol: SubgraphTokenSymbol): Metrics => {
    const token = tokensResponse.tokens.find((t) => t.symbol === symbol);
    const snapshot = tokenSnapshotsResponse.tokenSnapshots.find(
      (p) => p.symbol === symbol
    );
    // Supply
    const supply = Number(
      formatUnits(BigInt(token?.totalSupply ?? '0'), 18)
    );

    const snapshotSupply = snapshot?.supply
      ? Number(formatUnits(BigInt(snapshot.totalAmountLocked), 18))
      : supply;

    const supplyChangePercent24h =
      supply ? (supply - snapshotSupply) / supply : 0;


    // TVL
    const supplyLocked = Number(
      formatUnits(BigInt(token?.totalAmountLocked ?? '0'), 18)
    );

    const snapshotTVL = snapshot?.totalAmountLocked
      ? Number(formatUnits(BigInt(snapshot.totalAmountLocked), 18))
      : supplyLocked;

    const supplyLockedChangePercent24h =
      supplyLocked ? (supplyLocked - snapshotTVL) / supplyLocked : 0;

    // Price
    const valueUSD = Number(
      formatUnits(BigInt(token?.priceUsdc?.priceUsdc ?? '0'), 6)
    );

    const snapshotPriceUsdc = snapshot?.priceUsdc
      ? Number(formatUnits(BigInt(snapshot.priceUsdc), 6))
      : valueUSD;

     const valueChangePercent24h = valueUSD
      ? (valueUSD - snapshotPriceUsdc) / valueUSD
      : 0;

    // Address
    const address = token?.address || '';


    return {
      valueUSD,
      valueUSDChangePercent24h: valueChangePercent24h,
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
    "kvcm-k2": getOneTokenMetrics('KVCM_K2_LP'),
    "kvcm-usdc": getOneTokenMetrics('KVCM_USDC_LP'),
  };
};
