'use client';
import { CardProps } from '@/shared/components/Card/Card';

import YieldRatesCard from '@/shared/components/YieldRatesCard/YieldRatesCard';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';

export default function LiquidityPoolRiskyYieldCard(props: CardProps) {
  const { data } = useProtocolData();

  return (
    <YieldRatesCard
      {...props}
      title="Liquidity Pool risky Yield"
      tooltip="Total dollar equivalent of all deposits, bonds, and Liquidity pools managed by the Protocol."
      data={data?.liquidityPoolRiskyYield}
    />
  );
}
