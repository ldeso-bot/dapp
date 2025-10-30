import { CardProps } from '@/shared/components/Card/Card';
import { ROUTES } from '@/shared/constants/route.constants';
import { tokens } from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { LiquidityPosition } from '@/shared/models/walletData';
import ClaimableRewardsTooltip from '../../Shared/ClaimableRewardsTooltip';
import HoldingsCard from '../../Shared/HoldingsCard';

export default function LiquidityPositionsCard(props: CardProps) {
  const { data } = useWalletData();
  const { data: protocolData } = useProtocolData();

  const getButtonTooltip = (liquidityPosition: LiquidityPosition) => {
    return (
      <ClaimableRewardsTooltip
        items={[
          {
            token: tokens.k2,
            amount: liquidityPosition.balance,
            valueUSD: protocolData?.metrics.kvcm.valueUSD ?? 0,
          },
          {
            token: tokens.kvcm,
            amount: liquidityPosition.balance,
            valueUSD: protocolData?.metrics.kvcm.valueUSD ?? 0,
          },
        ]}
      />
    );
  };

  return (
    <HoldingsCard
      {...props}
      title="Liquidity Positions"
      tooltip="There should be a tooltip here"
      data={data?.liquidityPositions}
      getIcon={(liquidityPosition) => {
        return tokens[liquidityPosition.token].icon(1.6);
      }}
      getButtonLabel={() => 'Claim'}
      getButtonTooltip={getButtonTooltip}
      getButtonHref={(liquidityPosition) =>
        `${ROUTES.MY_HOLDINGS}?action=unlock_lp_${liquidityPosition.id}`
      }
    />
  );
}
