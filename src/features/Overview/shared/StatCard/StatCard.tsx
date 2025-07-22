import Button from '@/shared/components/Button/Button';
import Card, { CardProps } from '@/shared/components/Card/Card';
import ChangePercent from '@/shared/components/ChangePercent/ChangePercent';
import { TokenInfo } from '@/shared/constants/tokens.constants';
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
            {token.icon(2)}
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