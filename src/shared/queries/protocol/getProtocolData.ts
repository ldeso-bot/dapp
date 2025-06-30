import { ProtocolData } from '@/shared/models/ProtocolData';
import { getCarbonBacking } from '@/shared/queries/protocol/getCarbonBacking';
import { getCarbonLiquidity } from '@/shared/queries/protocol/getCarbonLiquidity';
import { getCarbonMarket } from '@/shared/queries/protocol/getCarbonMarket';
import { getCarbonYieldRates } from '@/shared/queries/protocol/getCarbonYieldRates';
import { getLiquidityPoolRiskyYieldRates } from '@/shared/queries/protocol/getLiquidityPoolRiskyYieldRates';
import { getLiquidityPools } from '@/shared/queries/protocol/getLiquidityPools';
import { getLockedKVcmYieldRates } from '@/shared/queries/protocol/getLockedKVcmYieldRates';
import { getTokenMetrics } from '@/shared/queries/protocol/getTokenMetrics';
import { Sdk } from '@/shared/utils/subgraph.utils';

export async function getProtocolData(sdk: Sdk) {
  /** We enforce the data type to make sure the endpoint respects the interface */
  const [
    metrics,
    liquidityPools,
    lockedkVcmYieldRates,
    liquidityPoolRiskyYield,
    carbonYieldRates,
    carbonBacking,
    carbonLiquidity,
    carbonMarket,
  ] = await Promise.all([
    getTokenMetrics(sdk),
    getLiquidityPools(sdk),
    getLockedKVcmYieldRates(sdk),
    getLiquidityPoolRiskyYieldRates(sdk),
    getCarbonYieldRates(sdk),
    getCarbonBacking(sdk),
    getCarbonLiquidity(sdk),
    getCarbonMarket(sdk),
  ]);

  const data: ProtocolData = {
    metrics,
    liquidityPools,
    lockedkVcmYieldRates,
    liquidityPoolRiskyYield,
    carbonYieldRates,
    carbonBacking,
    carbonLiquidity,
    carbonMarket,
  };

  return data;
}
