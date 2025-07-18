import StackedCards from '../StackedCards/StackedCards';
import Card, { CardProps } from './Card';

export default function SoloCard(props: CardProps) {
  return (
    <StackedCards className={props.className}>
      <Card {...props} />
    </StackedCards>
  );
}
