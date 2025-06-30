import Card from '@/shared/components/Card/Card';
import Tag from '@/shared/components/Tag/Tag';

export default function AllocationsIntroCard() {
  return (
    <Card
      title="Allocate Carbon"
      titleAddOnClose={<Tag className="mx-3">Advanced feature</Tag>}
    >
      <span className="text-void-80 text-size-14">
        Allocating is the act of staking KLIMA or KlimaX against the price of
        Carbon. You can allocate any of your bonded KLIMA, and any of your
        locked KlimaX. Allocating can affect the price of each carbon class.{' '}
        <a className="text-green">Learn more.</a>
      </span>
    </Card>
  );
}
