'use client';

import { useAllocationData } from '@/features/Allocate/hooks/useAllocationData';
import {
  StatusCard,
  StatusCardTitle,
} from '@/features/MyActivities/cards/StatusCards/StatusCards';
import {
  VariableRewardsCard,
  VariableRewardsHeader,
  VariableRewardsItem,
  VariableRewardsItemContent,
  VariableRewardsItemTitle,
} from '@/features/MyActivities/cards/VariableRewardsCard/VariableRewardsCard';
import { useTokenHoldingsData } from '@/features/MyActivities/hooks/useHoldingsData';
import { claimMaturedLockRewardsDialogAtom } from '@/features/MyActivities/modals/ClaimMaturedLockRewards/claimKvcmLockRewards.utils';
import { depositK2TokenDialogAtom } from '@/features/MyActivities/modals/DepositK2Token/depositK2Token.utils';
import { HoldingEstimatedValue } from '@/features/MyActivities/shared/HoldingEstimatedValue';
import { HoldingTotalPosition } from '@/features/MyActivities/shared/HoldingTotalPosition';
import { InfoCard } from '@/features/MyActivities/shared/InfoCard';
import { K2Onboarding } from '@/features/MyActivities/views/K2View/K2Onboarding';
import Button from '@/shared/components/Button/Button';
import Icon from '@/shared/components/Icon/Icon';
import { ROUTES } from '@/shared/constants/route.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { useHasPreviouslyConnected } from '@/shared/hooks/useHasPreviouslyConnected';
import Plus from '@/shared/images/plus.svg';
import {
  formatAmountWithCommas,
  formatCurrentTime,
  formatPercentage,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { unlockK2TokenDialogAtom } from '../../modals/UnlockK2Token/unlockK2Token.utils';

export const K2View = () => {
  const account = useAccount();
  const { hasPreviouslyConnected } = useHasPreviouslyConnected();
  const setDepositK2TokenDialog = useSetAtom(depositK2TokenDialogAtom);
  return (
    <>
      {!account.isConnected && !hasPreviouslyConnected ? (
        <K2Onboarding />
      ) : (
        <>
          <InfoCard
            title="K2 Activities"
            tooltipId="k2-position"
            buttonLabel={
              <>
                <Icon icon={Plus} size={1.6} /> Deposit
              </>
            }
            onButtonClick={() => setDepositK2TokenDialog({ open: true })}
            description="Lock K2 to become eligible for variable K2 incentives and a share of kVCM incentives. After 24 hours, you can request an unlock. Your locked tokens become claimable at the daily cutoff. You can also allocate locked K2 tokens to carbon classes."
            content={<K2Overview />}
          />
          <K2VariableRewards />
        </>
      )}
    </>
  );
};

const K2Overview = () => {
  const { data: k2Data } = useTokenHoldingsData('k2');
  const { data: protocolData } = useProtocolData();
  const { data: allocationData } = useAllocationData();
  const allocated = allocationData?.k2.allocated ?? 0;
  const unallocated = allocationData?.k2.unallocated ?? 0;

  // Todo: change this
  const setClaimK2RewardsDialog = useSetAtom(claimMaturedLockRewardsDialogAtom);
  const setUnlockK2TokenDialogAtom = useSetAtom(unlockK2TokenDialogAtom);
  const lock = k2Data?.locks.find((lock) => lock.token === 'k2') ?? null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatusCard skeletonClassName="h-[13.5rem]">
          {k2Data && protocolData?.midnightInfos && (
            <div className="flex flex-col justify-between h-full">
              <div>
                <StatusCardTitle badge="green">Claimable</StatusCardTitle>
                <div className="space-y-1">
                  <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                    {formatAmountWithCommas(
                      k2Data?.claimableRewardsPlusPrincipalAmount
                    )}{' '}
                    K2
                  </div>
                </div>
              </div>
              {lock?.isClaimable && (
                <Button
                  onClick={() =>
                    setClaimK2RewardsDialog({
                      open: true,
                      lock,
                    })
                  }
                  colors="positive"
                  className="mt-3 text-size-14"
                >
                  Claim principal (+ rewards)
                </Button>
              )}
            </div>
          )}
        </StatusCard>
        <StatusCard>
          {k2Data && (
            <>
              <StatusCardTitle badge="yellow">Pending</StatusCardTitle>
              <div className="space-y-1">
                <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                  {formatAmountWithCommas(
                    k2Data.pendingRewardsPlusPrincipalAmount
                  )}{' '}
                  K2
                </div>
              </div>
            </>
          )}
        </StatusCard>
        <StatusCard>
          {k2Data && (
            <>
              <StatusCardTitle badge="gray">Tokens locked</StatusCardTitle>
              <div className="space-y-1">
                <div className="flex flex-col items-center space-between">
                  <span className="text-size-18 font-bold text-gray-900 w-full">
                    {formatAmountWithCommas(k2Data.lockedAmount)} K2
                  </span>
                  <span className="text-size-16 text-void-80 w-full">
                    {formatPriceUSDWithCommas(k2Data.lockedValue)}
                  </span>
                  <div className="text-size-14 text-gray-500 mt-2 space-y-0.5 w-full">
                    <div>
                      <Link
                        href={ROUTES.ALLOCATE}
                        className="underline text-gray-900 hover:text-gray-700"
                      >
                        Allocated to carbon classes:
                      </Link>{' '}
                      {formatAmountWithCommas(allocated)} K2
                    </div>
                    <div>
                      Unallocated: {formatAmountWithCommas(unallocated)} K2
                    </div>
                  </div>
                </div>
                {lock?.canRequestUnlock && (
                  <Button
                    onClick={() =>
                      setUnlockK2TokenDialogAtom({ open: true, lock: lock })
                    }
                    className="w-full"
                  >
                    Request unlock
                  </Button>
                )}
              </div>
            </>
          )}
        </StatusCard>
      </div>

      <div className="flex flex-col gap-2 my-4 mx-auto max-w-[60%]">
        {k2Data && (
          <>
            <HoldingTotalPosition
              symbol="K2"
              totalPosition={k2Data.positionAmount}
            />
            <HoldingEstimatedValue estimatedValue={k2Data.positionValue} />
          </>
        )}
      </div>
    </>
  );
};

