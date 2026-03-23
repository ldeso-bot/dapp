'use client';

import { alertAtom } from '@/features/Alert/alert.atom';
import Button from '@/shared/components/Button/Button';
import Card from '@/shared/components/Card/Card';
import ButtonGroup from '@/shared/components/Form/layout/ButtonGroup';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import { Lock } from '@/shared/models/walletData';
import {
  formatAmountWithCommas,
  formatTimestamp,
} from '@/shared/utils/string.utils';
import { getTokenSymbol } from '@/shared/utils/token.utils';
import { useFormo } from '@formo/analytics';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { isNonNullish } from 'remeda';
import { ExecuteWithValidationResult } from '../../hooks/useTransactionWithValidation';
import { claimMaturedLockRewardsDialogAtom } from './claimKvcmLockRewards.utils';

type Props = {
  isLoading: boolean;
  kvcmAmount: number | undefined;
  k2Amount: number | undefined;
  lock: Lock;
  onClaim: () => Promise<ExecuteWithValidationResult>;
};

const ClaimMaturedLogRewardsForm = ({
  isLoading,
  onClaim,
  kvcmAmount,
  k2Amount,
  lock,
}: Props) => {
  const setClaimMaturedLockRewardsDialog = useSetAtom(
    claimMaturedLockRewardsDialogAtom
  );
  const setAlert = useSetAtom(alertAtom);
  const [isClaiming, setIsClaiming] = useState(false);
  const tokenSymbol = getTokenSymbol(lock.token);
  const isK2Lock = lock.token === 'k2';
  const baseAccrual = (isK2Lock ? k2Amount : kvcmAmount) ?? 0;
  const baseAccrualTokenSymbol = isK2Lock
    ? getTokenSymbol('k2')
    : getTokenSymbol('kvcm');

  const analytics = useFormo();

  const handleOnClaim = async () => {
    try {
      setIsClaiming(true);
      const result = await onClaim();
      if (result.hash) {
        analytics.track('claim_lock_rewards', {
          hash: result.hash,
          maturityId: lock.maturityId,
          unlockedAmount: lock.unlockableLockedAmount,
          kvcmAmount,
          k2Amount,
          tokenSymbol,
        });
        setClaimMaturedLockRewardsDialog({
          open: false,
          lock: null,
        });
        setAlert({
          title: 'Success',
          description: 'Rewards claimed successfully',
          type: 'success',
        });
      }
    } catch (error) {
      console.error('Error claiming token:', error);
      setAlert({
        title: 'Error',
        description: 'An error occurred while claiming the rewards',
        type: 'error',
      });
    } finally {
      setIsClaiming(false);
    }
  };
  return (
    <Card
      className="rounded-lg px-6 py-4 overflow-y-auto w-[42rem]"
      skeletonClassName="h-[32rem]"
    >
      {isNonNullish(lock) && (
        <>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <span className="text-size-20 font-semibold text-text-1">
                Claim lock [t369]
              </span>
              <span className="text-size-16 font-[300] text-text-1">
                Unlocked on {formatTimestamp(lock.lockedUntil * 1000, 'short')}
              </span>
            </div>
            {isNonNullish(kvcmAmount) && isNonNullish(k2Amount) ? (
              <>
                <div className="flex flex-col gap-3 border-border-default border-1 rounded-2xl p-3">
                  <div className="flex flex-row justify-between">
                    <span>Tokens locked [t370]</span>
                    <span>
                      {formatAmountWithCommas(
                        lock.unlockableLockedAmount,
                        'auto'
                      )}{' '}
                      {getTokenSymbol(lock.token)}
                    </span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span>Incentives [t371]</span>
                    <span>
                      + {formatAmountWithCommas(baseAccrual, 'auto')}{' '}
                      {baseAccrualTokenSymbol}
                    </span>
                  </div>
                  <div className="flex flex-row justify-between font-bold">
                    <span>Total [t372]</span>
                    <span>
                      {formatAmountWithCommas(
                        lock.unlockableLockedAmount + baseAccrual,
                        'auto'
                      )}{' '}
                      {tokenSymbol}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 border-border-default border-1 rounded-2xl p-3">
                  <div className="flex flex-row justify-between">
                    {isK2Lock ? (
                      <>
                        <span>Protocol distribution (kVCM) [t373]</span>
                        <span className="font-bold">
                          + {formatAmountWithCommas(kvcmAmount, 'auto')} KVCM
                        </span>
                      </>
                    ) : (
                      <>
                        <span>K2 incentives [t374]</span>
                        <span className="font-bold">
                          + {formatAmountWithCommas(k2Amount, 'auto')} K2
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <Skeleton className="h-[10rem]" />
            )}
            <ButtonGroup className="flex-row">
              <Button
                colors="primary"
                context="flow"
                className="border-border-strong"
                onClick={() =>
                  setClaimMaturedLockRewardsDialog({
                    open: false,
                    lock: null,
                  })
                }
              >
                Cancel [t375]
              </Button>
              <Button
                colors="secondary"
                context="flow"
                type="submit"
                disabled={isLoading || isClaiming}
                onClick={handleOnClaim}
              >
                {isClaiming ? 'Claiming...' : 'Claim All [t376]'}
              </Button>
            </ButtonGroup>
          </div>
        </>
      )}
    </Card>
  );
};

export default ClaimMaturedLogRewardsForm;
