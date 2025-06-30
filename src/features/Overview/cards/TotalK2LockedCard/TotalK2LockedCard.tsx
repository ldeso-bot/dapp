import { CardProps } from '@/shared/components/Card/Card';
import { tokens } from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import StatCard from '../../shared/StatCard/StatCard';

export default function TotalK2LockedCard(props: CardProps) {
  const { data } = useProtocolData();

  return (
    <StatCard
      {...props}
      buttonText="Lock K2"
      title="Total K2 Locked"
      tooltip="K2 locks earn risky yield and may be unlocked after 24hrs."
      tooltipPosition="far"
      value={data?.metrics.klimaXLocked.amountTonnes}
      changePercent={data?.metrics.klimaXLocked.amountChangePercent24h}
      token={tokens.k2}
    />
  );
}
