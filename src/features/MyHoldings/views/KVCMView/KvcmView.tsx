'use client';

import { useAllocationData } from '@/features/Allocate/hooks/useAllocationData';
import {
  StatusCard,
  StatusCardTitle,
} from '@/features/MyHoldings/cards/StatusCards/StatusCards';
import {
  VariableRewardsCard,
  VariableRewardsHeader,
  VariableRewardsItem,
  VariableRewardsItemContent,
  VariableRewardsItemTitle,
} from '@/features/MyHoldings/cards/VariableRewardsCard/VariableRewardsCard';
import { InfoCard } from '@/features/MyHoldings/shared/InfoCard';
import { RecentActivity } from '@/features/MyHoldings/shared/RecentActivity';
import Button from '@/shared/components/Button/Button';
import { ROUTES } from '@/shared/constants/route.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { useHasPreviouslyConnected } from '@/shared/hooks/useHasPreviouslyConnected';
import { useNextMaturity } from '@/shared/hooks/useNextMaturity';
import {
  formatAmountWithCommas,
  formatCurrentTime,
  formatPercentage,
  formatTimestamp,
} from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import Link from 'next/link';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useTokenHoldingsData } from '../../hooks/useHoldingsData';
import { claimIncentivesDialogAtom } from '../../modals/ClaimIncentives/claimIncentives.utils';
import { lockTokenDialogAtom } from '../../modals/LockToken/lockToken.utils';
import { HoldingEstimatedValue } from '../../shared/HoldingEstimatedValue';
import { HoldingTotalPosition } from '../../shared/HoldingTotalPosition';
import { TokenLots } from '../../shared/TokenLots';
import { KvcmOnboarding } from './KvcmOnboarding';

export const KvcmView = () => {
  const account = useAccount();
  const { hasPreviouslyConnected } = useHasPreviouslyConnected();
  const setLockTokenDialogState = useSetAtom(lockTokenDialogAtom);

  return (
    <>
      {!account.isConnected && !hasPreviouslyConnected ? (
        <KvcmOnboarding />
      ) : (
        <>
          <InfoCard
            title="kVCM Locks"
            buttonLabel="Lock"
            tooltipId="kvcm-locks"
            description="Lock kVCM for a fixed duration to receive variable kVCM incentives when the term ends, and variable K2 incentives at any time. Locked kVCM can also be allocated to carbon classes to influence protocol pricing."
            onButtonClick={() =>
              setLockTokenDialogState({ open: true, token: 'kvcm' })
            }
            content={<KvcmOverview />}
          />
          <KvcmVariableRewards />
          <RecentActivity />
        </>
      )}
    </>
  );
};

const KvcmOverview = () => {
  const [tokenLocksOpen, setTokenLocksOpen] = useState(false);
  const { timestamp: nextMaturityDate, daysFromNow: nextMaturityInDays } =
    useNextMaturity();
  const { data: kvcmData } = useTokenHoldingsData('kvcm');
  const { data: allocationData } = useAllocationData();

  const allocated = allocationData?.kvcm.allocated ?? 0;
  const unallocated = allocationData?.kvcm.unallocated ?? 0;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatusCard skeletonClassName="h-[13.5rem]">
          {kvcmData && (
            <>
              <StatusCardTitle badge="green">Ready to unlock</StatusCardTitle>
              <div className="space-y-1">
                <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                  {formatAmountWithCommas(kvcmData.kvcmClaimableAmount)} kVCM
                </div>
              </div>
              {kvcmData.kvcmClaimableValue > 0 && (
                <button
                  onClick={() => setTokenLocksOpen(true)}
                  className="cursor-pointer mt-3 text-size-14 text-gray-900 hover:text-gray-700 underline underline-offset-2 font-medium"
                >
                  Claim locks
                </button>
              )}
            </>
          )}
        </StatusCard>
        <StatusCard>
          {kvcmData && (
            <>
              <StatusCardTitle badge="yellow">Unlockable on</StatusCardTitle>
              <div className="space-y-1">
                <div className="text-size-18 font-bold text-gray-900">
                  {formatTimestamp(nextMaturityDate * 1000)}
                </div>
                <div className="text-size-14 text-gray-500">
                  • {nextMaturityInDays} days
                </div>
              </div>
            </>
          )}
        </StatusCard>
        <StatusCard>
          {kvcmData && (
            <>
              <StatusCardTitle badge="gray">Tokens locked</StatusCardTitle>
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
              tooltip="Amount of kVCM tokens you have locked."
            />
            <HoldingEstimatedValue
              estimatedValue={kvcmData.positionValue}
              tooltip="Estimate of the USD equivalent value of your kVCM tokens according to current market conditions."
            />
          </>
        )}
      </div>
      <TokenLots
        isOpen={tokenLocksOpen}
        onOpenChange={setTokenLocksOpen}
        token="kvcm"
      />
    </>
  );
};

const KvcmVariableRewards = () => {
  const setClaimIncentivesDialogState = useSetAtom(claimIncentivesDialogAtom);
  const { data: kvcmData } = useTokenHoldingsData('kvcm');
  const { data: protocolData } = useProtocolData();

  return (
    <VariableRewardsCard>
      {kvcmData && protocolData && (
        <>
          <VariableRewardsHeader
            title="Variable Rewards"
            timestamp={`As of ${formatCurrentTime()}`}
            description="K2 incentives received from your time-locked kVCM tokens. These incentives depend on protocol parameters, are variable, non-guaranteed, and may be zero."
          />
          <VariableRewardsItem>
            <VariableRewardsItemTitle
              title="Incentives (K2)"
              aprValue={formatPercentage(
                protocolData.midnightInfos.k2ApyForKVCM ?? 0
              )}
              aprTooltip="The annual percentage rate of the variable rewards. This is an estimate, is not guaranteed, can change, and may be zero."
            />
            <VariableRewardsItemContent>
              <div className="flex flex-1 flex-col">
                <span className="text-gray-900 font-medium">
                  {formatAmountWithCommas(kvcmData.k2ClaimableAmount)} K2
                </span>
                <span className="text-size-12 text-gray-500">
                  Accrued to date:{' '}
                  {formatAmountWithCommas(
                    kvcmData.k2AccruingClaimableAmount
                  )}{' '}
                </span>
              </div>
              <Button
                onClick={() =>
                  setClaimIncentivesDialogState({
                    open: true,
                    claimableK2: kvcmData.k2ClaimableAmount,
                    accruedK2: kvcmData.k2AccruedClaimableAmount,
                    accruingK2: kvcmData.k2AccruingClaimableAmount,
                    claimableK2Usd: kvcmData.k2ClaimableValue,
                  })
                }
                colors="positive"
                className="text-size-12"
              >
                Claim Incentives
              </Button>
            </VariableRewardsItemContent>
          </VariableRewardsItem>
        </>
      )}
    </VariableRewardsCard>
  );
};
