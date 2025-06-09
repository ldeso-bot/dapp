import { getMetrics } from '@/shared/dal/metrics';

export const dynamic = 'force-static';

export async function GET() {
  const data = await getMetrics();

  return Response.json({ data });
}
