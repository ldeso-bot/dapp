import Button from '@/shared/components/Button/Button';
import Card, { CardProps } from '@/shared/components/Card/Card';
import { TokenInfo } from '@/shared/constants/tokens.constants';
import { cn } from '@/shared/utils/component.utils';
import { formatPercentage } from '@/shared/utils/string.utils';
import { isNullish } from 'remeda';

type Props = CardProps & {
  buttonText: string;
  value?: number;
  token: TokenInfo;
  changePercent?: number;
  buttonHref?: string;
};

/** Component for the cards at the top of the Overview page */
export default function StatCard(props: Props) {
  const { token, value, buttonText, buttonHref, changePercent } = props;
  return (
    <Card {...props} tooltipPosition="far" skeletonClassName="h-[7rem]">
      {!isNullish(value) && !isNullish(changePercent) && (
        <div className="flex flex-col gap-3 w-full h-full">
          <div className="flex flex-row gap-2 w-full items-center">
            {token.icon(20)}
            <div className="grow-1">{value}</div>
            <div>
              <ChangePercent value={changePercent} />
            </div>
          </div>
          <Button className="w-full" href={buttonHref}>
            {buttonText}
          </Button>
        </div>
      )}
    </Card>
  );
}

function ChangePercent({ value }: { value: number }) {
  const arrow = value > 0 ? '↑' : '↓';
  const className = value > 0 ? 'bg-green-10' : 'bg-red-100';
  return (
    <div className={cn('flex flex-row gap-1 px-2 py-1 rounded-3xl', className)}>
      {arrow} {formatPercentage(value, { decimals: 0 })}
    </div>
  );
}
