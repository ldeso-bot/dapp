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
      tooltip="kVCM is the governance token for the KlimaDAO. It is used to vote on proposals and make decisions for the protocol."
      buttonText="Buy kVCM"
      value={data?.metrics.klimaBonded.valueUSD}
      changePercent={data?.metrics.klimaBonded.valueChangePercent24h}
      token={tokens.usdc}
    />
  );
}
