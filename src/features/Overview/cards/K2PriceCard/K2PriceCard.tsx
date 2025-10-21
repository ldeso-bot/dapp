import { CardProps } from '@/shared/components/Card/Card';
import { tokens } from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import StatCard from '../../shared/StatCard/StatCard';

export default function K2PriceCard(props: CardProps) {
  const { data } = useProtocolData();
  const price = data?.metrics.k2Locked.valueUSD ?? 0;
  return (
    <StatCard
      {...props}
      buttonText="Buy K2"
      title="K2 Price"
      tooltip="K2 is the governance token for the KlimaDAO. It is used to vote on proposals and make decisions for the protocol."
      primaryValue={price}
      changePercent={data?.metrics.k2Locked.valueChangePercent24h}
      token={tokens.k2}
    />
  );
}
