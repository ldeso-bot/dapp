import { Separator } from '@/shared/components/Separator/Separator';
import { Holding } from '@/shared/models/walletData';
import { cn } from '@/shared/utils/component.utils';
import HoldingAmount from './HoldingAmount';
import HoldingApy from './HoldingApy';
import HoldingButton from './HoldingButton';
import { HoldingsCardProps } from './HoldingsTable.types';
import HoldingValueUSD from './HoldingValueUSD';

export default function HoldingsTableMobile<T extends Holding>(
  props: HoldingsCardProps<T>
) {
  const { className, data } = props;

  if (!data) return null;

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-row w-full justify-between">
        <div>Balance</div>
        <div>APY</div>
      </div>

      {data.map((holding) => (
        <div key={holding.id} className="w-full flex flex-col gap-3">
          <div className="flex flex-row  w-full justify-between">
            <HoldingAmount holding={holding} {...props} className="" />
            <HoldingValueUSD holding={holding} {...props} className="" />
            <HoldingApy holding={holding} {...props} className="justify-end" />
          </div>
          <div>
            <HoldingButton holding={holding} {...props} />
          </div>
          <Separator />
        </div>
      ))}
    </div>
  );
}
