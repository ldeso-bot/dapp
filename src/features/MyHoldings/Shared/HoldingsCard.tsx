import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import Icon from '@/shared/components/Icon/Icon';
import Plus from '@/shared/images/plus.svg';
import { Holding } from '@/shared/models/walletData';
import { HoldingsCardProps } from './HoldingsTable.types';
import HoldingsTableDesktop from './HoldingsTableDesktop';
import HoldingsTableMobile from './HoldingsTableMobile';

export default function HoldingsCard<T extends Holding>(
  props: HoldingsCardProps<T>
) {
  return (
    <Card
      {...props}
      skeletonClassName="h-50"
      titleAddOnFar={
        <Button colors="secondary">
          <Icon icon={Plus} size={16} /> Lock
        </Button>
      }
    >
      {props.data && (
        <>
          <HoldingsTableDesktop {...props} className="hidden lg:table" />
          <HoldingsTableMobile {...props} className="lg:hidden" />
        </>
      )}
    </Card>
  );
}
