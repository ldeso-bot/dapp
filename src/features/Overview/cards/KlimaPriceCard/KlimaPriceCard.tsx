'use client';

import { CardProps } from '@/shared/components/Card/Card';
import { tokens } from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import StatCard from '../StatCard/StatCard';

export default function KlimaPriceCard(props: CardProps) {
  const { data } = useProtocolData();

  return (
    <StatCard
      {...props}
      title="KLIMA Price"
      tooltip="KLIMA is the governance token for the KlimaDAO. It is used to vote on proposals and make decisions for the protocol."
      buttonText="Buy KLIMA"
      value={data?.metrics.klimaBonded.valueUSD}
      changePercent={data?.metrics.klimaBonded.valueChangePercentage24h}
      icon={tokens.usdc.icon}
    />
  );
}
