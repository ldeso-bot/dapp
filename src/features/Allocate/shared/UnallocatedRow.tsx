'use client';

import Button from '@/shared/components/Button/Button';
import Icon from '@/shared/components/Icon/Icon';
import { ProgressWithPercentage } from '@/shared/components/Progress/ProgressWithPercentage';
import { TableCell, TableRow } from '@/shared/components/Table/table';
import { ROUTES } from '@/shared/constants/route.constants';
import CirclePlus from '@/shared/images/circle_plus.svg';
import { formatAmountWithCommas } from '@/shared/utils/string.utils';
import { FC, useMemo } from 'react';

type UnallocatedRowProps = {
  amount: number;
  totalAmount: number;
  tokenSymbol: string;
  isK2?: boolean;
};

export const UnallocatedRow: FC<UnallocatedRowProps> = ({
  amount,
  totalAmount,
  tokenSymbol,
  isK2 = false,
}) => {
  const unallocatedPercent = useMemo(() => {
    if (totalAmount === 0) return 0;
    return Math.min(1, Math.max(0, amount / totalAmount));
  }, [amount, totalAmount]);

  return (
    <TableRow className="border-0 cursor-pointer">
      <TableCell className="text-left border-0">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2.5">
            <Icon size={2} icon={CirclePlus} className="text-text-3" />
            <div className="font-semibold text-size-16">Unallocated</div>
          </div>
          <div className="text-size-12 text-text-3 italic mt-0.5">
            No pricing effect
          </div>
          <ProgressWithPercentage
            indeterminate
            progressPercent={unallocatedPercent}
          />
        </div>
      </TableCell>
      <TableCell className="text-right border-0">
        <div className="font-medium text-text-1 tabular-nums">
          {formatAmountWithCommas(amount)}{' '}
          <span className="text-text-3 text-size-12">{tokenSymbol}</span>
        </div>
      </TableCell>
      {!isK2 && (
        <TableCell className="text-center border-0">
          <span className="text-size-12 text-text-3">—</span>
        </TableCell>
      )}
      <TableCell className="text-center border-0">
        <span className="text-size-12 text-text-3">—</span>
      </TableCell>
      <TableCell colSpan={2} className="border-0 justify-end !pr-6">
        <div className="flex items-center justify-end gap-2">
          <Button
            className="w-fit border-border-strong"
            href={`${ROUTES.ALLOCATE}?action=new_allocation_${tokenSymbol.toLowerCase()}`}
          >
            Allocate
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
