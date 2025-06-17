import Card, { CardProps } from '@/shared/components/Card/Card';

export default function LiquidityPoolRiskyYieldCard(props: CardProps) {
  return (
    <Card
      {...props}
      title="Liquidity Pool risky Yield"
      tooltip="Total dollar equivalent of all deposits, bonds, and Liquidity pools managed by the Protocol."
    >
      <div>Chart goes there</div>
    </Card>
  );
}
