import { useCarbonClass } from '@/features/Allocate/hooks/useCarbonClass';
import { tokens } from '@/shared/constants/tokens.constants';
import { Allocation } from '@/shared/models/walletData';
import {
  formatAddress,
  formatAmountWithCommas,
} from '@/shared/utils/string.utils';
import { useMemo } from 'react';

type UseEditAllocationChangeNotificationParams = {
  allocation: Allocation | null | undefined;
  newAmount: number;
  originalAmount: number;
};

export const useEditAllocationChangeNotification = ({
  allocation,
  newAmount,
  originalAmount,
}: UseEditAllocationChangeNotificationParams) => {
  const carbonClass = useCarbonClass(allocation);
  const carbonClassName =
    carbonClass?.name ??
    (allocation ? formatAddress(allocation.carbonClass) : '');

  const tokenSymbol = allocation ? tokens[allocation.token.name].symbol : '';

  const changeNotification = useMemo(() => {
    if (!allocation) return null;

    const amountDiff = Math.abs(newAmount - originalAmount);
    if (amountDiff < 10 ** -tokens[allocation.token.name].decimals) {
      return 'The allocation amount has not changed.';
    }

    if (newAmount === 0) {
      const formattedOriginal = formatAmountWithCommas(originalAmount, 'auto');
      return `This change will remove your allocation of ${formattedOriginal} ${tokenSymbol} from ${carbonClassName}.`;
    }

    const formattedOriginal = formatAmountWithCommas(originalAmount, 'auto');
    const formattedNew = formatAmountWithCommas(newAmount, 'auto');
    return `This change will update your allocation from ${formattedOriginal} ${tokenSymbol} to ${formattedNew} ${tokenSymbol} for this carbon class.`;
  }, [allocation, newAmount, originalAmount, tokenSymbol, carbonClassName]);

  return { changeNotification, carbonClassName, tokenSymbol };
};
