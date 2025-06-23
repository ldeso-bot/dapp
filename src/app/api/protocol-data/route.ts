import { ProtocolData } from '@/shared/models/ProtocolData';
import { getKlimaBondYieldRates } from '@/shared/queries/getKlimaBondYieldRates';
import { getLiquidityPools } from '@/shared/queries/getLiquidityPools';
import { getMetrics } from '@/shared/queries/getMetrics';
import { getSdkOrError } from '@/shared/utils/subgraph.utils';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { response, sdk } = getSdkOrError(request);
  if (!sdk) {
    return response;
  }

  /** We enforce the data type to make sure the endpoint respects the interface */
  const data: ProtocolData = {
    metrics: await getMetrics(sdk),
    liquidityPools: await getLiquidityPools(sdk),
    klimaBondYieldRates: await getKlimaBondYieldRates(sdk),
  };

  return Response.json(data);
}