const K2VariableRewards = () => {
  const { data: k2Data } = useTokenHoldingsData('k2');
  const { data: protocolData } = useProtocolData();

  return (
    <VariableRewardsCard>
      {k2Data && protocolData && (
        <>
          <VariableRewardsHeader
            title="Variable Rewards"
            timestamp={`As of ${formatCurrentTime()}`}
            description="K2 incentives received from your locked K2 tokens. These incentives depend on protocol parameters, are variable, non-guaranteed, and may be zero."
          />
          <VariableRewardsItem>
            <VariableRewardsItemTitle
              title="Incentives (K2)"
              aprValue={formatPercentage(
                protocolData.midnightInfos.k2ApyForK2 ?? 0
              )}
              aprTooltip="Percent represents current incentive rate. This is an estimate, is not guaranteed, can change, and may be zero."
            />
            <VariableRewardsItemContent>
              <div className="flex flex-1 flex-col">
                <span className="text-gray-900 font-medium">
                  {formatAmountWithCommas(k2Data.k2ClaimableAmount, 'auto')} K2
                </span>
                <span className="text-size-12 text-gray-500">
                  Accrued to date:{' '}
                  {formatAmountWithCommas(
                    k2Data.k2AccruedClaimableAmount,
                    'auto'
                  )}{' '}
                  K2
                </span>
              </div>
            </VariableRewardsItemContent>
          </VariableRewardsItem>
          <VariableRewardsItem>
            <VariableRewardsItemTitle
              title="Protocol Distribution (kVCM)"
              tooltip="kVCM incentives received by your locked K2 tokens. These incentives depend on protocol parameters, are variable, non-guaranteed, and may be zero."
            />
            <VariableRewardsItemContent>
              <div className="flex flex-1 flex-col">
                <span className="text-gray-900 font-medium">
                  {formatAmountWithCommas(k2Data.kvcmClaimableAmount, 'auto')}{' '}
                  kVCM
                </span>
                <span className="text-size-12 text-gray-500">
                  Accrued to date:{' '}
                  {formatAmountWithCommas(
                    k2Data.kvcmAccruedClaimableAmount,
                    'auto'
                  )}{' '}
                </span>
              </div>
            </VariableRewardsItemContent>
          </VariableRewardsItem>
        </>
      )}
    </VariableRewardsCard>
  );
};
