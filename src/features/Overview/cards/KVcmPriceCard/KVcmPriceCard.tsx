'use client';

import { CardProps } from '@/shared/components/Card/Card';
import { tokens } from '@/shared/constants/tokens.constants';
import { BUY_KVCM_URL } from '@/shared/constants/urls.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { formatPriceUSDWithCommas } from '@/shared/utils/string.utils';
import StatCard from '../../shared/StatCard/StatCard';

export default function KVcmPriceCard(props: CardProps) {
  const { data } = useProtocolData();
  const price = formatPriceUSDWithCommas(data?.metrics.kvcm.valueUSD ?? 0, 2);

  return (
    <StatCard
      {...props}
      title="kVCM Price"
      buttonHref={BUY_KVCM_URL}
      buttonTarget="_blank"
      buttonText="Trade kVCM"
      primaryValue={price}
      token={tokens.usdc}
    />
  );
}
