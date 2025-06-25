import Button from '@/shared/components/Button/Button';
import Icon from '@/shared/components/Icon/Icon';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/Table/table';
import HelpTooltip from '@/shared/components/Tooltip/HelpTooltip';
import { tokens } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import {
  formatAmountWithCommas,
  formatPercentage,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';

type Props = {
  className?: string;
};

export default function BondsDesktop({ className }: Props) {
  const { data } = useWalletData();

  if (!data) return null;

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Balance</TableHead>
          <TableHead></TableHead>
          <TableHead className="text-center pr-10">APY</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.bonds.map((bond) => (
          <TableRow key={bond.id} className="hidden lg:table-row">
            <TableCell>
              <div className="border-void-20 border-r-1">
                <div className="flex gap-2 items-center">
                  <Icon icon={tokens.klima.icon} size={16} />
                  {formatAmountWithCommas(bond.balance)}
                </div>
              </div>
            </TableCell>
            <TableCell className="text-left pl-10">
              {formatPriceUSDWithCommas(bond.valueUSD)}
            </TableCell>
            <TableCell className="text-center pr-10">
              <div className="flex gap-1 items-center justify-center">
                {formatPercentage(bond.apyPercent)}
                <HelpTooltip content={<></>} />
              </div>
            </TableCell>
            <TableCell>
              <Button className="w-full">Claim</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
