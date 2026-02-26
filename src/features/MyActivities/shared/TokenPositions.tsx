import { useHasKycVerification } from '@/features/Kyc/useHasKycVerification';
import Button from '@/shared/components/Button/Button';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { DEV_MODE, USE_LOCAL_RPC } from '@/shared/constants/config.constants';
import { Token } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { Lock } from '@/shared/models/walletData';
import { cn } from '@/shared/utils/component.utils';
import {
  formatAmountWithCommas,
  formatPercentage,
  formatPriceUSDWithCommas,
  formatTimestamp,
} from '@/shared/utils/string.utils';
import { getTokenSymbol } from '@/shared/utils/token.utils';
import { useSetAtom } from 'jotai';
import { type FC } from 'react';
import { claimMaturedLockRewardsDialogAtom } from '../modals/ClaimMaturedLockRewards/claimKvcmLockRewards.utils';
import { depositK2TokenDialogAtom } from '../modals/DepositK2Token/depositK2Token.utils';
import { topupLockDialogAtom } from '../modals/TopupLock/topupLock.utils';

type TokenPositionsProps = {
  isOpen?: boolean;
  token: Token;
  onOpenChange?: (isOpen: boolean) => void;
  rewardsTooltipContent: string;
};

export const TokenPositions: FC<TokenPositionsProps> = ({
  token,
  rewardsTooltipContent,
}) => {
  const { data } = useWalletData();

  const locks =
    data?.locks
      ?.filter((lock) => lock.token === token)
      .sort((a, b) => a.lockedUntil - b.lockedUntil) ?? [];

  if (!locks.length) return null;

  return (
    <div className="border-t border-gray-100 pb-5">
      <div className="flex items-center gap-2 py-3" />
      <div className="text-size-14">
        <div className="flex flex-col gap-3">
          {locks.map((lock) => (
            <PositionCard
              key={lock.id}
              lock={lock}
              rewardsTooltipContent={rewardsTooltipContent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

type PositionCardProps = {
  lock: Lock;
  rewardsTooltipContent: string;
};

const PositionCard: FC<PositionCardProps> = ({
  lock,
  rewardsTooltipContent,
}) => {
  const setTopupLockDialog = useSetAtom(topupLockDialogAtom);
  const setDepositK2TokenDialog = useSetAtom(depositK2TokenDialogAtom);
  const setClaimMaturedLockRewardsDialog = useSetAtom(
    claimMaturedLockRewardsDialogAtom
  );
  const { openKycOrProceed } = useHasKycVerification();

  if (lock.status === 'claimed') return null;

  const isClaimable = lock.isClaimable;
  const isMatured = lock.status === 'matured';

  const title = DEV_MODE
    ? `
ID: ${lock.id}
Contract ID: ${lock.contractLockId}
Maturity ID: ${lock.maturityId}
Created: ${formatTimestamp(lock.created * 1000, 'short')}
isPartiallyClaimed: ${lock.isPartiallyClaimed}
    `
    : '';

  const token = lock.token;

  const baseApy =
    token === 'kvcm'
      ? lock.syntheticYieldApyPercent
      : lock.riskyYieldApyPercent;

  const baseRewardAmount = isMatured
    ? lock.rewards.kvcm
    : lock.accruingRewards.kvcm;

  const k2RewardAmount = isMatured ? lock.rewards.k2 : lock.accruingRewards.k2;

  const statusText = lock.isPartiallyClaimed
    ? 'Partially claimed'
    : isMatured
      ? 'Ready to unlock'
      : 'Unlocks on';

  const showTopUp = lock.canTopUp;

  return (
    <div title={title} className="rounded-xl overflow-hidden">
      {/* Status and date */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 px-3 py-2 border-void-20 border-x-1 border-t-1 rounded-t-xl bg-void-10">
        <div
          className={cn(
            'flex flex-row gap-1 px-2 py-1 rounded-3xl font-bold',
            isMatured ? 'bg-green-10 text-green-80' : 'bg-void-10 text-void-80'
          )}
        >
          {statusText}
        </div>

        <span className="text-12 text-gray-600">
          {formatTimestamp(lock.lockedUntil * 1000, 'short')}
        </span>
      </div>
      {/* Content */}
      <div className="grid gap-4 px-3 py-3 border-void-20 border-x-1 border-b-1 rounded-b-xl grid-cols-1 sm:grid-cols-12">
        {/* Principal */}
        <div className="flex flex-col gap-2 sm:col-span-4 min-w-0">
          <div className="flex flex-col gap-1">
            <div className="text-size-12 text-gray-500 font-[400]">
              Original amount locked
            </div>

            <div className="text-size-16 text-gray-900 font-bold break-words">
              {formatAmountWithCommas(lock.originalLockedAmount, 'auto')}{' '}
              {getTokenSymbol(lock.token)}
            </div>

            <div className="text-size-14 text-gray-900 font-[400]">
              {formatPriceUSDWithCommas(lock.originalLockedValueUSD)}
            </div>
          </div>
        </div>
        {/* Rewards */}
        <div className="flex flex-col gap-2 sm:col-span-5 min-w-0">
          <div className="flex items-center gap-1 min-w-0">
            <div className="text-size-12 text-gray-500 font-[400] leading-tight">
              {isMatured ? 'Rewards' : 'Incentives (accruing)'}
            </div>

            <Tooltip
              className="max-w-[30rem] text-size-12 p-3"
              content={rewardsTooltipContent}
            />
          </div>
          {/* Base Reward */}
          <div className="flex items-center justify-between sm:justify-start gap-2 min-w-0">
            <div className="bg-gray-100 text-gray-800 py-1 px-2 rounded-full text-size-12 font-medium shrink-0">
              kVCM
            </div>

            <div className="text-size-14 text-gray-900 font-[400] text-right sm:text-left break-words min-w-0">
              {formatAmountWithCommas(baseRewardAmount, 'auto')}{' '}
              {getTokenSymbol('kvcm')} at {formatPercentage(baseApy)}
            </div>
          </div>
          {/* K2 Reward */}
          <div className="flex items-center justify-between sm:justify-start gap-2 min-w-0">
            <div className="bg-gray-100 text-gray-800 py-1 px-2 rounded-full text-size-12 font-medium shrink-0">
              K2
            </div>

            <div className="text-size-14 text-gray-900 font-[400] text-right sm:text-left break-words min-w-0">
              {formatAmountWithCommas(k2RewardAmount, 'auto')} K2 at{' '}
              {formatPercentage(lock.k2YieldApyPercent)}
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end sm:gap-2">
            <Button
              colors={isClaimable ? 'positive' : 'neutral'}
              disabled={!isClaimable && !USE_LOCAL_RPC}
              className={cn(
                'text-size-12 w-full',
                showTopUp ? 'col-start-1' : 'col-span-2',
                {
                  'bg-gray-100 text-gray-400 hover:bg-gray-100':
                    !isClaimable && !USE_LOCAL_RPC,
                }
              )}
              onClick={() => {
                if (
                  lock.token === 'kvcm' ||
                  lock.token === 'kvcm-k2' ||
                  lock.token === 'kvcm-usdc'
                ) {
                  setClaimMaturedLockRewardsDialog({
                    open: true,
                    lock,
                  });
                }
              }}
            >
              Claim
            </Button>

            {showTopUp && (
              <Button
                colors="neutral"
                className="text-size-12 w-full col-start-2"
                onClick={() => {
                  if (lock.token === 'k2') {
                    openKycOrProceed('deposit_k2', () =>
                      setDepositK2TokenDialog({ open: true })
                    );
                  } else {
                    setTopupLockDialog({
                      open: true,
                      lock,
                    });
                  }
                }}
              >
                Top up
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
