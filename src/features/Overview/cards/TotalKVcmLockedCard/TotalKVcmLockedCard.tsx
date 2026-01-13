import { CardProps } from '@/shared/components/Card/Card';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import {
  formatAmountWithCommas,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';
import StatCard from '../../shared/StatCard/StatCard';

export default function TotalKVcmLockedCard(props: CardProps) {
  const { data } = useProtocolData();
  const amount = data?.metrics?.kvcm?.supplyLocked ?? 0;
  const price = data?.metrics?.kvcm?.valueUSD ?? 0;

  return (
    <StatCard
      {...props}
      buttonText="Lock kVCM"
      buttonHref={`${ROUTES.MY_HOLDINGS}?activeView=kvcm&action=lock_kvcm`}
      title="Total kVCM Locked"
      tooltip="kVCM locks offer kVCM incentives which are claimable at maturity."
      tooltipPosition="far"
      primaryValue={formatAmountWithCommas(amount, 0)}
      secondaryValue={formatPriceUSDWithCommas(price * amount, 0)}
      changePercent={data?.metrics.kvcm.supplyLockedChangePercent24h}
      token={tokens.kvcm}
    />
  );
}
