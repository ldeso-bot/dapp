import { CardProps } from '@/shared/components/Card/Card';
import { tokens } from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import StatCard from '../../shared/StatCard/StatCard';

export default function TotalKlimaBondedCard(props: CardProps) {
  const { data } = useProtocolData();
  return (
    <StatCard
      {...props}
      buttonText="Bond KLIMA"
      buttonHref="/purchase-bond"
      title="Total KLIMA Bonded"
      tooltip="Bonds are fixed income instruments that offer yield which is claimable at maturity."
      tooltipPosition="far"
      value={data?.metrics.klimaBonded.amountTonnes}
      changePercent={data?.metrics.klimaBonded.amountChangePercent24h}
      icon={tokens.klima.icon}
    />
  );
}
