'use client';

import { useAllocationData } from '@/features/Allocate/hooks/useAllocationData';
import { useHasKycVerification } from '@/features/Kyc/useHasKycVerification';
import {
  StatusCard,
  StatusCardTitle,
} from '@/features/MyActivities/cards/StatusCards/StatusCards';
import { InfoCard } from '@/features/MyActivities/shared/InfoCard';
import Icon from '@/shared/components/Icon/Icon';
import { ROUTES } from '@/shared/constants/route.constants';
import { useHasPreviouslyConnected } from '@/shared/hooks/useHasPreviouslyConnected';
import Plus from '@/shared/images/plus.svg';
import {
  daysUntil,
  formatAmountWithCommas,
  formatTimestamp,
} from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { useTokenHoldingsData } from '../../hooks/useHoldingsData';
import { lockTokenDialogAtom } from '../../modals/LockToken/lockToken.utils';
import { HoldingEstimatedValue } from '../../shared/HoldingEstimatedValue';
import { HoldingTotalPosition } from '../../shared/HoldingTotalPosition';
import { TokenPositions } from '../../shared/TokenPositions';
import { KvcmOnboarding } from './KvcmOnboarding';

export const KvcmView = () => {
  const account = useAccount();
  const { hasPreviouslyConnected } = useHasPreviouslyConnected();
  const setLockTokenDialogState = useSetAtom(lockTokenDialogAtom);
  const { openKycOrProceed } = useHasKycVerification();

  return (
    <>
      {!account.isConnected && !hasPreviouslyConnected ? (
        <KvcmOnboarding />
      ) : (
        <>
          <InfoCard
            title="kVCM Locks"
            buttonLabel={
              <>
                <Icon icon={Plus} size={1.6} /> Lock
              </>
            }
            tooltipId="kvcm-locks"
            description="Lock kVCM for a fixed duration to receive variable kVCM and K2 incentives when the term ends. Locked kVCM can also be allocated to carbon classes to influence protocol pricing."
            onButtonClick={() =>
              openKycOrProceed('lock_kvcm', () =>
                setLockTokenDialogState({ open: true, token: 'kvcm' })
              )
            }
            content={<KvcmOverview />}
          />
        </>
      )}
    </>
  );
};

const KvcmOverview = () => {
  const { data: kvcmData } = useTokenHoldingsData('kvcm');
  const { data: allocationData } = useAllocationData();

  const allocated = allocationData?.kvcm.allocated ?? 0;
  const unallocated = allocationData?.kvcm.unallocated ?? 0;

  const nextActiveLock = (kvcmData?.activeLocks || []).sort(
    (a, b) => a.created - b.created
  )[0];

  const nextUnlockTimestamp = (nextActiveLock?.lockedUntil ?? 0) * 1000;
  const nextUnlockInDays = daysUntil(nextUnlockTimestamp);

  const nextUnlockLabel = nextActiveLock ? 'Next Unlock on' : 'No active locks';

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatusCard skeletonClassName="h-[13.5rem]">
          {kvcmData && (
            <>
              <StatusCardTitle badge="green">Ready to unlock</StatusCardTitle>
              <div className="space-y-1">
                <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                  {formatAmountWithCommas(
                    kvcmData.claimableRewardsPlusPrincipalAmount
                  )}{' '}
                  kVCM
                </div>
              </div>
            </>
          )}
        </StatusCard>
        <StatusCard>
          {kvcmData && (
            <>
              <StatusCardTitle badge="yellow">
                {nextUnlockLabel}
              </StatusCardTitle>
              {nextActiveLock && (
                <div className="space-y-1">
                  <div className="text-size-18 font-bold text-gray-900">
                    {formatTimestamp(
                      nextActiveLock.lockedUntil * 1000,
                      'short'
                    )}
                  </div>
                  <div className="text-size-14 text-gray-500">
                    • {nextUnlockInDays} days
                  </div>
                </div>
              )}
            </>
          )}
        </StatusCard>
        <StatusCard>
          {kvcmData && (
            <>
              <StatusCardTitle badge="gray">
                Original amount locked
              </StatusCardTitle>
              <div className="space-y-1">
                <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                  {formatAmountWithCommas(kvcmData.lockedAmount)} kVCM
                </div>
                <div className="text-size-14 text-gray-500 mt-2 space-y-0.5">
                  <div>
                    <Link
                      href={ROUTES.ALLOCATE}
                      className="underline text-gray-900 hover:text-gray-700"
                    >
                      Allocated to carbon classes:
                    </Link>{' '}
                    {formatAmountWithCommas(allocated)} kVCM
                  </div>
                  <div>
                    Unallocated: {formatAmountWithCommas(unallocated)} kVCM
                  </div>
                </div>
              </div>
            </>
          )}
        </StatusCard>
      </div>
      <div className="flex flex-col gap-2 my-4 mx-auto max-w-[60%]">
        {kvcmData && (
          <>
            <HoldingTotalPosition
              symbol="kVCM"
              totalPosition={kvcmData.positionAmount}
            />
            <HoldingEstimatedValue estimatedValue={kvcmData.positionValue} />
          </>
        )}
      </div>
      <TokenPositions
        token="kvcm"
        rewardsTooltipContent="Base accrual and K2 incentives accrue while your kVCM is locked. Both are claimable when your tokens unlock. Percent represents current incentive rate."
      />
    </>
  );
};
