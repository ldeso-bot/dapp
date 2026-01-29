import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/Accordion/Accordion';
import Button from '@/shared/components/Button/Button';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { DEV_MODE, USE_LOCAL_RPC } from '@/shared/constants/config.constants';
import { Token } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { WalletData } from '@/shared/models/walletData';
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
import { claimKvcmLockRewardsDialogAtom } from '../modals/ClaimKvcmLockRewards/claimKvcmLockRewards.utils';
import { claimTokenDialogAtom } from '../modals/ClaimToken/claimToken.utils';
import { depositK2TokenDialogAtom } from '../modals/DepositK2Token/depositK2Token.utils';
import { topupLockDialogAtom } from '../modals/TopupLock/topupLock.utils';

type TokenPositionsProps = {
  isOpen?: boolean;
  token: Token;
  onOpenChange?: (isOpen: boolean) => void;
  accordionLabel?: 'lots' | 'locks';
};

export const TokenPositions: FC<TokenPositionsProps> = ({
  isOpen,
  onOpenChange,
  token,
  accordionLabel = 'lots',
}) => {
  const { data } = useWalletData();

  const locks =
    data?.locks
      ?.filter((lock) => lock.token === token)
      .sort((a, b) => a.lockedUntil - b.lockedUntil) ?? [];

  const count = locks.length;

  if (!count) return null;

  return (
    <Accordion
      type="single"
      collapsible
      value={isOpen ? 'lots' : undefined}
      onValueChange={(value) => onOpenChange?.(value === 'lots')}
    >
      <AccordionItem value="lots">
        <AccordionTrigger className="hover:no-underline border-t border-gray-100 flex items-center justify-start rounded-none gap-1">
          <div className="flex items-center gap-2">
            <div className="text-size-14 text-gray-900 font-[400]">
              View {accordionLabel} ({count})
            </div>
            <Tooltip
              className="max-w-[30rem] text-size-12 p-3"
              content={
                <div className="space-y-2">
                  <div>
                    <strong>Top up:</strong> Add tokens to a lock without
                    changing its duration. Newly added tokens are eligible for
                    variable incentives immediately.
                  </div>
                  <div>
                    <strong>Claim:</strong> Available only when tokens unlock at
                    the end of their lock duration. Claims locked tokens plus
                    any received incentives. Cannot be claimed early.
                  </div>
                </div>
              }
            />
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-size-14">
          <div className="flex flex-col gap-3">
            {locks.map((lock) => {
              return <LotCard key={lock.id} lock={lock} />;
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

type LotCardProps = {
  lock: WalletData['locks'][number];
};
const LotCard: FC<LotCardProps> = ({ lock }) => {
  const setTopupLockDialog = useSetAtom(topupLockDialogAtom);
  const setDepositK2TokenDialog = useSetAtom(depositK2TokenDialogAtom);
  const setClaimTokenDialog = useSetAtom(claimTokenDialogAtom);
  const setClaimKvcmLockRewardsDialog = useSetAtom(
    claimKvcmLockRewardsDialogAtom
  );

  const isMatured = lock.status === 'matured';
  const isMaturing = lock.status === 'active';
  const title = DEV_MODE
    ? `Contract ID: ${lock.contractLockId}\nMaturity ID: ${lock.maturityId}`
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

  return (
    <div title={title}>
      {/* Status and Date */}
      <div className="flex items-center gap-2 px-2 py-2 border-void-20 border-x-1 border-t-1 rounded-t-xl">
        <div
          className={cn(
            'flex flex-row gap-1 px-2 py-1 rounded-3xl font-bold',
            isMatured ? 'bg-green-10 text-green-80' : 'bg-void-10 text-void-80'
          )}
        >
          {isMatured ? 'Ready to unlock' : 'Locked'}{' '}
        </div>
        <span className="text-12 text-gray-600">
          {formatTimestamp(lock.lockedUntil * 1000, 'short')}
        </span>
      </div>
      <div className="grid grid-cols-8 gap-2 px-2 py-2 border-void-20 border-x-1 border-b-1 rounded-b-xl">
        {/* Left side - Principal */}
        <div className="flex flex-col gap-3 col-span-3">
          <div className="flex flex-col gap-1">
            <div className="text-size-12 text-gray-500 font-[400]">
              Principal
            </div>
            <div className="text-size-16 text-gray-900 font-bold">
              {formatAmountWithCommas(lock.lockedAmount)}{' '}
              {getTokenSymbol(lock.token)}
            </div>
            <div className="text-size-14 text-gray-900 font-[400]">
              {formatPriceUSDWithCommas(lock.lockedValueUSD)}
            </div>
          </div>
        </div>

        {/* Middle - Rewards */}
        {/* Rewards Section */}
        <div className="flex flex-col gap-2 col-span-3">
          <div className="flex items-center gap-1 ">
            <div
              className="text-size-12 text-gray-500 font-[400]"
              style={{ lineHeight: '0' }}
            >
              {isMatured ? 'Rewards' : 'Rewards (accruing)'}
            </div>
            <Tooltip
              className="max-w-[30rem] text-size-12 p-3"
              content="Base Accrual and K2 Incentives accrue while your kVCM is locked. Both are claimable at maturity along with your principal."
            />
          </div>

          {/* Base Reward */}
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 text-gray-800 py-1 px-2 rounded-full text-size-12 font-medium">
              Base
            </div>
            <div className="text-size-14 text-gray-900 font-[400]">
              {formatAmountWithCommas(baseRewardAmount)}{' '}
              {getTokenSymbol('kvcm')} at {formatPercentage(baseApy)} APR
            </div>
          </div>

          {/* K2 Reward */}
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 text-gray-800 py-1 px-2 rounded-full text-size-12 font-medium">
              K2
            </div>
            <div className="text-size-14 text-gray-900 font-[400]">
              {formatAmountWithCommas(k2RewardAmount)} K2 at{' '}
              {formatPercentage(lock.k2YieldApyPercent)} APR
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex items-center gap-2 col-span-2 flex-row-reverse">
          {isMaturing && (
            <Button
              colors="neutral"
              className="text-size-12"
              onClick={() => {
                if (lock.token === 'k2') {
                  setDepositK2TokenDialog({ open: true });
                } else {
                  setTopupLockDialog({
                    open: true,
                    token: lock.token,
                    currentLockAmount: lock.lockedAmount,
                    totalAccruingRewards: lock.rewards.kvcm,
                    tokenSymbol: getTokenSymbol(lock.token),
                    baseApy: lock.syntheticYieldApyPercent,
                    maturityDate: lock.lockedUntil,
                    maturityId: lock.maturityId,
                  });
                }
              }}
            >
              Top up
            </Button>
          )}
          <Button
            colors={isMatured ? 'positive' : 'neutral'}
            disabled={isMaturing && !USE_LOCAL_RPC}
            className={cn('text-size-12', {
              'bg-gray-100 text-gray-400 hover:bg-gray-100':
                isMaturing && !USE_LOCAL_RPC,
            })}
            onClick={() => {
              if (lock.token === 'kvcm') {
                setClaimKvcmLockRewardsDialog({
                  open: true,
                  lockId: lock.contractLockId,
                });
              } else {
                setClaimTokenDialog({
                  open: true,
                  amount: lock.lockedAmount,
                  token: lock.token,
                  lockId: lock.contractLockId,
                });
              }
            }}
          >
            Claim
          </Button>
        </div>
      </div>
    </div>
  );
};
