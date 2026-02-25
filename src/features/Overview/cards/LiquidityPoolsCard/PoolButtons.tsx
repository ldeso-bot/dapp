import Button from '@/shared/components/Button/Button';
import Icon from '@/shared/components/Icon/Icon';
import { ROUTES } from '@/shared/constants/route.constants';
import {
  DEPOSIT_KVCM_K2_LIQUIDITY_URL,
  DEPOSIT_KVCM_USDC_LIQUIDITY_URL,
} from '@/shared/constants/urls.constants';
import ExternalLink from '@/shared/images/external_link.svg';
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
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button
        href={depositLiquidityUrl}
        target="_blank"
        colors="primary"
        style={{ flex: 1 }}
      >
        Deposit
        <Icon
          icon={ExternalLink}
          size={1.5}
          style={{ filter: 'brightness(0) saturate(100%)' }}
        />
      </Button>
      <Button
        href={`${ROUTES.MY_ACTIVITIES}?action=lock_${poolInfo.token}`}
        colors="secondary"
        style={{ flex: 1 }}
      >
        Stake
      </Button>
    </div>
  );
}
