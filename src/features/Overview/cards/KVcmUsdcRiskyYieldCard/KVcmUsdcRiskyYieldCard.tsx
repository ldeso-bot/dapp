'use client';
import { CardProps } from '@/shared/components/Card/Card';

import YieldRatesCard from '@/features/Overview/shared/YieldRatesCard/YieldRatesCard';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';

export default function KVcmUsdcRiskyYieldCard(props: CardProps) {
  const { data } = useProtocolData();

  return (
    <YieldRatesCard
      {...props}
      className="rounded-xl"
      title="kVCM/USDC Risky Yield"
      tooltip="Total dollar equivalent of all deposits, bonds, and Liquidity pools managed by the Protocol."
      data={data?.liquidityPoolRiskyYield}
    />
  );
}
