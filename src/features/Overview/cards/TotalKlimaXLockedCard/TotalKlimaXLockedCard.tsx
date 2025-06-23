import { CardProps } from '@/shared/components/Card/Card';
import { tokens } from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import StatCard from '../StatCard/StatCard';

export default function TotalKlimaXLockedCard(props: CardProps) {
  const { data } = useProtocolData();

  return (
    <StatCard
      {...props}
      buttonText="Buy KlimaX"
      title="Total KLIMAX Locked"
      tooltip="KlimaX locks earn risky yield and may be unlocked after 24hrs."
      tooltipPosition="far"
      value={data?.metrics.klimaXLocked.amountTonnes}
      changePercent={data?.metrics.klimaXLocked.amountChangePercentage24h}
      icon={tokens.klimax.icon}
    />
  );
}
