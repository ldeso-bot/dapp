'use client';

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
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { useNextMaturity } from '@/shared/hooks/useNextMaturity';
import {
  formatAmountWithCommas,
  formatCurrentTime,
  formatPercentage,
  formatPriceUSDWithCommas,
  formatTimestamp,
} from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { useTokenHoldingsData } from '../hooks/useHoldingsData';
import { claimIncentivesDialogAtom } from '../modals/ClaimIncentives/claimIncentives.utils';
import { lockTokenDialogAtom } from '../modals/LockToken/lockToken.utils';
import { HoldingEstimatedValue } from '../shared/HoldingEstimatedValue';
import { HoldingTotalPosition } from '../shared/HoldingTotalPosition';
import { TokenLots } from '../shared/TokenLots';

export const KvcmView = () => {
  const setLockTokenDialogState = useSetAtom(lockTokenDialogAtom);

  return (
    <>
      <InfoCard
        title="kVCM Locks"
        buttonLabel="Lock"
        tooltipId="kvcm-locks"
        description="Lock kVCM for a fixed term to earn Base Accrual (accrues daily; pays at maturity — no early unlock). Incentives (K2) accrue on locked kVCM and are claimable anytime."
        onButtonClick={() =>
          setLockTokenDialogState({ open: true, token: 'kvcm' })
        }
        content={<KvcmOverview />}
      />
      <KvcmVariableRewards />
      <RecentActivity />
    </>
  );
};

const KvcmOverview = () => {
  const [tokenLocksOpen, setTokenLocksOpen] = useState(false);
  const { timestamp: nextMaturityDate, daysFromNow: nextMaturityInDays } =
    useNextMaturity();
  const { data: kvcmData } = useTokenHoldingsData('kvcm');
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatusCard skeletonClassName="h-[13.5rem]">
          {kvcmData && (
            <>
              <StatusCardTitle badge="green">Matured</StatusCardTitle>
              <div className="space-y-1">
                <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                  {formatAmountWithCommas(Number(kvcmData.kvcmClaimableAmount))}{' '}
                  kVCM
                </div>
                <div className="text-size-14 text-gray-500 tabular-nums">
                  {formatPriceUSDWithCommas(
                    Number(kvcmData.kvcmClaimableValue)
                  )}
                </div>
              </div>
              {Number(kvcmData.kvcmClaimableValue) > 0 && (
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
              <StatusCardTitle badge="yellow">Next Maturity</StatusCardTitle>
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
              <StatusCardTitle badge="gray">Principal Locked</StatusCardTitle>
              <div className="space-y-1">
                <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                  {formatAmountWithCommas(Number(kvcmData.lockedAmount))} kVCM
                </div>
                <div className="text-size-14 text-gray-500 tabular-nums">
                  {formatPriceUSDWithCommas(Number(kvcmData.lockedValue))}
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
              totalPosition={Number(kvcmData.positionAmount)}
              tooltip="Total kVCM principal currently locked across all positions."
            />
            <HoldingEstimatedValue
              estimatedValue={Number(kvcmData.positionValue)}
              tooltip="Total value of your kVCM position including estimated accrued base accrual."
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
            description="Incentives (K2) earned by your time-locked kVCM. K2 amounts are variable and may change, including to 0. Claim anytime; doesn't change Base Accrual or your lock terms."
          />
          <VariableRewardsItem>
            <VariableRewardsItemTitle
              title="Incentives (K2)"
              tooltip="Incentives (K2) earned by your time-locked kVCM. K2 amounts are variable and may change, including to 0. Claim anytime; doesn't change Base Accrual or your lock terms."
              aprValue={formatPercentage(
                protocolData.midnightInfos.k2ApyForKVCM ?? 0
              )}
              aprTooltip="The annual percentage rate of the variable rewards."
            />
            <VariableRewardsItemContent>
              <div className="flex flex-1 flex-col">
                <span className="text-gray-900 font-medium">
                  {formatAmountWithCommas(Number(kvcmData.k2ClaimableAmount))}{' '}
                  K2
                </span>
                <span className="text-size-12 text-gray-500">
                  {formatPriceUSDWithCommas(Number(kvcmData.k2ClaimableValue))}
                </span>
                <span className="text-size-12 text-gray-500">
                  Accrued to date:{' '}
                  {formatAmountWithCommas(
                    Number(kvcmData.k2AccruingClaimableAmount)
                  )}{' '}
                  K2 • Accruing:{' '}
                  {formatAmountWithCommas(
                    Number(kvcmData.k2AccruedClaimableAmount)
                  )}{' '}
                  K2
                </span>
              </div>
              <Button
                onClick={() =>
                  setClaimIncentivesDialogState({
                    open: true,
                    claimablePrincipal: Number(kvcmData.kvcmClaimableAmount),
                    totalAccruedRewards: Number(kvcmData.claimableValue),
                  })
                }
                colors="positive"
                className="text-size-12"
              >
                Claim Incentives
              </Button>
            </VariableRewardsItemContent>
          </VariableRewardsItem>
          <div className="text-size-12 text-gray-500 mt-3">
            Variable rewards come from protocol schedules; allocations may
            change or be 0.
          </div>
        </>
      )}
    </VariableRewardsCard>
  );
};
