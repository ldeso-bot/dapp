import Button from '@/shared/components/Button/Button';
import Icon from '@/shared/components/Icon/Icon';
import { Separator } from '@/shared/components/Separator/Separator';
import Tooltip from '@/shared/components/Tooltip/HelpTooltip';
import { tokens } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import {
  formatAmountWithCommas,
  formatPercentage,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';
import clsx from 'clsx';

type Props = {
  className?: string;
};

export default function BondsMobile({ className }: Props) {
  const { data } = useWalletData();

  if (!data) return null;

  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      <div className="flex flex-row w-full justify-between">
        <div>Balance</div>
        <div>APY</div>
      </div>

      {data.bonds.map((bond) => (
        <div key={bond.id} className="w-full flex flex-col gap-3">
          <div className="flex flex-row  w-full justify-between">
            <div className="flex gap-2 items-center border-r-1 border-void-20 pr-10 grow-1">
              <Icon icon={tokens.klima.icon} size={16} />
              {formatAmountWithCommas(bond.balance)}
            </div>
            <div className="pl-10 grow-1">
              {formatPriceUSDWithCommas(bond.valueUSD)}
            </div>
            <div className="flex gap-1 items-center justify-center justify-end grow-1">
              {formatPercentage(bond.apyPercent)}
              <Tooltip content={<></>} />
            </div>
          </div>
          <div>
            <Button className="w-full h-8">Claim</Button>
          </div>
          <Separator />
        </div>
      ))}
    </div>
  );
}
