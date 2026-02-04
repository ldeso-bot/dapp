import { useAllocationData } from '@/features/Allocate/hooks/useAllocationData';
import Button from '@/shared/components/Button/Button';
import { CardProps } from '@/shared/components/Card/Card';
import Icon from '@/shared/components/Icon/Icon';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import k2Icon from '@/shared/images/k2.svg';
import Plus from '@/shared/images/plus.svg';
import { AllocationsTable } from '../../shared/AllocationsTable';

export default function K2AllocationsCard(props: CardProps) {
  const { data } = useWalletData();
  const { data: allocationData } = useAllocationData();

  const totalK2 = data?.balances?.k2 || 0;
  const allocations = allocationData?.k2.allocations || [];
  const unallocatedK2 = allocationData?.k2.unallocated || 0;

  return (
    <AllocationsTable
      {...props}
      id="k2-allocations"
      showCategoryFilter
      title={
        <div className="flex items-center gap-2">
          <Icon icon={k2Icon} alt="K2" size={2.4} />
          <span>K2 Allocations</span>
        </div>
      }
      titleClassName="text-size-18 font-medium"
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
          className="w-fit h-[3.2rem]"
          href={`${ROUTES.ALLOCATE}?action=new_allocation_k2`}
        >
          <Icon icon={Plus} size={1.6} /> New Allocation
        </Button>
      }
      lockWarning="Locked allocations cannot be modified until unlock date."
    />
  );
}
