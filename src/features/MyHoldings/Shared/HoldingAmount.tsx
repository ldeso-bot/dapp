import { Holding } from '@/shared/models/walletData';
import { cn } from '@/shared/utils/component.utils';
import { formatAmountWithCommas } from '@/shared/utils/string.utils';
import { HoldingsCardItemProps } from './HoldingsTable.types';

export default function HoldingAmount<T extends Holding>({
  getIcon,
  holding,
}: HoldingsCardItemProps<T>) {
  return (
    <div
      className={cn(
        'flex flex-row w-full gap-2 items-center border-r-1 border-void-20 pr-10 grow-1'
      )}
    >
      <div>{getIcon(holding)}</div>
      <div>{formatAmountWithCommas(holding.balance)}</div>
    </div>
  );
}
