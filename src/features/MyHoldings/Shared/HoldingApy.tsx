import Tooltip from '@/shared/components/Tooltip/Tooltip';
import { Holding } from '@/shared/models/walletData';
import { formatPercentage } from '@/shared/utils/string.utils';
import clsx from 'clsx';
import { HoldingsCardItemProps } from './HoldingsTable.types';

export default function HoldingApy<T extends Holding>({
  holding,
  className,
}: HoldingsCardItemProps<T>) {
  return (
    <div
      className={clsx(
        'flex flex-row gap-1 items-center justify-center grow-1 w-full',
        className
      )}
    >
      {formatPercentage(holding.apyPercent)}
      <Tooltip content={<></>} />
    </div>
  );
}
