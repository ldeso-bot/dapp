import { AllocationsTableItemProps } from './AllocationsTable.types';

export default function AllocationClass({
  allocation,
}: AllocationsTableItemProps) {
  return <div className="font-bold">{allocation.carbonClass}</div>;
}
