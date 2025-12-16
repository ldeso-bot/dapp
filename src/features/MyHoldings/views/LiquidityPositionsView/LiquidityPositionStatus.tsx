import {
  StatusCard,
  StatusCardTitle,
} from '@/features/MyHoldings/cards/StatusCards/StatusCards';
import { TokenLots } from '@/features/MyHoldings/shared/TokenLots';
import Button from '@/shared/components/Button/Button';
import { LpToken } from '@/shared/constants/tokens.constants';
import { formatDurationFromTimestamp } from '@/shared/utils/date.utils';
import { formatPriceUSDWithCommas } from '@/shared/utils/string.utils';
import { getTokenSymbol } from '@/shared/utils/token.utils';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { useHoldingsData } from '../../hooks/useHoldingsData';
import { stakeLpTokenDialogAtom } from '../../modals/StakeLpToken/stakeLpToken.utils';
import { HoldingEstimatedValue } from '../../shared/HoldingEstimatedValue';

interface LiquidityPositionStatusProps {
  token: LpToken;
}

export const LiquidityPositionStatus = ({
  token,
}: LiquidityPositionStatusProps) => {
  const [tokenLotsOpen, setTokenLotsOpen] = useState(false);
  const { data: holdingsData } = useHoldingsData();
  const setStakeLpTokenDialog = useSetAtom(stakeLpTokenDialogAtom);

  const tokenData =
    token === 'kvcm-usdc' ? holdingsData?.kvcmUsdc : holdingsData?.kvcmK2;

  const tokenSymbol = getTokenSymbol(token);

  const earliestUnlockTimestamp =
    tokenData && tokenData.activeLocks.length > 0
      ? Math.min(...tokenData.activeLocks.map((lock) => lock.lockedUntil))
      : undefined;

  const handleOpenTokenLots = () => setTokenLotsOpen((prevOpen) => !prevOpen);

  const handleOpenStakeDialog = () =>
    setStakeLpTokenDialog({
      open: true,
      token,
    });

  return (
    <div className="bg-white rounded-lg p-6 pb-0 shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatusCard skeletonClassName="h-[15.3rem]">
          {tokenData && (
            <>
              <StatusCardTitle
                badge="green"
                tooltip="LP lots that reached maturity and can be unstaked. Rewards are claimable."
              >
                Matured
              </StatusCardTitle>
              <div className="space-y-1">
                <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                  {formatPriceUSDWithCommas(tokenData.accruedClaimableValue)}
                </div>
                <div className="text-size-14 text-gray-500 tabular-nums">
                  {tokenData.maturedLocks.length > 0 ? (
                    <>
                      {tokenSymbol} • {tokenData.maturedLocks.length} lots
                    </>
                  ) : (
                    'No matured lots'
                  )}
                </div>
              </div>
              {tokenData.maturedLocks.length > 0 && (
                <button
                  onClick={handleOpenTokenLots}
                  className="cursor-pointer mt-6 text-size-14 text-gray-900 hover:text-gray-700 underline underline-offset-2 font-medium"
                >
                  Claim/unstake lots
                </button>
              )}
            </>
          )}
        </StatusCard>
        <StatusCard>
          {tokenData && (
            <>
              <StatusCardTitle
                badge="yellow"
                tooltip="LP lots that are still locked and accruing rewards. Cannot be unstaked until maturity."
              >
                Maturing
              </StatusCardTitle>
              <div className="space-y-1">
                <div className="text-size-18 font-bold text-gray-900">
                  {formatPriceUSDWithCommas(tokenData.accruingClaimableValue)}
                </div>
                {earliestUnlockTimestamp && (
                  <div className="text-size-14 text-gray-500">
                    {tokenSymbol} • next unlock in{' '}
                    {formatDurationFromTimestamp(earliestUnlockTimestamp)}
                  </div>
                )}
              </div>
            </>
          )}
        </StatusCard>
        <StatusCard>
          {tokenData && (
            <>
              <StatusCardTitle
                badge="blue"
                tooltip="LP tokens deposited on the DEX but not staked in Klima. Not earning protocol rewards."
              >
                On Dex
              </StatusCardTitle>
              <div className="space-y-1">
                <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                  {formatPriceUSDWithCommas(tokenData.balanceValue)}
                </div>
                <div className="text-size-14 text-gray-500 tabular-nums">
                  {tokenSymbol}
                </div>
              </div>
              <Button
                className="mt-3 h-[3.8rem]"
                onClick={handleOpenStakeDialog}
              >
                Stake in Klima
              </Button>
            </>
          )}
        </StatusCard>
      </div>
      <div className="flex flex-col gap-2 my-4 mx-auto max-w-[60%]">
        {tokenData && (
          <HoldingEstimatedValue
            estimatedValue={tokenData.positionValue}
            tooltip="Total value of your LP position including estimated accrued rewards."
          />
        )}
      </div>
      {tokenData && tokenData.locks.length > 0 && (
        <TokenLots
          isOpen={tokenLotsOpen}
          onOpenChange={setTokenLotsOpen}
          token={token}
        />
      )}
    </div>
  );
};
