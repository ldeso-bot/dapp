'use client';

import { useCarbonClass } from '@/features/Allocate/hooks/useCarbonClass';
import { getCarbonClassInfo } from '@/shared/constants/carbonClasses.constants';
import { ChainId } from '@/shared/constants/networks.constants';
import { cn } from '@/shared/utils/component.utils';
import { formatAddress } from '@/shared/utils/string.utils';
import { type FC } from 'react';
import { useAccount } from 'wagmi';
import { AllocationsTableItemProps } from './AllocationsTable.types';

export const AllocationClass: FC<AllocationsTableItemProps> = (props) => {
  const { allocation, className } = props;
  const { chain } = useAccount();
  const chainId = (chain?.id ?? 8453) as ChainId;

  const carbonClass = useCarbonClass(allocation);
  const carbonClassInfo = getCarbonClassInfo(chainId, allocation.carbonClass);

  const displayName =
    carbonClass?.name ??
    carbonClassInfo?.name ??
    formatAddress(allocation.carbonClass);

  return (
    <div
      className={cn(
        'font-semibold text-size-16 border-border-default',
        className
      )}
    >
      {displayName}
    </div>
  );
};
