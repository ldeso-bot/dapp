import { CardProps } from '@/shared/components/Card/Card';
import TokenPair from '@/shared/components/TokenPair/TokenPair';
import { tokens } from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { LiquidityPosition } from '@/shared/models/walletData';
import ClaimableRewardsTooltip from '../../Shared/ClaimableRewardsTooltip';
import HoldingsCard from '../../Shared/HoldingsCard';

export default function LiquidityPositionsCard(props: CardProps) {
  const { data } = useWalletData();
  const { data: protocolData } = useProtocolData();

  const getIcon = (liquidityPosition: LiquidityPosition) => {
    return (
      <TokenPair
        token1={liquidityPosition.token1}
        token2={liquidityPosition.token2}
        size={16}
      />
    );
  };

  const getButtonTooltip = (liquidityPosition: LiquidityPosition) => {
    return (
      <ClaimableRewardsTooltip
        items={[
          {
            token: tokens.klimax,
            amount: liquidityPosition.balance,
            valueUSD: protocolData?.metrics.klimaBonded.valueUSD ?? 0,
          },
          {
            token: tokens.klima,
            amount: liquidityPosition.balance,
            valueUSD: protocolData?.metrics.klimaBonded.valueUSD ?? 0,
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
      getIcon={getIcon}
      getButtonLabel={() => 'Claim'}
      getButtonTooltip={getButtonTooltip}
    />
  );
}
