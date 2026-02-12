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
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { isNonNullish } from 'remeda';
import { ExecuteWithValidationResult } from '../../hooks/useTransactionWithValidation';
import { claimMaturedLockRewardsDialogAtom } from './claimKvcmLockRewards.utils';

type Props = {
  isLoading: boolean;
  kvcmAmount: number | undefined;
  k2Amount: number | undefined;
  lock?: Lock;
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

  const handleOnClaim = async () => {
    try {
      setIsClaiming(true);
      const result = await onClaim();
      if (result.hash) {
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
              <span className="text-size-20 font-semibold text-gray-900">
                Claim lock
              </span>
              <span className="text-size-16 font-[300] text-gray-900">
                Matured {formatTimestamp(lock.lockedUntil * 1000, 'short')}
              </span>
            </div>
            {isNonNullish(kvcmAmount) && isNonNullish(k2Amount) ? (
              <>
                <div className="flex flex-col gap-3 border-void-20 border-1 rounded-2xl p-3">
                  <div className="flex flex-row justify-between">
                    <span>Principal</span>
                    <span>
                      {formatAmountWithCommas(lock.lockedAmount, 'auto')}{' '}
                      {getTokenSymbol(lock.token)}
                    </span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span>Base Accrual</span>
                    <span>
                      + {formatAmountWithCommas(kvcmAmount, 'auto')} KVCM
                    </span>
                  </div>
                  <div className="flex flex-row justify-between font-bold">
                    <span>Total</span>
                    <span>
                      {formatAmountWithCommas(
                        lock.lockedAmount + kvcmAmount,
                        'auto'
                      )}{' '}
                      KVCM
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 border-void-20 border-1 rounded-2xl p-3">
                  <div className="flex flex-row justify-between">
                    <span>K2 incentives</span>
                    <span className="font-bold">
                      + {formatAmountWithCommas(k2Amount, 'auto')} K2
                    </span>
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
                onClick={() =>
                  setClaimMaturedLockRewardsDialog({
                    open: false,
                    lock: null,
                  })
                }
              >
                Cancel
              </Button>
              <Button
                colors="secondary"
                context="flow"
                type="submit"
                disabled={isLoading || isClaiming}
                onClick={handleOnClaim}
              >
                {isClaiming ? 'Claiming...' : 'Claim All'}
              </Button>
            </ButtonGroup>
          </div>
        </>
      )}
    </Card>
  );
};

export default ClaimMaturedLogRewardsForm;
