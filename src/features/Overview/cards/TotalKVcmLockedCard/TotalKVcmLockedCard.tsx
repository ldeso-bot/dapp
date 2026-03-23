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

export default function TotalKVcmLockedCard(props: CardProps) {
  const { data } = useProtocolData();

  const handleButtonClick = useConnectAndRedirect(
    `${ROUTES.MY_ACTIVITIES}?activeView=kvcm&action=lock_kvcm`
  );

  const price = data?.metrics?.kvcm?.valueUSD ?? 0;
  const amount = data?.metrics?.kvcm?.supplyLocked ?? 0;

  return (
    <StatCard
      {...props}
      buttonText="Lock kVCM [t028]"
      buttonOnClick={handleButtonClick}
      title="kVCM TVL [t029]"
      className="text-text-1"
      tooltip="This represents the total amount of kVCM locked in the Protocol by all users. [t030]"
      tooltipPosition="far"
      primaryValue={formatAmountWithCommas(amount, 0)}
      secondaryValue={formatPriceUSDWithCommas(price * amount, 2)}
      changePercent={data?.metrics.kvcm.supplyLockedChangePercent24h}
      token={tokens.kvcm}
    />
  );
}
