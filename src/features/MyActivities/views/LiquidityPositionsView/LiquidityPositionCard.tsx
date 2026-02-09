import Button from '@/shared/components/Button/Button';
import Icon from '@/shared/components/Icon/Icon';
import { LpToken } from '@/shared/constants/tokens.constants';
import {
  DEPOSIT_KVCM_K2_LIQUIDITY_URL,
  DEPOSIT_KVCM_USDC_LIQUIDITY_URL,
} from '@/shared/constants/urls.constants';
import ExternalLink from '@/shared/images/external_link.svg';
import Plus from '@/shared/images/plus.svg';
import { getTokenIcon, getTokenSymbol } from '@/shared/utils/token.utils';
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
        <Button
          target="_blank"
          colors="secondary"
          href={depositLiquidityUrl}
          className="h-[3.2rem] px-3 !pl-2 py-2 flex items-center gap-2"
        >
          <Icon icon={Plus} size={1.6} />
          Deposit
          <Icon icon={ExternalLink} size={1.5} />
        </Button>
      </div>
      <LiquidityPositionStatus token={token} />
    </div>
  );
};
