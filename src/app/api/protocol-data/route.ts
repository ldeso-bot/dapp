import { ProtocolData } from '@/shared/models/ProtocolData';
import { getCarbonBacking } from '@/shared/queries/protocol/getCarbonBacking';
import { getCarbonLiquidity } from '@/shared/queries/protocol/getCarbonLiquidity';
import { getCarbonMarket } from '@/shared/queries/protocol/getCarbonMarket';
import { getCarbonYieldRates } from '@/shared/queries/protocol/getCarbonYieldRates';
import { getKlimaBondYieldRates } from '@/shared/queries/protocol/getKlimaBondYieldRates';
import { getLiquidityPoolRiskyYieldRates } from '@/shared/queries/protocol/getLiquidityPoolRiskyYieldRates';
import { getLiquidityPools } from '@/shared/queries/protocol/getLiquidityPools';
import { getTokenMetrics } from '@/shared/queries/protocol/getTokenMetrics';
import { getSdkOrError } from '@/shared/utils/subgraph.utils';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { response, sdk } = getSdkOrError(request);
  if (!sdk) {
    return response;
  }

  /** We enforce the data type to make sure the endpoint respects the interface */
  const [
    metrics,
    liquidityPools,
    klimaBondYieldRates,
    liquidityPoolRiskyYield,
    carbonYieldRates,
    carbonBacking,
    carbonLiquidity,
    carbonMarket,
  ] = await Promise.all([
    getTokenMetrics(sdk),
    getLiquidityPools(sdk),
    getKlimaBondYieldRates(sdk),
    getLiquidityPoolRiskyYieldRates(sdk),
    getCarbonYieldRates(sdk),
    getCarbonBacking(sdk),
    getCarbonLiquidity(sdk),
    getCarbonMarket(sdk),
  ]);

  const data: ProtocolData = {
    metrics,
    liquidityPools,
    klimaBondYieldRates,
    liquidityPoolRiskyYield,
    carbonYieldRates,
    carbonBacking,
    carbonLiquidity,
    carbonMarket,
  };

  return Response.json(data);
}
