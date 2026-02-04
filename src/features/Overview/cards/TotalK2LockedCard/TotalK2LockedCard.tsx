'use client';

import { CardProps } from '@/shared/components/Card/Card';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { useConnectAndRedirect } from '@/shared/hooks/useConnectAndRedirect';
import {
  formatAmountWithCommas,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';
import StatCard from '../../shared/StatCard/StatCard';

export default function TotalK2LockedCard(props: CardProps) {
  const { data } = useProtocolData();
  const handleButtonClick = useConnectAndRedirect(
    `${ROUTES.MY_ACTIVITIES}?activeView=k2&action=lock_k2`
  );

  const price = data?.metrics.k2.valueUSD ?? 0;
  const amount = data?.metrics.k2.supplyLocked ?? 0;

  return (
    <StatCard
      {...props}
      buttonOnClick={handleButtonClick}
      buttonText="Lock K2"
      title="K2 TVL"
      tooltip="This represents the total amount of K2 locked in the Protocol by all users."
      tooltipPosition="far"
      primaryValue={formatAmountWithCommas(amount, 0)}
      secondaryValue={formatPriceUSDWithCommas(price * amount, 0)}
      changePercent={data?.metrics.k2.supplyLockedChangePercent24h}
      token={tokens.k2}
    />
  );
}
