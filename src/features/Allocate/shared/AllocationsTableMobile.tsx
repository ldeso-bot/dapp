import Progress from '@/shared/components/Progress/Progress';
import { Separator } from '@/shared/components/Separator/Separator';
import { cn } from '@/shared/utils/component.utils';
import { ReactNode } from 'react';
import AllocationAmount from './AllocationAmount';
import AllocationClass from './AllocationClass';
import AllocationEditButton from './AllocationEditButton';
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
    <div className={cn('flex flex-col gap-4', className)}>
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
            <AllocationEditButton allocation={allocation} {...props} />
          </div>
          <Separator />
        </div>
      ))}
    </div>
  );
}
