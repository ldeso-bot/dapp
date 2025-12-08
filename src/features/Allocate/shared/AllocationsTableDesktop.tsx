import Icon from '@/shared/components/Icon/Icon';
import { Progress } from '@/shared/components/Progress/Progress';
import { SortableHeader } from '@/shared/components/Table/SortableHeader';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/Table/table';
import ArrowDown from '@/shared/images/arrow_down.svg';
import { Allocation } from '@/shared/models/walletData';
import { cn } from '@/shared/utils/component.utils';
import { FC, useState } from 'react';
import { AllocationAmount } from './AllocationAmount';
import { AllocationCategory } from './AllocationCategory';
import { AllocationClass } from './AllocationClass';
import { AllocationEditButton } from './AllocationEditButton';
import { AllocationPrice } from './AllocationPrice';
import { AllocationPriceEffect } from './AllocationPriceEffect';
import { AllocationsCardProps } from './AllocationsTable.types';

export const AllocationsTableDesktop: FC<AllocationsCardProps> = (props) => {
  const {
    className,
    data,
    noAllocationComponent,
    sortConfig,
    onSort,
    tokenInfo,
  } = props;

  return (
    <Table className={cn('w-full mt-6', className)}>
      <TableHeader>
        <TableRow>
          <SortableHeader
            sortKey="carbonClass"
            sortConfig={sortConfig}
            onSort={onSort}
            label="Carbon class"
            className="text-left"
          />
          <SortableHeader
            sortKey="amount"
            sortConfig={sortConfig}
            onSort={onSort}
            label="Allocated"
            className="text-right justify-end"
          />
          <SortableHeader
            sortKey="priceEffect"
            sortConfig={sortConfig}
            onSort={onSort}
            label="Price effect"
            className="text-center justify-center"
          />
          <SortableHeader
            sortKey="priceUSD"
            sortConfig={sortConfig}
            onSort={onSort}
            label={
              tokenInfo.id === 'kvcm'
                ? `Indicative price`
                : `Spread Contribution`
            }
            className="text-center justify-center"
          />
          <TableHead className="min-w-[14rem]">&nbsp;</TableHead>
          <TableHead className="min-w-[2rem]">&nbsp;</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((allocation) => (
          <AllocationTableRow
            key={allocation.id}
            allocation={allocation}
            {...props}
          />
        ))}
        {data?.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="border-0">
              {noAllocationComponent}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const AllocationTableRow = (
  props: AllocationsCardProps & { allocation: Allocation }
) => {
  const { allocation } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <TableRow
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <TableCell className="text-left border-0">
          <div className="flex flex-col gap-1">
            <AllocationClass {...props} />
            <AllocationCategory {...props} />
            <Progress progressPercent={allocation.sharePercent} />
          </div>
        </TableCell>
        <TableCell className="text-right border-0">
          <AllocationAmount {...props} />
        </TableCell>
        <TableCell className="text-center border-0 ">
          <div className="flex justify-center">
            <AllocationPriceEffect {...props} />
          </div>
        </TableCell>
        <TableCell className="text-left border-0">
          <div className="flex justify-center">
            <AllocationPrice {...props} />
          </div>
        </TableCell>
        <TableCell className="border-0">
          <div className="flex justify-end">
            {isHovered && <AllocationEditButton {...props} />}
          </div>
        </TableCell>
        <TableCell className="border-0 justify-end">
          <Icon className="rotate-270" icon={ArrowDown} size={2.2} />
        </TableCell>
      </TableRow>
    </>
  );
};
