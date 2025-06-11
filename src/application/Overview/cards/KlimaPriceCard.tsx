import { CardProps } from '@/shared/components/Card/Card';
import { getMetrics } from '@/shared/dal/subgraph/metrics';
import UsdIcon from '@/shared/images/usd.svg';
import StatCard from './StatCard';

export default async function KlimaPriceCard(props: CardProps) {
  const metrics = await getMetrics();
  return (
    <StatCard
      {...props}
      title="KLIMA Price"
      tooltip="KLIMA is the governance token for the KlimaDAO. It is used to vote on proposals and make decisions for the protocol."
      buttonText="Buy KLIMA"
      value={metrics.klima.priceUSD}
      changePercent={metrics.klima.priceChangePercentage24h}
      icon={UsdIcon}
    />
  );
}
