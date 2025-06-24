import Button from '@/shared/components/Button/Button';
import Card, { CardProps } from '@/shared/components/Card/Card';
import Icon from '@/shared/components/Icon/Icon';
import Tooltip from '@/shared/components/Tooltip/HelpTooltip';
import { tokens } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import {
  formatAmountWithCommas,
  formatPercentage,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';

export default function BondsCard(props: CardProps) {
  const { data } = useWalletData();
  return (
    <Card {...props} title="Bonds" tooltip="There should be a tooltip here">
      {data && (
        <table className="table">
          <thead>
            <tr>
              <th className="text-left pl-10">Balance</th>
              <th></th>
              <th className="text-right pr-10">APY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.bonds.map((bond) => (
              <tr key={bond.id}>
                <td>
                  <div className="border-void-20 border-r-1">
                    <div className="flex gap-2 items-center">
                      <Icon icon={tokens.klima.icon} size={16} />
                      {formatAmountWithCommas(bond.balance)}
                    </div>
                  </div>
                </td>
                <td className="text-left pl-10">
                  {formatPriceUSDWithCommas(bond.valueUSD)}
                </td>
                <td className="text-right pr-10">
                  <div className="flex gap-1 items-center justify-end">
                    {formatPercentage(bond.apyPercent)}
                    <Tooltip content={<></>} />
                  </div>
                </td>
                <td>
                  <Button className="w-full">Claim</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}
