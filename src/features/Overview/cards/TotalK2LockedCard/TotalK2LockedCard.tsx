import { CardProps } from '@/shared/components/Card/Card';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import {
  formatAmountWithCommas,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';
import StatCard from '../../shared/StatCard/StatCard';

export default function TotalK2LockedCard(props: CardProps) {
  const { data } = useProtocolData();
  const amount = data?.metrics.k2.supplyLocked ?? 0;
  const price = data?.metrics.k2.valueUSD ?? 0;

  return (
    <StatCard
      {...props}
      buttonHref={`${ROUTES.MY_HOLDINGS}?activeView=k2&action=lock_k2`}
      buttonText="Lock K2"
      title="Total K2 Locked"
      tooltip="K2 locks earn risky yield and may be unlocked after 24hrs."
      tooltipPosition="far"
      primaryValue={formatAmountWithCommas(amount, 0)}
      secondaryValue={formatPriceUSDWithCommas(price * amount, 0)}
      changePercent={data?.metrics.k2.supplyLockedChangePercent24h}
      token={tokens.k2}
    />
  );
}
