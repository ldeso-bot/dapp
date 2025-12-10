import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/Accordion/Accordion';
import Button from '@/shared/components/Button/Button';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { AllocationToken } from '@/shared/constants/tokens.constants';
import { useWalletData } from '@/shared/hooks/api/useWalletData';
import { useCurrentTimestamp } from '@/shared/hooks/useCurrentTimestamp';
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
import { claimTokenDialogAtom } from '../modals/ClaimToken/claimToken.utils';
import { topupLockDialogAtom } from '../modals/TopupLock/topupLock.utils';

type TokenLotsProps = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

export const TokenLots: FC<TokenLotsProps> = ({ isOpen, onOpenChange }) => {
  const { data } = useWalletData();

  const setTopupLockDialog = useSetAtom(topupLockDialogAtom);
  const setClaimTokenDialog = useSetAtom(claimTokenDialogAtom);

  const currentTimestamp = useCurrentTimestamp();

  const totalLots = data?.locks?.length ?? 0;

  if (!totalLots) return null;

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
              View lots ({totalLots})
            </div>
            <Tooltip content="Lots tooltip here..." />
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-size-14">
          <div className="flex flex-col gap-3">
            {data?.locks.map((lock) => {
              const isMatured = lock.lockedUntil < currentTimestamp;
              const isMaturing = lock.lockedUntil > currentTimestamp;

              return (
                <div
                  className="flex items-center justify-between gap-2 border border-gray-300 rounded-lg px-4 py-3"
                  key={lock.id + lock.token}
                >
                  <div className="flex items-center justify-start gap-2">
                    <div className="text-size-16 text-gray-900 font-medium">
                      {formatAmountWithCommas(lock.balance)}{' '}
                      {getTokenSymbol(lock.token)}
                    </div>
                    <span className="text-gray-400">•</span>
                    <div className="text-size-14 text-gray-500 font-[400]">
                      {formatPriceUSDWithCommas(lock.valueUSD)}
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
                      {isMatured ? 'Matured' : 'Maturing'}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-px border-gray-400 border-r h-[1.8rem]" />
                    <div className="flex gap-1 text-gray-500">
                      <div>Base APY</div>
                      <div>
                        {formatPercentage(lock.syntheticYieldApyPercent)}
                      </div>
                    </div>
                    <span className="text-gray-400">•</span>
                    <div className="flex gap-1 text-gray-500">
                      <div>
                        {lock.rewards.kvcm} {getTokenSymbol(lock.token)}
                      </div>
                      <div>accrued</div>
                    </div>
                    <div className="w-px border-gray-400 border-l h-[1.8rem]" />

                    {isMaturing && (
                      <Button
                        colors="neutral"
                        className="text-size-12"
                        onClick={() =>
                          setTopupLockDialog({
                            open: true,
                            token: lock.token as AllocationToken,
                            currentLockAmount: lock.balance,
                            totalAccruingRewards: lock.rewards.kvcm,
                            tokenSymbol: getTokenSymbol(lock.token),
                            baseApy: lock.syntheticYieldApyPercent,
                            maturityDate: lock.lockedUntil,
                          })
                        }
                      >
                        Topup
                      </Button>
                    )}
                    <Button
                      colors="positive"
                      disabled={isMaturing}
                      className="text-size-12"
                      onClick={() =>
                        setClaimTokenDialog({
                          open: true,
                          amount: 10, // lock.balance as number,
                          token: lock.token as AllocationToken,
                        })
                      }
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
