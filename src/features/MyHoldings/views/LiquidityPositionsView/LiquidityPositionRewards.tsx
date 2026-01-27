import {
  VariableRewardsCard,
  VariableRewardsHeader,
  VariableRewardsItem,
  VariableRewardsItemContent,
  VariableRewardsItemTitle,
} from '@/features/MyHoldings/cards/VariableRewardsCard/VariableRewardsCard';
import { LpToken } from '@/shared/constants/tokens.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import {
  formatCurrentTime,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';
import { getTokenSymbol } from '@/shared/utils/token.utils';
import { useHoldingsData } from '../../hooks/useHoldingsData';

interface LiquidityPositionRewardsProps {
  token: LpToken;
}

export const LiquidityPositionRewards = ({
  token,
}: LiquidityPositionRewardsProps) => {
  const { data: holdingsData } = useHoldingsData();
  const { data: protocolData } = useProtocolData();

  const tokenData =
    token === 'kvcm-usdc' ? holdingsData?.kvcmUsdc : holdingsData?.kvcmK2;

  const k2Apr =
    token === 'kvcm-usdc'
      ? null
      : protocolData?.midnightInfos?.k2ApyForKVCM_K2_LP
        ? `${(protocolData.midnightInfos.k2ApyForKVCM_K2_LP * 100).toFixed(2)}%`
        : null;

  return (
    <VariableRewardsCard skeletonClassName="h-[14.1rem]">
      {tokenData && (
        <>
          <VariableRewardsHeader
            title="Variable Rewards"
            timestamp={formatCurrentTime()}
            description="Incentives received from your locked liquidity tokens. These incentives depend on protocol parameters, are variable, non-guaranteed, and may be zero."
          />
          {tokenData.k2ClaimableAmount > 0 && (
            <VariableRewardsItem>
              <VariableRewardsItemTitle
                title="Incentives (K2)"
                tooltip="Programmatic K2 incentives. Accrues per lot and unlocks at maturity."
                aprValue={k2Apr}
                aprTooltip="The annual percentage rate of the variable rewards. This is an estimate, is not guaranteed, can change, and may be zero."
              />
              <VariableRewardsItemContent>
                <div className="flex flex-1 flex-col">
                  <span className="text-gray-900 font-medium">
                    {tokenData.k2ClaimableAmount.toFixed(2)}{' '}
                    {getTokenSymbol('k2')}
                  </span>
                  <span className="text-size-12 text-gray-500">
                    {formatPriceUSDWithCommas(tokenData.k2ClaimableValue)}
                  </span>
                  <span className="text-size-12 text-gray-500">
                    Accrued to date:{' '}
                    {tokenData.k2AccruedClaimableAmount.toFixed(2)}{' '}
                    {getTokenSymbol('k2')} • Accruing:{' '}
                    {tokenData.k2AccruingClaimableAmount.toFixed(2)}{' '}
                    {getTokenSymbol('k2')}
                  </span>
                </div>
              </VariableRewardsItemContent>
            </VariableRewardsItem>
          )}

          {tokenData.kvcmClaimableAmount > 0 && (
            <VariableRewardsItem>
              <VariableRewardsItemTitle
                title="Protocol Distribution (kVCM)"
                tooltip="kVCM incentives routed by protocol parameters. Accrues per lot and unlocks at maturity."
              />
              <VariableRewardsItemContent>
                <div className="flex flex-1 flex-col">
                  <span className="text-gray-900 font-medium">
                    {tokenData.kvcmClaimableAmount.toFixed(2)}{' '}
                    {getTokenSymbol('kvcm')}
                  </span>
                  <span className="text-size-12 text-gray-500">
                    {formatPriceUSDWithCommas(tokenData.kvcmClaimableValue)}
                  </span>
                  <span className="text-size-12 text-gray-500">
                    Accrued to date:{' '}
                    {tokenData.kvcmAccruedClaimableAmount.toFixed(2)}{' '}
                    {getTokenSymbol('k2')} • Accruing:{' '}
                    {tokenData.kvcmAccruingClaimableAmount.toFixed(2)}{' '}
                    {getTokenSymbol('k2')}
                  </span>
                </div>
              </VariableRewardsItemContent>
            </VariableRewardsItem>
          )}
        </>
      )}
    </VariableRewardsCard>
  );
};
