import Button from '@/shared/components/Button/Button';
import Icon from '@/shared/components/Icon/Icon';
import { Separator } from '@/shared/components/Separator/Separator';
import Edit from '@/shared/images/edit.svg';
import clsx from 'clsx';
import AllocationAmount from './AllocationAmount';
import AllocationClass from './AllocationClass';
import AllocationPrice from './AllocationPrice';
import AllocationShare from './AllocationShare';
import { AllocationsCardProps } from './AllocationsTable.types';

export default function AllocationsTableMobile(props: AllocationsCardProps) {
  const { className, data } = props;

  if (!data) return null;

  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      {data.map((allocation) => (
        <div key={allocation.id} className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                <div className="text-void-50 text-size-12">Class</div>
                <AllocationClass allocation={allocation} {...props} />
              </div>
              <div className="flex flex-col">
                <div className="text-void-50 text-size-12"> Price</div>
                <AllocationPrice allocation={allocation} {...props} />
              </div>
              <div className="flex flex-col">
                <div className="text-void-50 text-size-12">
                  Amount Allocated
                </div>
                <AllocationAmount allocation={allocation} {...props} />
              </div>
              <div className="flex flex-col">
                <div className="text-void-50 text-size-12">
                  Allocation Share
                </div>
                <AllocationShare allocation={allocation} {...props} />
              </div>
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
