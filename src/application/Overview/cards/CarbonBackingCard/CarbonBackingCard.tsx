import Card, { CardProps } from '@/shared/components/Card/Card';

export default function CarbonBackingCard(props: CardProps) {
  return (
    <Card
      {...props}
      title="Carbon Backing"
      tooltip="There should be a tooltip here"
    >
      <div>Chart goes here</div>
    </Card>
  );
}
