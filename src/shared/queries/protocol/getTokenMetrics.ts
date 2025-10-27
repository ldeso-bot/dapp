import { USE_MOCKS } from '@/shared/constants/config.constants';
import { AllMetrics, Metrics } from '@/shared/models/ProtocolData';
import { Sdk } from '@/shared/utils/subgraph.utils';
import { formatUnits } from 'viem';

export const getTokenMetrics = async (sdk: Sdk): Promise<AllMetrics> => {
  if (USE_MOCKS) {
    return getMockTokenMetrics();
  }

  // TODO: Use daysSinceEpoch - 1 (yesterday's prices)
  const daysSinceEpoch = Math.floor(Date.now() / 1000 / 86400);
  const [tokensResponse, tokenSnapshotsResponse] = await Promise.all([
    sdk.protocol.getTokens(),
    sdk.protocol.getTokenSnapshots({
      daysSinceEpoch: daysSinceEpoch.toString(),
    }),
  ]);

  const getOneTokenMetrics = (symbol: string): Metrics => {
    const token = tokensResponse.tokens.find((t) => t.symbol === symbol);
    const snapshot = tokenSnapshotsResponse.tokenSnapshots.find(
      (p) => p.symbol === symbol
    );
    const valueUSD = Number(
      formatUnits(BigInt(token?.priceUsdc?.priceUsdc ?? '0'), 6)
    );
    const amountLocked = Number(
      formatUnits(BigInt(token?.totalAmountLocked ?? '0'), 18)
    );
    const tokenPriceUsdc = token?.priceUsdc?.priceUsdc
      ? Number(formatUnits(BigInt(token.priceUsdc.priceUsdc), 6))
      : 0;
    const snapshotPriceUsdc = snapshot?.priceUsdc
      ? Number(formatUnits(BigInt(snapshot.priceUsdc), 6))
      : 0;
    const tokenTVL = token?.totalAmountLocked
      ? Number(formatUnits(BigInt(token.totalAmountLocked), 18))
      : 0;
    const snapshotTVL = snapshot?.totalAmountLocked
      ? Number(formatUnits(BigInt(snapshot.totalAmountLocked), 18))
      : 0;

    const valueChangePercent24h = tokenPriceUsdc
      ? (tokenPriceUsdc - snapshotPriceUsdc) / tokenPriceUsdc
      : 0;

    const amountChangePercent24h =
      tokenTVL - snapshotTVL ? (tokenTVL - snapshotTVL) / tokenTVL : 0;

    return {
      valueUSD,
      valueChangePercent24h,
      amountTonnes: amountLocked,
      amountChangePercent24h,
    };
  };

  return {
    kVcmLocked: getOneTokenMetrics('KVCM'),
    k2Locked: getOneTokenMetrics('K2'),
  };
};

const getMockTokenMetrics = () => {
  return {
    kVcmLocked: {
      valueUSD: 1.32,
      valueChangePercent24h: 0.12,
      amountTonnes: 789000,
      amountChangePercent24h: 0.05,
    },
    k2Locked: {
      valueUSD: 1.4,
      valueChangePercent24h: -0.12,
      amountTonnes: 789000,
      amountChangePercent24h: 0.08,
    },
  };
};
