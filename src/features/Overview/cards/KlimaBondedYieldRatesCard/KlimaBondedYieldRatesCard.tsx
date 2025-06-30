'use client';

import YieldRatesCard from '@/features/Overview/shared/YieldRatesCard/YieldRatesCard';
import { CardProps } from '@/shared/components/Card/Card';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';

export default function LockedKVcmYieldRatesCard(props: CardProps) {
  const { data } = useProtocolData();
  return (
    <YieldRatesCard
      {...props}
      title="Locked kVCM Yield Rates"
      tooltip="Historical kVCM yield rates over time"
      data={data?.lockedkVcmYieldRates}
    />
  );
}
