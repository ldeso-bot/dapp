import { ProtocolData } from '@/shared/models/ProtocolData';
import { getAllMetrics } from '@/shared/queries/getAllMetrics';
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
  ] = await Promise.all([
    getAllMetrics(sdk),
    getLiquidityPools(sdk),
    getKlimaBondYieldRates(sdk),
    getLiquidityPoolRiskyYieldRates(sdk),
    getCarbonYieldRates(sdk),
  ]);

  const data: ProtocolData = {
    metrics,
    liquidityPools,
    klimaBondYieldRates,
    liquidityPoolRiskyYield,
    carbonYieldRates,
  };

  return Response.json(data);
}
