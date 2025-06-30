import { Holding } from '@/shared/models/walletData';
import { formatPriceUSDWithCommas } from '@/shared/utils/string.utils';
import { HoldingsCardItemProps } from './HoldingsTable.types';

export default function HoldingValueUSD<T extends Holding>({
  holding,
}: HoldingsCardItemProps<T>) {
  return (
    <div className="grow-1 w-full">
      {formatPriceUSDWithCommas(holding.valueUSD)}
    </div>
  );
}
