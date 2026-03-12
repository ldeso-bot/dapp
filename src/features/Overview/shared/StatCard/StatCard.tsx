import Button from '@/shared/components/Button/Button';
import Card, { CardProps } from '@/shared/components/Card/Card';
import ChangePercent from '@/shared/components/ChangePercent/ChangePercent';
import { TokenInfo } from '@/shared/constants/tokens.constants';
import { ReactNode } from 'react';
import { isNullish } from 'remeda';

type Props = CardProps & {
  buttonText: string;
  primaryValue?: ReactNode;
  secondaryValue?: ReactNode;
  token: TokenInfo;
  changePercent?: number;
  buttonHref?: string;
  buttonTarget?: string;
  buttonOnClick?: () => void;
};

/** Component for the cards at the top of the Overview page */
export default function StatCard(props: Props) {
  const {
    token,
    primaryValue: value,
    secondaryValue,
    buttonText,
    buttonHref,
    changePercent,
    buttonTarget,
    buttonOnClick,
  } = props;
  return (
    <Card {...props} tooltipPosition="far" skeletonClassName="h-[7rem]">
      {!isNullish(value) && (
        <div className="flex flex-col gap-3 w-full h-full">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-2 w-full items-center">
              {token.icon(2)}
              <div className="grow-1 text-size-20 font-bold">{value}</div>
              {!isNullish(changePercent) && (
                <div>
                  <ChangePercent value={changePercent} />
                </div>
              )}
            </div>
            <div className="flex flex-row gap-2 w-full items-center text-size-12">
              <div className="invisible">{token.icon(2)}</div>
              <div>{secondaryValue}</div>
            </div>
          </div>
          <Button
            className="w-full border-border-strong"
            href={buttonHref}
            onClick={buttonOnClick}
            target={buttonTarget}
          >
            {buttonText}
          </Button>
        </div>
      )}
    </Card>
  );
}
