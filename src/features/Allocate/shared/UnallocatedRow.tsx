'use client';

import Button from '@/shared/components/Button/Button';
import { Progress } from '@/shared/components/Progress/Progress';
import { TableCell, TableRow } from '@/shared/components/Table/table';
import { ROUTES } from '@/shared/constants/route.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import {
  formatAmountWithCommas,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';
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
  const { data: protocolData } = useProtocolData();

  const unallocatedPercent = useMemo(() => {
    if (totalAmount === 0) return 0;
    return amount / totalAmount;
  }, [amount, totalAmount]);

  const usdValue = useMemo(() => {
    const tokenPrice =
      tokenSymbol === 'kVCM'
        ? protocolData?.metrics.kvcm.valueUSD || 0
        : protocolData?.metrics.k2.valueUSD || 0;
    return amount * tokenPrice;
  }, [amount, tokenSymbol, protocolData]);

  const progressPercent = useMemo(() => {
    return unallocatedPercent;
  }, [unallocatedPercent]);

  return (
    <TableRow className="border-0 bg-gray-50/30 cursor-pointer hover:bg-gray-50/60 transition-colors">
      <TableCell className="text-left border-0">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-void-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                fill="none"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" />
            </svg>
            <div className="font-medium text-gray-700 text-size-16">
              Unallocated
            </div>
          </div>
          <div className="text-size-12 text-void-50 italic mt-0.5">
            No pricing effect
          </div>
          <Progress progressPercent={progressPercent} indeterminate />
        </div>
      </TableCell>
      <TableCell className="text-right border-0">
        <div className="font-medium text-gray-900 tabular-nums">
          {formatAmountWithCommas(amount)}{' '}
          <span className="text-void-50 text-size-12">{tokenSymbol}</span>
        </div>
        <div className="text-size-12 text-void-50 tabular-nums">
          ≈ {formatPriceUSDWithCommas(usdValue)}
        </div>
      </TableCell>
      {!isK2 && (
        <TableCell className="text-center border-0">
          <span className="text-size-12 text-void-50">—</span>
        </TableCell>
      )}
      <TableCell className="text-center border-0">
        <span className="text-size-12 text-void-50">—</span>
      </TableCell>
      <TableCell colSpan={2} className="border-0 justify-end !pr-6">
        <div className="flex items-center justify-end gap-2">
          <Button
            className="w-fit"
            href={`${ROUTES.ALLOCATE}?action=new_allocation_${tokenSymbol.toLowerCase()}`}
          >
            Allocate
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
