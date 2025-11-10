import { ChainId } from '@/shared/constants/networks.constants';
import { ProtocolData } from '@/shared/models/ProtocolData';
import { getCarbonMarket } from '@/shared/queries/protocol/getCarbonMarket';
import { getCarbonYieldRates } from '@/shared/queries/protocol/getCarbonYieldRates';
import { getLiquidityPoolRiskyYieldRates } from '@/shared/queries/protocol/getLiquidityPoolRiskyYieldRates';
import { getLiquidityPools } from '@/shared/queries/protocol/getLiquidityPools';
import { getLockedKVcmYieldRates } from '@/shared/queries/protocol/getLockedKVcmYieldRates';
import { getTokenMetrics } from '@/shared/queries/protocol/getTokenMetrics';
import { getCarbonClasses } from './getCarbonClasses';

export async function getProtocolData(chainId: ChainId): Promise<ProtocolData> {
  const [
    metrics,
    liquidityPools,
    lockedkVcmYieldRates,
    liquidityPoolRiskyYield,
    carbonYieldRates,
    carbonMarket,
    carbonClasses,
  ] = await Promise.all([
    getTokenMetrics(chainId),
    getLiquidityPools(chainId),
    getLockedKVcmYieldRates(chainId),
    getLiquidityPoolRiskyYieldRates(chainId),
    getCarbonYieldRates(chainId),
    getCarbonMarket(chainId),
    getCarbonClasses(chainId),
  ]);

  return {
    metrics,
    liquidityPools,
    lockedkVcmYieldRates,
    liquidityPoolRiskyYield,
    carbonYieldRates,
    carbonMarket,
    carbonClasses,
  };
}
