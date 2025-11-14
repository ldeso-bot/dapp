import {
  AERODROME_K2_USDC_POOL_INDEX,
  AERODROME_KVCM_USDC_POOL_INDEX,
} from '@/shared/constants/contracts.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { LpToken } from '@/shared/constants/tokens.constants';
import {
  LiquidityPoolInfo,
  LiquidityPools,
} from '@/shared/models/ProtocolData';
import { getAerodromePoolInfoByIndex } from '@/shared/utils/aerodrome.utils';
import { getTokenPricesViaAlchemy } from '@/shared/utils/alchemy.utils';
import { getTokenMetrics } from './getTokenMetrics';

export const getLiquidityPools = async (
  chainId: ChainId
): Promise<LiquidityPools> => {
  const [kvcmUsdcPool, k2UsdcPool, tokenMetrics, [aeroPrice]] =
    await Promise.all([
      // Velodrome pool data
      getAerodromePoolInfoByIndex(AERODROME_KVCM_USDC_POOL_INDEX),
      getAerodromePoolInfoByIndex(AERODROME_K2_USDC_POOL_INDEX),
      // Subgraph token data
      getTokenMetrics(chainId),
      getTokenPricesViaAlchemy(['AERO']),
    ]);

  const lpData = {
    'kvcm-usdc': {
      ...kvcmUsdcPool,
      token0ValueUSD: tokenMetrics.kvcm.valueUSD,
      token1ValueUSD: 1,
    },
    'kvcm-k2': {
      ...k2UsdcPool,
      token0ValueUSD: tokenMetrics.kvcm.valueUSD,
      token1ValueUSD: tokenMetrics.k2.valueUSD,
    },
  };

  const getOneLiquidityPool = (token: LpToken): LiquidityPoolInfo => {
    const tvl =
      lpData[token].token0ValueUSD * lpData[token].reserve0 +
      lpData[token].token1ValueUSD * lpData[token].reserve1;

    const annualEmissions = lpData[token].emissions * 60 * 60 * 24 * 365;
    const annualEmissionsUSD = annualEmissions * (aeroPrice ?? 0);

    const apyYearly = annualEmissionsUSD / tvl;

    return {
      token,
      tvlUSD: tvl,
      apyYearly,
    };
  };

  return [getOneLiquidityPool('kvcm-usdc'), getOneLiquidityPool('kvcm-k2')];
};
