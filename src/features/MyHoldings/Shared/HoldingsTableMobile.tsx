import { Separator } from '@/shared/components/Separator/Separator';
import { Holding } from '@/shared/models/walletData';
import clsx from 'clsx';
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
    <div className={clsx('flex flex-col gap-4', className)}>
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

/*
<div className="flex gap-2 items-center border-r-1 border-void-20 pr-10 grow-1">
<Icon icon={tokens.klima.icon} size={16} />
{formatAmountWithCommas(holding.balance)}
</div>
<div className="pl-10 grow-1">
{formatPriceUSDWithCommas(holding.valueUSD)}
</div>
<div className="flex gap-1 items-center justify-center justify-end grow-1">
{formatPercentage(holding.apyPercent)}
<Tooltip content={<></>} />
</div>
</div>
<div>
<Button className="w-full h-8">Claim</Button>
</div>*/
