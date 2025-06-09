import { CardProps } from '@/shared/components/Card/Card';
import KlimaIcon from '@/shared/images/klima.svg';
import StatCard from './StatCard';

export default function TotalKlimaBondedCard(props: CardProps) {
  return (
    <StatCard
      {...props}
      buttonText="Bond KLIMA"
      buttonHref="/flows/purchase-bond"
      title="Total KLIMA Bonded"
      tooltip="Bonds are fixed income instruments that offer yield which is claimable at maturity."
      tooltipPosition="far"
      value={0}
      icon={KlimaIcon}
      changePercent={-0.1}
    />
  );
}
