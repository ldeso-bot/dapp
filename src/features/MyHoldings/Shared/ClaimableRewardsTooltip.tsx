import { TokenInfo } from '@/shared/constants/tokens.constants';
import { formatPriceUSDWithCommas } from '@/shared/utils/string.utils';

type Props = {
  items: {
    token: TokenInfo;
    amount: number;
    valueUSD: number;
  }[];
};
export default function ClaimableRewardsTooltip({ items }: Props) {
  return (
    <div className="flex flex-col gap-2 text-size-12">
      <div>Claimable Rewards</div>
      {items.map((item) => (
        <div
          key={item.token.symbol}
          className="flex flex-row justify-between gap-4 items-center"
        >
          <div className="flex flex-row gap-2 items-center">
            {item.token.icon(16)}
            <div className="text-right">
              {item.amount} {item.token.symbol}
            </div>
          </div>
          <div className="text-right">
            {formatPriceUSDWithCommas(item.valueUSD)}
          </div>
        </div>
      ))}
    </div>
  );
}
