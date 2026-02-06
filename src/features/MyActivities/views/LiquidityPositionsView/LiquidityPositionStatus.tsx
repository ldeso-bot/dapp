import {
  StatusCard,
  StatusCardTitle,
} from '@/features/MyActivities/cards/StatusCards/StatusCards';
import { TokenPositions } from '@/features/MyActivities/shared/TokenPositions';
import Button from '@/shared/components/Button/Button';
import { LpToken } from '@/shared/constants/tokens.constants';
import { formatDurationFromTimestamp } from '@/shared/utils/date.utils';
import { formatAmountWithCommas } from '@/shared/utils/string.utils';
import { getTokenSymbol } from '@/shared/utils/token.utils';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { useHoldingsData } from '../../hooks/useHoldingsData';
import { stakeLpTokenDialogAtom } from '../../modals/StakeLpToken/stakeLpToken.utils';

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
                tooltip="Liquidity lots which reached their terms' end and can be unstaked. Incentives are claimable."
              >
                Claimable
              </StatusCardTitle>
              <div className="space-y-1">
                <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                  {formatAmountWithCommas(
                    tokenData.claimableRewardsPlusPrincipalAmount
                  )}
                </div>
                <div className="text-size-14 text-gray-500 tabular-nums">
                  {tokenData.maturedLocks.length > 0 ? (
                    <>
                      {tokenSymbol} • {tokenData.maturedLocks.length} lots
                    </>
                  ) : (
                    'No claimable lots'
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
                tooltip="Locked lots which are accruing incentives. Cannot be unstaked early."
              >
                Locked Liquidity
              </StatusCardTitle>
              <div className="space-y-1">
                <div className="text-size-18 font-bold text-gray-900">
                  {formatAmountWithCommas(tokenData.lockedAmount)}
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
                tooltip="LP tokens deposited on Aerodrome but not staked in Klima Protocol and not accruing protocol incentives."
              >
                On Dex
              </StatusCardTitle>
              <div className="space-y-1">
                <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                  {formatAmountWithCommas(tokenData.balanceValue)}
                </div>
                <div className="text-size-14 text-gray-500 tabular-nums">
                  {tokenSymbol}
                </div>
              </div>
              <Button
                className="mt-3 h-[3.6rem]"
                onClick={handleOpenStakeDialog}
              >
                Stake in Klima
              </Button>
            </>
          )}
        </StatusCard>
      </div>
      <div className="flex flex-col gap-2 my-4 mx-auto max-w-[60%]"></div>
      {tokenData && tokenData.locks.length > 0 && (
        <TokenPositions
          isOpen={tokenLotsOpen}
          onOpenChange={setTokenLotsOpen}
          token={token}
        />
      )}
    </div>
  );
};
