'use client';

import YieldRatesCard from '@/features/Overview/shared/YieldRatesCard/YieldRatesCard';
import { CardProps } from '@/shared/components/Card/Card';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';

export default function KlimaBondYieldRatesCard(props: CardProps) {
  const { data } = useProtocolData();
  return (
    <YieldRatesCard
      {...props}
      title="KLIMA Bond Yield Rates"
      tooltip="Historical KLIMA bond yield rates over time"
      data={data?.klimaBondYieldRates}
    />
  );
}
