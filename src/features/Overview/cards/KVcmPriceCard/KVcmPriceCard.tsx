'use client';

import { CardProps } from '@/shared/components/Card/Card';
import { tokens } from '@/shared/constants/tokens.constants';
import { BUY_KVCM_URL } from '@/shared/constants/urls.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { formatPriceUSDWithCommas } from '@/shared/utils/string.utils';
import StatCard from '../../shared/StatCard/StatCard';

export default function KVcmPriceCard(props: CardProps) {
  const { data } = useProtocolData();
  const price = formatPriceUSDWithCommas(data?.metrics.kvcm.valueUSD ?? 0);

  return (
    <StatCard
      {...props}
      title="kVCM Price"
      buttonHref={BUY_KVCM_URL}
      buttonTarget="_blank"
      tooltip="You can lock kVCM and K2 tokens to earn rewards. Locked tokens can be allocated to a carbon class to influence its price."
      buttonText="Buy kVCM"
      primaryValue={price}
      changePercent={data?.metrics.kvcm.valueUSDChangePercent24h}
      token={tokens.usdc}
    />
  );
}
