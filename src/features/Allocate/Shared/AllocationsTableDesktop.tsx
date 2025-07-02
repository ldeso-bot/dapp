import Button from '@/shared/components/Button/Button';
import Icon from '@/shared/components/Icon/Icon';
import Progress from '@/shared/components/Progress/Progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/Table/table';
import Edit from '@/shared/images/edit.svg';
import AllocationAmount from './AllocationAmount';
import AllocationClass from './AllocationClass';
import AllocationPrice from './AllocationPrice';
import AllocationShare from './AllocationShare';
import { AllocationsCardProps } from './AllocationsTable.types';

export default function AllocationsTableDesktop(props: AllocationsCardProps) {
  const { className, data } = props;
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
          <>
            <TableRow key={allocation.id}>
              <TableCell className="text-left border-0">
                <AllocationClass
                  allocation={allocation}
                  {...props}
                  className=""
                />
              </TableCell>
              <TableCell className="text-left border-0">
                <AllocationPrice
                  allocation={allocation}
                  {...props}
                  className=""
                />
              </TableCell>
              <TableCell className="text-left border-0">
                <AllocationAmount
                  allocation={allocation}
                  {...props}
                  className=""
                />
              </TableCell>
              <TableCell className="text-left border-0">
                <AllocationShare
                  allocation={allocation}
                  {...props}
                  className=""
                />
              </TableCell>
              <TableCell className="border-0">
                <div className="flex justify-end">
                  <Button className="w-full">
                    <Icon icon={Edit} size={16} />
                    Edit
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow key={`${allocation.id}-0`}>
              <TableCell colSpan={5}>
                <Progress progressPercent={allocation.sharePercent} />
              </TableCell>
            </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  );
}
