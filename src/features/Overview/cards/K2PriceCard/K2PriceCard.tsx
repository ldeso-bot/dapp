import { CardProps } from '@/shared/components/Card/Card';
import { tokens } from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import StatCard from '../../shared/StatCard/StatCard';

export default function K2PriceCard(props: CardProps) {
  const { data } = useProtocolData();
  return (
    <StatCard
      {...props}
      buttonText="Lock K2"
      title="K2 Price"
      tooltip="K2 is the governance token for the KlimaDAO. It is used to vote on proposals and make decisions for the protocol."
      value={data?.metrics.klimaXLocked.valueUSD}
      changePercent={data?.metrics.klimaXLocked.valueChangePercent24h}
      token={tokens.k2}
    />
  );
}
