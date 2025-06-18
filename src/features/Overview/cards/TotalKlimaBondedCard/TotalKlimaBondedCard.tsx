import { CardProps } from '@/shared/components/Card/Card';
import { tokens } from '@/shared/constants/tokens.constants';
import StatCard from '../StatCard/StatCard';

export default function TotalKlimaBondedCard(props: CardProps) {
  return (
    <StatCard
      {...props}
      buttonText="Bond KLIMA"
      buttonHref="/purchase-bond"
      title="Total KLIMA Bonded"
      tooltip="Bonds are fixed income instruments that offer yield which is claimable at maturity."
      tooltipPosition="far"
      value={0}
      icon={tokens.klima.icon}
      changePercent={-0.1}
    />
  );
}
