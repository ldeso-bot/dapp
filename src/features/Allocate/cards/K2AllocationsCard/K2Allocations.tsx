import { CardProps } from '@/shared/components/Card/Card';
import { tokens } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import AllocationsTable from '../../shared/AllocationsTable';

export default function K2AllocationsCard(props: CardProps) {
  const { data } = useWalletData();

  const allocations = data?.allocations?.filter(
    (allocation) => allocation.token.name === 'k2'
  );

  return (
    <AllocationsTable
      {...props}
      title="K2 Allocations"
      tooltip="There should be a tooltip here"
      noAllocationComponent={
        <div className="bg-void-10 py-3 px-6 w-full">
          You haven’t locked any of your K2 yet. Create a Lock to get started.
        </div>
      }
      data={allocations}
      tokenInfo={tokens.k2}
    />
  );
}
