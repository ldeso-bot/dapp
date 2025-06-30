import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/Table/table';
import { Holding } from '@/shared/models/walletData';
import HoldingAmount from './HoldingAmount';
import HoldingApy from './HoldingApy';
import HoldingButton from './HoldingButton';
import { HoldingsCardProps } from './HoldingsTable.types';
import HoldingValueUSD from './HoldingValueUSD';

export default function HoldingsTableDesktop<T extends Holding>(
  props: HoldingsCardProps<T>
) {
  const { className, data } = props;
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
        {data.map((holding) => (
          <TableRow key={holding.id} className="hidden lg:table-row">
            <TableCell>
              <HoldingAmount holding={holding} {...props} className="" />
            </TableCell>
            <TableCell className="text-left pl-10">
              <HoldingValueUSD holding={holding} {...props} className="" />
            </TableCell>
            <TableCell className="text-center pr-10">
              <HoldingApy holding={holding} {...props} className="" />
            </TableCell>
            <TableCell>
              <HoldingButton holding={holding} {...props} className="" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
