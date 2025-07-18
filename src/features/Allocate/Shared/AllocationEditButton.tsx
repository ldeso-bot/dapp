import Button from '@/shared/components/Button/Button';
import Icon from '@/shared/components/Icon/Icon';
import Edit from '@/shared/images/edit.svg';
import { AllocationsTableItemProps } from './AllocationsTable.types';

export default function AllocationEditButton({
  allocation,
}: AllocationsTableItemProps) {
  return (
    <Button
      className="w-full"
      href={`?action=edit_allocation_${allocation.id}`}
    >
      <Icon icon={Edit} size={1.6} />
      Edit
    </Button>
  );
}
