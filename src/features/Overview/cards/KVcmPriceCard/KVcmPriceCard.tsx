'use client';

import { CardProps } from '@/shared/components/Card/Card';
import { tokens } from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import StatCard from '../../shared/StatCard/StatCard';

export default function KVcmPriceCard(props: CardProps) {
  const { data } = useProtocolData();

  return (
    <StatCard
      {...props}
      title="kVCM Price"
      tooltip="You can lock kVCM and K2 tokens to earn rewards. Locked tokens can be allocated to a carbon class to influence its price."
      buttonText="Buy kVCM"
      value={data?.metrics.klimaBonded.valueUSD}
      changePercent={data?.metrics.klimaBonded.valueChangePercent24h}
      token={tokens.usdc}
    />
  );
}
