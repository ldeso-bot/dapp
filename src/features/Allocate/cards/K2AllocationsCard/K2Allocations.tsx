import Button from '@/shared/components/Button/Button';
import { CardProps } from '@/shared/components/Card/Card';
import Icon from '@/shared/components/Icon/Icon';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import Plus from '@/shared/images/plus.svg';
import { AllocationsTable } from '../../shared/AllocationsTable';

export default function K2AllocationsCard(props: CardProps) {
  const { data } = useWalletData();

  const allocations = data?.allocations?.filter(
    (allocation) => allocation.token.name === 'k2'
  );

  const totalK2 = data?.balances?.k2 || 0;
  const allocatedK2 =
    allocations?.reduce((sum, alloc) => sum + alloc.amount, 0) || 0;
  const unallocatedK2 = totalK2 - allocatedK2;

  return (
    <AllocationsTable
      {...props}
      showCategoryFilter
      title="K2 Allocations"
      titleAddOnBadge="Price Strength"
      titleClassName="text-size-18 font-medium"
      tooltip="Rebalancing kVCM never unlocks your position early. Maturity dates stay unchanged."
      data={allocations}
      unallocatedAmount={unallocatedK2}
      totalAmount={totalK2}
      noAllocationComponent={
        <div className="bg-void-10 py-3 px-6 w-full">
          You haven’t locked any of your K2 yet. Create a Lock to get started.
        </div>
      }
      tokenInfo={tokens.k2}
      titleAddOnFar={
        <Button
          colors="secondary"
          href={`${ROUTES.ALLOCATE}?action=new_allocation_k2`}
        >
          <Icon icon={Plus} size={1.6} /> New Allocation
        </Button>
      }
    />
  );
}
