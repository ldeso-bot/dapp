import Card, { CardProps } from '@/shared/components/Card/Card';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import BondsDesktop from './BondsDesktop';
import BondsMobile from './BondsMobile';

export default function BondsCard(props: CardProps) {
  const { data } = useWalletData();
  return (
    <Card {...props} title="Bonds" tooltip="There should be a tooltip here">
      {data && (
        <>
          <BondsDesktop className="hidden lg:table" />
          <BondsMobile className="lg:hidden" />
        </>
      )}
    </Card>
  );
}
