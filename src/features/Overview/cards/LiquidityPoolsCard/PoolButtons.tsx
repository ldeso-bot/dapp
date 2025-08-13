import Button from '@/shared/components/Button/Button';
import { ROUTES } from '@/shared/constants/route.constants';
import { LiquidityPoolInfo } from '@/shared/models/ProtocolData';

type Props = {
  poolInfo: LiquidityPoolInfo;
};

export default function PoolButtons({ poolInfo }: Props) {
  return (
    <>
      <Button>Deposit Liquidity</Button>
      <Button href={`${ROUTES.MY_HOLDINGS}?action=lock_${poolInfo.token}`}>
        Stake Liquidity
      </Button>
    </>
  );
}
