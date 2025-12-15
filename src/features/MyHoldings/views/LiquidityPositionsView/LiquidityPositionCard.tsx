import Button from '@/shared/components/Button/Button';
import { LpToken } from '@/shared/constants/tokens.constants';
import {
  DEPOSIT_KVCM_K2_LIQUIDITY_URL,
  DEPOSIT_KVCM_USDC_LIQUIDITY_URL,
} from '@/shared/constants/urls.constants';
import { getTokenIcon, getTokenSymbol } from '@/shared/utils/token.utils';
import { LiquidityPositionRewards } from './LiquidityPositionRewards';
import { LiquidityPositionStatus } from './LiquidityPositionStatus';

interface LiquidityPositionCardProps {
  token: LpToken;
}

export const LiquidityPositionCard = ({
  token,
}: LiquidityPositionCardProps) => {
  const tokenSymbol = getTokenSymbol(token);

  const depositLiquidityUrl =
    token === 'kvcm-usdc'
      ? DEPOSIT_KVCM_USDC_LIQUIDITY_URL
      : DEPOSIT_KVCM_K2_LIQUIDITY_URL;

  return (
    <div className="flex flex-col gap-4 border border-gray-200 bg-gray-50 shadow-sm rounded-lg p-6 pb-8 pt-4">
      <div className="flex justify-between items-center gap-2 my-2">
        <div className="flex items-center gap-2">
          {getTokenIcon(token, 2.8)}
          <h4 className="text-size-16 font-medium text-gray-900">
            {tokenSymbol}
          </h4>
        </div>
        <Button href={depositLiquidityUrl} target="_blank">
          Deposit
        </Button>
      </div>
      <LiquidityPositionStatus token={token} />
      <LiquidityPositionRewards token={token} />
    </div>
  );
};
