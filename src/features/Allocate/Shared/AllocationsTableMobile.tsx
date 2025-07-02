import Button from '@/shared/components/Button/Button';
import Icon from '@/shared/components/Icon/Icon';
import Progress from '@/shared/components/Progress/Progress';
import { Separator } from '@/shared/components/Separator/Separator';
import Edit from '@/shared/images/edit.svg';
import clsx from 'clsx';
import { ReactNode } from 'react';
import AllocationAmount from './AllocationAmount';
import AllocationClass from './AllocationClass';
import AllocationPrice from './AllocationPrice';
import AllocationShare from './AllocationShare';
import { AllocationsCardProps } from './AllocationsTable.types';

export default function AllocationsTableMobile(props: AllocationsCardProps) {
  const { className, data } = props;

  if (!data) return null;

  const labelAndValue = (label: ReactNode, value: ReactNode) => (
    <div className="flex flex-col">
      <div className="text-void-50 text-size-12">{label}</div>
      {value}
    </div>
  );

  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      {data.map((allocation) => (
        <div key={allocation.id} className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2">
              {labelAndValue(
                'Class',
                <AllocationClass allocation={allocation} {...props} />
              )}
              {labelAndValue(
                'Price',
                <AllocationPrice allocation={allocation} {...props} />
              )}
              {labelAndValue(
                'Amount Allocated',
                <AllocationAmount allocation={allocation} {...props} />
              )}
              {labelAndValue(
                'Allocation Share',
                <AllocationShare allocation={allocation} {...props} />
              )}
            </div>
            <div>
              <Progress progressPercent={allocation.sharePercent} />
            </div>
            <Button className="w-full">
              <Icon icon={Edit} size={16} />
              Edit Allocation
            </Button>
          </div>
          <Separator />
        </div>
      ))}
    </div>
  );
}
