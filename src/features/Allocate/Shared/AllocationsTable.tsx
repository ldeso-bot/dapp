import Card from '@/shared/components/Card/Card';
import { AllocationsCardProps } from './AllocationsTable.types';
import AllocationsTableDesktop from './AllocationsTableDesktop';
import AllocationsTableMobile from './AllocationsTableMobile';

export default function AllocationsTable(props: AllocationsCardProps) {
  return (
    <Card {...props} skeletonClassName="h-50">
      {props.data && (
        <>
          <AllocationsTableDesktop {...props} className="hidden lg:table" />
          <AllocationsTableMobile {...props} className="lg:hidden" />
        </>
      )}
    </Card>
  );
}
