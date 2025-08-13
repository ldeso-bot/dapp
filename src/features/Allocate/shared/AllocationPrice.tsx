import { formatPriceUSD } from '@/shared/utils/string.utils';
import { AllocationsTableItemProps } from './AllocationsTable.types';

export default function AllocationPrice({
  allocation,
}: AllocationsTableItemProps) {
  return <div className="font-bold">{formatPriceUSD(allocation.priceUSD)}</div>;
}
