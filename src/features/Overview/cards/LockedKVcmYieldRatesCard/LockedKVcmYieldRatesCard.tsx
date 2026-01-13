'use client';

import YieldRatesCard from '@/features/Overview/shared/YieldRatesCard/YieldRatesCard';
import { CardProps } from '@/shared/components/Card/Card';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';

export default function LockedKVcmYieldRatesCard(props: CardProps) {
  const { data } = useProtocolData();
  return (
    <YieldRatesCard
      {...props}
      className="rounded-xl"
      title="Locked kVCM Incentive Rates"
      tooltip="kVCM incentive rates over time"
      data={data?.maturities}
      yieldField="syntheticYieldZeroCouponYieldCurve"
      tokens={['kvcm']}
    />
  );
}
