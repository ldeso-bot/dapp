import { CardProps } from '@/shared/components/Card/Card';
import { tokens } from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import StatCard from '../../shared/StatCard/StatCard';

export default function KlimaXPriceCard(props: CardProps) {
  const { data } = useProtocolData();
  return (
    <StatCard
      {...props}
      buttonText="Lock KLIMAX"
      title="KLIMAX Price"
      tooltip="KLIMAX is the governance token for the KlimaDAO. It is used to vote on proposals and make decisions for the protocol."
      value={data?.metrics.klimaXLocked.valueUSD}
      changePercent={data?.metrics.klimaXLocked.valueChangePercent24h}
      icon={tokens.usdc.icon}
    />
  );
}
