import Button from '@/shared/components/Button/Button';
import { ROUTES } from '@/shared/constants/route.constants';
import {
  DEPOSIT_KVCM_K2_LIQUIDITY_URL,
  DEPOSIT_KVCM_USDC_LIQUIDITY_URL,
} from '@/shared/constants/urls.constants';
import { LiquidityPoolInfo } from '@/shared/models/ProtocolData';

type Props = {
  poolInfo: LiquidityPoolInfo;
};

export default function PoolButtons({ poolInfo }: Props) {
  const depositLiquidityUrl =
    poolInfo.token === 'kvcm-usdc'
      ? DEPOSIT_KVCM_USDC_LIQUIDITY_URL
      : DEPOSIT_KVCM_K2_LIQUIDITY_URL;
  return (
    <>
      <Button href={depositLiquidityUrl} target="_blank">
        Deposit Liquidity
      </Button>
      <Button href={`${ROUTES.MY_ACTIVITIES}?action=lock_${poolInfo.token}`}>
        Stake Liquidity
      </Button>
    </>
  );
}
