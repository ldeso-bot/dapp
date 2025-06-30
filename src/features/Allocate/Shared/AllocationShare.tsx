import { formatPercentage } from '@/shared/utils/string.utils';
import { AllocationsTableItemProps } from './AllocationsTable.types';

export default function AllocationShare({
  allocation,
}: AllocationsTableItemProps) {
  return (
    <div className="font-bold">{formatPercentage(allocation.sharePercent)}</div>
  );
}
