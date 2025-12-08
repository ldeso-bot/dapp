import { Progress } from '@/shared/components/Progress/Progress';
import { Separator } from '@/shared/components/Separator/Separator';
import { cn } from '@/shared/utils/component.utils';
import { FC, ReactNode } from 'react';
import { AllocationAmount } from './AllocationAmount';
import { AllocationClass } from './AllocationClass';
import { AllocationEditButton } from './AllocationEditButton';
import { AllocationPrice } from './AllocationPrice';
import { AllocationPriceEffect } from './AllocationPriceEffect';
import { AllocationsCardProps } from './AllocationsTable.types';

export const AllocationsTableMobile: FC<AllocationsCardProps> = (props) => {
  const { className, data } = props;

  const labelAndValue = (label: ReactNode, value: ReactNode) => (
    <div className="flex flex-col">
      <div className="text-void-50 text-size-12">{label}</div>
      {value}
    </div>
  );

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {data?.map((allocation) => (
        <div key={allocation.id} className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-y-3">
              {labelAndValue(
                'Class',
                <AllocationClass allocation={allocation} {...props} />
              )}
              {labelAndValue(
                'Amount Allocated',
                <AllocationAmount allocation={allocation} {...props} />
              )}
              {labelAndValue(
                'Price Effect',
                <AllocationPriceEffect allocation={allocation} {...props} />
              )}
              {labelAndValue(
                props.tokenInfo.id === 'kvcm'
                  ? 'Indicative Price'
                  : 'Spread Contribution',
                <AllocationPrice allocation={allocation} {...props} />
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
};
