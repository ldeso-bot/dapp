import Button from '@/shared/components/Button/Button';
import Card, { CardProps } from '@/shared/components/Card/Card';
import Icon from '@/shared/components/Icon/Icon';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import { formatPercentage } from '@/shared/utils/string.utils';
import clsx from 'clsx';
import { StaticImageData } from 'next/image';
import { isNullish } from 'remeda';

type Props = CardProps & {
  buttonText: string;
  value?: number;
  icon: StaticImageData;
  changePercent?: number;
  buttonHref?: string;
};

export default function StatCard(props: Props) {
  const { icon, value, title, buttonText, buttonHref, changePercent } = props;
  if (isNullish(value) || isNullish(changePercent)) {
    return (
      <Card
        {...props}
        title="KLIMA Price"
        tooltip="KLIMA is the governance token for the KlimaDAO. It is used to vote on proposals and make decisions for the protocol."
      >
        <Skeleton className="rounded grow-1" />
      </Card>
    );
  }

  return (
    <Card {...props} tooltipPosition="far">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-row gap-2 w-full items-center">
          <Icon icon={icon} alt={title ?? ''} size={20} />
          <div className="grow-1">{value}</div>
          <div>
            <ChangePercent value={changePercent} />
          </div>
        </div>
        <Button className="w-full" href={buttonHref}>
          {buttonText}
        </Button>
      </div>
    </Card>
  );
}

function ChangePercent({ value }: { value: number }) {
  const arrow = value > 0 ? '↑' : '↓';
  const className = value > 0 ? 'bg-green' : 'bg-red';
  return (
    <div
      className={clsx('flex flex-row gap-1 px-2 py-1 rounded-3xl', className)}
    >
      {arrow} {formatPercentage(value, { decimals: 0 })}
    </div>
  );
}
