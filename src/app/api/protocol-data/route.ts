import { ProtocolData } from '@/shared/models/ProtocolData';
import { getAllMetrics } from '@/shared/queries/getAllMetrics';
import { getCarbonBacking } from '@/shared/queries/getCarbonBacking';
import { getCarbonLiquidity } from '@/shared/queries/getCarbonLiquidity';
import { getCarbonMarket } from '@/shared/queries/getCarbonMarket';
import { getCarbonYieldRates } from '@/shared/queries/getCarbonYieldRates';
import { getKlimaBondYieldRates } from '@/shared/queries/getKlimaBondYieldRates';
import { getLiquidityPoolRiskyYieldRates } from '@/shared/queries/getLiquidityPoolRiskyYieldRates';
import { getLiquidityPools } from '@/shared/queries/getLiquidityPools';
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
    getAllMetrics(sdk),
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
