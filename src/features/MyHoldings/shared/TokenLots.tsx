import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/Accordion/Accordion';
import Button from '@/shared/components/Button/Button';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { DEV_MODE, USE_LOCAL_RPC } from '@/shared/constants/config.constants';
import { AllocationToken, Token } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { cn } from '@/shared/utils/component.utils';
import {
  formatAmountWithCommas,
  formatPercentage,
  formatTimestamp,
} from '@/shared/utils/string.utils';
import { getTokenSymbol } from '@/shared/utils/token.utils';
import { useSetAtom } from 'jotai';
import { type FC } from 'react';
import { claimKvcmLockRewardsDialogAtom } from '../modals/ClaimKvcmLockRewards/claimKvcmLockRewards.utils';
import { claimTokenDialogAtom } from '../modals/ClaimToken/claimToken.utils';
import { depositK2TokenDialogAtom } from '../modals/DepositK2Token/depositK2Token.utils';
import { topupLockDialogAtom } from '../modals/TopupLock/topupLock.utils';

type TokenLotsProps = {
  isOpen?: boolean;
  token: Token;
  onOpenChange?: (isOpen: boolean) => void;
};

export const TokenLots: FC<TokenLotsProps> = ({
  isOpen,
  onOpenChange,
  token,
}) => {
  const { data } = useWalletData();
  const setTopupLockDialog = useSetAtom(topupLockDialogAtom);
  const setDepositK2TokenDialog = useSetAtom(depositK2TokenDialogAtom);
  const setClaimTokenDialog = useSetAtom(claimTokenDialogAtom);
  const setClaimKvcmLockRewardsDialog = useSetAtom(
    claimKvcmLockRewardsDialogAtom
  );

  const locks =
    data?.locks
      ?.filter((lock) => lock.token === token)
      .sort((a, b) => a.lockedUntil - b.lockedUntil) ?? [];

  const numberOfLots = locks.length;

  if (!numberOfLots) return null;

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
              View lots ({numberOfLots})
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
              const isMatured = lock.status === 'matured';
              const isMaturing = lock.status === 'active';
              const title = DEV_MODE
                ? `Contract ID: ${lock.contractLockId}\nMaturity ID: ${lock.maturityId}`
                : '';

              return (
                <div
                  className="flex items-center justify-between gap-2 border border-gray-300 rounded-lg px-4 py-3"
                  key={lock.id + lock.token}
                  title={title}
                >
                  <div className="flex items-center justify-start gap-2">
                    <div className="text-size-16 text-gray-900 font-medium">
                      {formatAmountWithCommas(lock.lockedAmount)}{' '}
                      {getTokenSymbol(lock.token)}
                    </div>
                    <span className="text-gray-400">•</span>
                    <div className="text-size-14 text-gray-500 font-[400]">
                      {formatTimestamp(lock.lockedUntil * 1000)}
                    </div>
                    <span className="text-gray-400">•</span>
                    <div
                      className={cn(
                        'py-1 px-3 !text-[1.2rem] rounded-full font-medium',
                        {
                          'bg-green-100 text-green-800': isMatured,
                          'bg-gray-100 text-gray-800': isMaturing,
                        }
                      )}
                    >
                      {isMatured ? 'Ready to unlock' : 'Locked'}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex gap-1 text-gray-500">
                      <div>Current incentive rate</div>
                      <div>
                        {formatPercentage(
                          token === 'kvcm'
                            ? lock.syntheticYieldApyPercent
                            : lock.riskyYieldApyPercent
                        )}
                      </div>
                    </div>
                    <span className="text-gray-400">•</span>
                    <div className="flex gap-1 text-gray-500">
                      <div>
                        {formatAmountWithCommas(lock.rewards.kvcm)}{' '}
                        {getTokenSymbol('kvcm')}
                      </div>
                      <div>accrued</div>
                    </div>
                    <div className="w-px border-gray-400 border-l h-[1.8rem]" />

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
                              token: lock.token as AllocationToken,
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
                      colors="positive"
                      disabled={isMaturing && !USE_LOCAL_RPC}
                      className="text-size-12"
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
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
