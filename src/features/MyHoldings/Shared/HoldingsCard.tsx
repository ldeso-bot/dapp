import Card from '@/shared/components/Card/Card';
import { Holding } from '@/shared/models/walletData';
import { HoldingsCardProps } from './HoldingsTable.types';
import HoldingsTableDesktop from './HoldingsTableDesktop';
import HoldingsTableMobile from './HoldingsTableMobile';

export default function HoldingsCard<T extends Holding>(
  props: HoldingsCardProps<T>
) {
  return (
    <Card {...props} skeletonClassName="h-50">
      {props.data && (
        <>
          <HoldingsTableDesktop {...props} className="hidden lg:table" />
          <HoldingsTableMobile {...props} className="lg:hidden" />
        </>
      )}
    </Card>
  );
}
