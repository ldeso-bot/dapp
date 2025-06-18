import Card, { CardProps } from '@/shared/components/Card/Card';

export default function CarbonMarketCard(props: CardProps) {
  return (
    <Card
      {...props}
      title="Carbon Market"
      tooltip="There should be a tooltip here"
    >
      <div>Chart goes here</div>
    </Card>
  );
}
