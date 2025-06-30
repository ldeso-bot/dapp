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
          <TableRow key={allocation.id} className="hidden lg:table-row">
            <TableCell className="text-left">
              <AllocationClass
                allocation={allocation}
                {...props}
                className=""
              />
            </TableCell>
            <TableCell className="text-left">
              <AllocationPrice
                allocation={allocation}
                {...props}
                className=""
              />
            </TableCell>
            <TableCell className="text-left">
              <AllocationAmount
                allocation={allocation}
                {...props}
                className=""
              />
            </TableCell>
            <TableCell className="text-left">
              <AllocationShare
                allocation={allocation}
                {...props}
                className=""
              />
            </TableCell>{' '}
            <TableCell>
              <div className="flex justify-end">
                <Button className="w-full">
                  <Icon icon={Edit} size={16} />
                  Edit
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
