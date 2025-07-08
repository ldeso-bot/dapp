import { CardProps } from '@/shared/components/Card/Card';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import StatCard from '../../shared/StatCard/StatCard';

export default function TotalKVcmLockedCard(props: CardProps) {
  const { data } = useProtocolData();
  return (
    <StatCard
      {...props}
      buttonText="Lock kVCM"
      buttonHref={`${ROUTES.MY_HOLDINGS}?action=lock_kvcm`}
      title="Total kVCM Locked"
      tooltip="kVCM locks offer yield which is claimable at maturity."
      tooltipPosition="far"
      value={data?.metrics.klimaBonded.amountTonnes}
      changePercent={data?.metrics.klimaBonded.amountChangePercent24h}
      token={tokens.kvcm}
    />
  );
}
