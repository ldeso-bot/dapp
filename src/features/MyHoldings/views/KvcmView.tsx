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
import {
  formatAmountWithCommas,
  formatCurrentTime,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { claimIncentivesDialogAtom } from '../modals/ClaimIncentives/claimIncentives.utils';
import { lockTokenDialogAtom } from '../modals/LockToken/lockToken.utils';
import { HoldingEstimatedValue } from '../shared/HoldingEstimatedValue';
import { HoldingTotalPosition } from '../shared/HoldingTotalPosition';
import { TokenLots } from '../shared/TokenLots';

export const KvcmView = () => {
  const [tokenLocksOpen, setTokenLocksOpen] = useState(false);
  const setLockTokenDialogState = useSetAtom(lockTokenDialogAtom);
  const setClaimIncentivesDialogState = useSetAtom(claimIncentivesDialogAtom);

  // @todo - replace with actual data
  const mockData = {
    summary: {
      claimableMaturedToken: '1030.03',
      claimableMaturedFiat: '1236.25',
      nextMaturityDate: '2025-12-31',
      nextMaturityInDays: 30,
      totalPrincipalToken: '1012.25',
      totalPrincipalFiat: '3036.75',
    },
  };

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
        content={
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <StatusCard>
                <StatusCardTitle badge="green">Matured</StatusCardTitle>
                <div className="space-y-1">
                  <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                    {formatAmountWithCommas(
                      Number(mockData.summary.claimableMaturedToken)
                    )}{' '}
                    kVCM
                  </div>
                  <div className="text-size-14 text-gray-500 tabular-nums">
                    {formatPriceUSDWithCommas(
                      Number(mockData.summary.claimableMaturedFiat)
                    )}
                  </div>
                </div>
                {Number(mockData.summary.claimableMaturedToken) > 0 && (
                  <button
                    onClick={() => setTokenLocksOpen(true)}
                    className="cursor-pointer mt-3 text-size-14 text-gray-900 hover:text-gray-700 underline underline-offset-2 font-medium"
                  >
                    Claim locks
                  </button>
                )}
              </StatusCard>
              <StatusCard>
                <StatusCardTitle badge="yellow">Next Maturity</StatusCardTitle>
                <div className="space-y-1">
                  <div className="text-size-18 font-bold text-gray-900">
                    {mockData.summary.nextMaturityDate}
                  </div>
                  <div className="text-size-14 text-gray-500">
                    • {mockData.summary.nextMaturityInDays} days
                  </div>
                </div>
              </StatusCard>
              <StatusCard>
                <StatusCardTitle badge="gray">Principal Locked</StatusCardTitle>
                <div className="space-y-1">
                  <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                    {formatAmountWithCommas(
                      Number(mockData.summary.totalPrincipalToken)
                    )}{' '}
                    kVCM
                  </div>
                  <div className="text-size-14 text-gray-500 tabular-nums">
                    {formatPriceUSDWithCommas(
                      Number(mockData.summary.totalPrincipalFiat)
                    )}
                  </div>
                </div>
              </StatusCard>
            </div>
            <div className="flex flex-col gap-2 my-4 mx-auto max-w-[60%]">
              <HoldingTotalPosition
                symbol="kVCM"
                totalPosition={Number(mockData.summary.totalPrincipalToken)}
                tooltip="Total kVCM principal currently locked across all positions."
              />
              <HoldingEstimatedValue
                estimatedValue={Number(mockData.summary.totalPrincipalFiat)}
                tooltip="Total value of your kVCM position including estimated accrued base accrual."
              />
            </div>
            <TokenLots
              isOpen={tokenLocksOpen}
              onOpenChange={setTokenLocksOpen}
            />
          </>
        }
      />
      <VariableRewardsCard>
        <VariableRewardsHeader
          title="Variable Rewards"
          timestamp={`As of ${formatCurrentTime()}`}
          description="Incentives (K2) earned by your time-locked kVCM. K2 amounts are variable and may change, including to 0. Claim anytime; doesn’t change Base Accrual or your lock terms."
        />
        <VariableRewardsItem>
          <VariableRewardsItemTitle
            title="Incentives (K2)"
            tooltip="Incentives (K2) earned by your time-locked kVCM. K2 amounts are variable and may change, including to 0. Claim anytime; doesn’t change Base Accrual or your lock terms."
            aprValue="14.25%"
            aprTooltip="The annual percentage rate of the variable rewards."
          />
          <VariableRewardsItemContent>
            <div className="flex flex-1 flex-col">
              <span className="text-gray-900 font-medium">8.50 K2</span>
              <span className="text-size-12 text-gray-500">$25.50</span>
              <span className="text-size-12 text-gray-500">
                Accrued to date: 6.75 K2 • Accruing: 1.75 K2
              </span>
            </div>
            <Button
              onClick={() =>
                setClaimIncentivesDialogState({
                  open: true,
                  claimablePrincipal: Number(
                    mockData.summary.claimableMaturedToken
                  ),
                  totalAccruedRewards: Number(
                    mockData.summary.totalPrincipalFiat
                  ),
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
          Variable rewards come from protocol schedules; allocations may change
          or be 0.
        </div>
      </VariableRewardsCard>
      <RecentActivity />
    </>
  );
};
