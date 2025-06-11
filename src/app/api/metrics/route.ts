import { getMetrics } from '@/shared/dal/subgraph/metrics';

export const dynamic = 'force-static';

export async function GET() {
  const data = await getMetrics();

  return Response.json({ data });
}
