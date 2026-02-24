import { ExecuteWithValidationResult } from '@/features/MyActivities/hooks/useTransactionWithValidation';
import { Allocation } from '@/shared/models/walletData';
import { pick } from '@/shared/utils/typescript.utils';
import { exitWithErrorMessage } from '@/shared/utils/web3.utils';
import { parseUnits } from 'viem';

type AllocationFunction<T> = (
  params: T
) => Promise<ExecuteWithValidationResult>;

type BaseAllocationParams = {
  carbonClass: string;
  amount: bigint;
};

type KvcmAllocationParams = BaseAllocationParams & {
  lockId: number;
};

type K2AllocationParams = BaseAllocationParams;

type GetEditAllocationSuccessMessageParams = {
  newAmount: number;
  tokenSymbol: string;
  carbonClassName: string;
};

type ExecuteEditAllocationParams = {
  isK2: boolean;
  isKvcm: boolean;
  amountDiff: number;
  allocation: Allocation;
  allocateKvcm: AllocationFunction<KvcmAllocationParams>;
  deallocateKvcm: AllocationFunction<KvcmAllocationParams>;
  allocateK2: AllocationFunction<K2AllocationParams>;
  deallocateK2: AllocationFunction<K2AllocationParams>;
};

export const executeEditAllocation = async ({
  allocation,
  amountDiff,
  isKvcm,
  isK2,
  allocateKvcm,
  deallocateKvcm,
  allocateK2,
  deallocateK2,
}: ExecuteEditAllocationParams): Promise<ExecuteWithValidationResult> => {
  const isAllocating = amountDiff > 0;
  const baseParams = {
    lockId: allocation.contractLockId!,
    carbonClass: allocation.carbonClass,
    amount: parseUnits(Math.abs(amountDiff).toFixed(18), 18),
  };

  if (isKvcm) {
    const params = pick(baseParams, ['lockId', 'carbonClass', 'amount']);
    return isAllocating
      ? await allocateKvcm(params)
      : await deallocateKvcm(params);
  }
  if (isK2) {
    const params = pick(baseParams, ['carbonClass', 'amount']);
    return isAllocating ? await allocateK2(params) : await deallocateK2(params);
  }

  return exitWithErrorMessage('Only kVCM and K2 allocations can be edited');
};

export const getEditAllocationSuccessMessage = ({
  newAmount,
  tokenSymbol,
  carbonClassName,
}: GetEditAllocationSuccessMessageParams) => {
  return newAmount === 0
    ? `You've successfully deallocated all ${tokenSymbol} from ${carbonClassName}!`
    : `You've successfully updated your allocation to ${newAmount} ${tokenSymbol} for ${carbonClassName}!`;
};
