import { CardProps } from '@/shared/components/Card/Card';
import YieldRatesCard from '@/shared/components/YieldRatesCard/YieldRatesCard';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';

export default function CarbonYieldCard(props: CardProps) {
  const { data } = useProtocolData();

  return (
    <YieldRatesCard
      {...props}
      title="Carbon Yield"
      tooltip="There should be a tooltip here"
      data={data?.liquidityPoolRiskyYield}
    />
  );
}
