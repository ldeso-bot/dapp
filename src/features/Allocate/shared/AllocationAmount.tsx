import { formatAmountWithCommas } from '@/shared/utils/string.utils';
import { AllocationsTableItemProps } from './AllocationsTable.types';

export default function AllocationAmount({
  allocation,
  tokenInfo,
}: AllocationsTableItemProps) {
  return (
    <div className="font-bold flex flex-row gap-2 items-center">
      {tokenInfo.icon(1.6)}
      {formatAmountWithCommas(allocation.amount)}
    </div>
  );
}
