import { ChainId } from '@/shared/constants/networks.constants';
import { ProtocolData } from '@/shared/models/ProtocolData';
import { getLiquidityPoolRiskyYieldRates } from '@/shared/queries/protocol/getLiquidityPoolRiskyYieldRates';
import { getLiquidityPools } from '@/shared/queries/protocol/getLiquidityPools';
import { getLockedKVcmYieldRates } from '@/shared/queries/protocol/getLockedKVcmYieldRates';
import { getTokenMetrics } from '@/shared/queries/protocol/getTokenMetrics';
import { getCarbonClasses } from './getCarbonClasses';
import { getMidnightInfos } from './getMidnightInfos';

export async function getProtocolData(chainId: ChainId): Promise<ProtocolData> {
  const [
    metrics,
    liquidityPools,
    lockedkVcmYieldRates,
    liquidityPoolRiskyYield,
    carbonClasses,
    midnightInfos,
  ] = await Promise.all([
    getTokenMetrics(chainId),
    getLiquidityPools(chainId),
    getLockedKVcmYieldRates(chainId),
    getLiquidityPoolRiskyYieldRates(chainId),
    getCarbonClasses(chainId),
    getMidnightInfos(chainId),
  ]);

  return {
    chainId,
    metrics,
    liquidityPools,
    lockedkVcmYieldRates,
    liquidityPoolRiskyYield,
    carbonClasses,
    midnightInfos,
  };
}
