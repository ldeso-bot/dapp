import Progress from '@/shared/components/Progress/Progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/Table/table';
import { Allocation } from '@/shared/models/walletData';
import AllocationAmount from './AllocationAmount';
import AllocationClass from './AllocationClass';
import AllocationEditButton from './AllocationEditButton';
import AllocationPrice from './AllocationPrice';
import AllocationShare from './AllocationShare';
import { AllocationsCardProps } from './AllocationsTable.types';

export default function AllocationsTableDesktop(props: AllocationsCardProps) {
  const { className, data, noAllocationComponent } = props;
  if (!data) return null;

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Class</TableHead>
          <TableHead className="text-left">Price</TableHead>
          <TableHead className="text-left">Amount Allocated</TableHead>
          <TableHead className="text-left">Allocation Share</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((allocation) => (
          <AllocationTableRow
            key={allocation.id}
            allocation={allocation}
            {...props}
          />
        ))}
        {data.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="border-0">
              {noAllocationComponent}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

const AllocationTableRow = (
  props: AllocationsCardProps & { allocation: Allocation }
) => {
  const { allocation } = props;
  return (
    <>
      <TableRow>
        <TableCell className="text-left border-0">
          <AllocationClass {...props} className="" />
        </TableCell>
        <TableCell className="text-left border-0">
          <AllocationPrice {...props} className="" />
        </TableCell>
        <TableCell className="text-left border-0">
          <AllocationAmount {...props} className="" />
        </TableCell>
        <TableCell className="text-left border-0">
          <AllocationShare {...props} className="" />
        </TableCell>
        <TableCell className="border-0">
          <div className="flex justify-end">
            <AllocationEditButton {...props} />
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5}>
          <Progress progressPercent={allocation.sharePercent} />
        </TableCell>
      </TableRow>
    </>
  );
};
