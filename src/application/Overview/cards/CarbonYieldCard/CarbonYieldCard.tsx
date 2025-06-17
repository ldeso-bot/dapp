import Card, { CardProps } from '@/shared/components/Card/Card';

export default function CarbonYieldCard(props: CardProps) {
  return (
    <Card
      {...props}
      title="Carbon Yield"
      tooltip="There should be a tooltip here"
    >
      <div>Chart goes here</div>
    </Card>
  );
}
