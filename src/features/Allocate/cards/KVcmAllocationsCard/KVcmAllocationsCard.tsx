import Button from '@/shared/components/Button/Button';
import { CardProps } from '@/shared/components/Card/Card';
import Icon from '@/shared/components/Icon/Icon';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import Plus from '@/shared/images/plus.svg';
import AllocationsTable from '../../shared/AllocationsTable';

export default function KvcmAllocationsCard(props: CardProps) {
  const { data } = useWalletData();

  const allocations = data?.allocations?.filter(
    (allocation) => allocation.token.name === 'kvcm'
  );

  return (
    <AllocationsTable
      {...props}
      title="kVCM Allocations"
      tooltip="There should be a tooltip here"
      data={allocations}
      noAllocationComponent={
        <div className="bg-void-10 py-3 px-6 w-full">
          You haven’t allocated any of your bonded kVCM yet. Get started.
        </div>
      }
      tokenInfo={tokens.kvcm}
      titleAddOnFar={
        <Button
          colors="secondary"
          href={`${ROUTES.ALLOCATE}?action=new_allocation_kvcm`}
        >
          <Icon icon={Plus} size={1.6} /> New Allocation
        </Button>
      }
    />
  );
}
