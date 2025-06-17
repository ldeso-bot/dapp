import Button from '@/shared/components/Button/Button';
import Card, { CardProps } from '@/shared/components/Card/Card';
import clsx from 'clsx';
import Image from 'next/image';

type Props = CardProps & {
  buttonText: string;
  value: number;
  icon: string;
  changePercent: number;
  buttonHref?: string;
};

export default function StatCard(props: Props) {
  const { icon, value, title, buttonText, buttonHref, changePercent } = props;
  return (
    <Card {...props} tooltipPosition="far">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-row gap-2 w-full items-center">
          <Image src={icon} alt={title ?? ''} width={20} height={20} />
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
  const valueStr = (Math.abs(value) * 100)?.toFixed(0);
  const arrow = value > 0 ? '↑' : '↓';
  const className = value > 0 ? 'bg-green' : 'bg-red';
  return (
    <div
      className={clsx('flex flex-row gap-1 px-2 py-1 rounded-3xl', className)}
    >
      {arrow} {valueStr}%
    </div>
  );
}
