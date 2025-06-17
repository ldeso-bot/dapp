import Card, { CardProps } from '@/shared/components/Card/Card';

export default function LiquidityCard(props: CardProps) {
  return (
    <Card {...props} title="Liquidity" tooltip="There should be a tooltip here">
      <div>Chart goes here</div>
    </Card>
  );
}
