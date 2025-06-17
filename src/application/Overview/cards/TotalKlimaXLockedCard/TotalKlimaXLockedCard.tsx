import { CardProps } from '@/shared/components/Card/Card';
import { tokens } from '@/shared/constants/tokens.constants';
import StatCard from '../StatCard/StatCard';

export default function TotalKlimaXLockedCard(props: CardProps) {
  return (
    <StatCard
      {...props}
      buttonText="Buy KlimaX"
      title="Total KLIMAX Locked"
      tooltip="KlimaX locks earn risky yield and may be unlocked after 24hrs."
      tooltipPosition="far"
      value={0}
      icon={tokens.klimax.icon}
      changePercent={0.1}
    />
  );
}
