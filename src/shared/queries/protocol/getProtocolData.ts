import { ChainId } from '@/shared/constants/networks.constants';
import { ProtocolData } from '@/shared/models/ProtocolData';
import { getLiquidityPools } from '@/shared/queries/protocol/getLiquidityPools';
import { getTokenMetrics } from '@/shared/queries/protocol/getTokenMetrics';
import { getMaturities } from './getActiveMaturities';
import { getCarbonClasses } from './getCarbonClasses';
import { getMidnightInfos } from './getMidnightInfos';
import { getProtocolStateData } from './getProtocolStateData';

export async function getProtocolData(chainId: ChainId): Promise<ProtocolData> {
  const [
    metrics,
    liquidityPools,
    maturities,
    carbonClasses,
    midnightInfos,
    protocolState,
  ] = await Promise.all([
    getTokenMetrics(chainId),
    getLiquidityPools(chainId),
    getMaturities(chainId),
    getCarbonClasses(chainId),
    getMidnightInfos(chainId),
    getProtocolStateData(chainId),
  ]);

  return {
    chainId,
    metrics,
    liquidityPools,
    carbonClasses,
    maturities,
    midnightInfos,
    protocolState,
  };
}
