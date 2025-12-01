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
import { TokenLocks } from '@/features/MyHoldings/shared/TokenLocks';
import {
  formatAmountWithCommas,
  formatCurrentTime,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';
import { useState } from 'react';
import { HoldingEstimatedValue } from '../shared/HoldingEstimatedValue';
import { HoldingTotalPosition } from '../shared/HoldingTotalPosition';

export const K2View = () => {
  const [tokenLocksOpen, setTokenLocksOpen] = useState(false);

  // @todo - replace with actual data
  const mockData = {
    summary: {
      claimableMaturedToken: '58.01',
      claimableMaturedFiat: '174.03',
      nextMaturityDate: '2025-12-31',
      nextMaturityInDays: 30,
      totalPrincipalToken: '248.32',
      totalPrincipalFiat: '781.23',
    },
  };

  // @todo - replace with actual data
  const totalLocks = 0;

  return (
    <>
      <InfoCard
        title="K2 Position"
        tooltipId="k2-position"
        buttonLabel="Deposit"
        onButtonClick={() => {}}
        description="Lock K2 to earn variable K2 incentives and a share of kVCM yield. After 24h you can request an unlock; principal becomes claimable at the daily cutoff. You can also allocate in-position K2 to carbon classes."
        content={
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <StatusCard>
                <StatusCardTitle badge="green">Claimable</StatusCardTitle>
                <div className="space-y-1">
                  <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                    {formatAmountWithCommas(
                      Number(mockData.summary.claimableMaturedToken)
                    )}{' '}
                    K2
                  </div>
                  <div className="text-size-14 text-gray-500 tabular-nums">
                    {formatPriceUSDWithCommas(
                      Number(mockData.summary.claimableMaturedFiat)
                    )}
                  </div>
                </div>
                {Number(mockData.summary.claimableMaturedToken) > 0 &&
                  totalLocks > 0 && (
                    <button
                      onClick={() => setTokenLocksOpen(true)}
                      className="cursor-pointer mt-3 text-size-14 text-gray-900 hover:text-gray-700 underline underline-offset-2 font-medium"
                    >
                      Claim locks
                    </button>
                  )}
              </StatusCard>
              <StatusCard>
                <StatusCardTitle badge="yellow">Pending</StatusCardTitle>
                <div className="space-y-1">
                  <div className="text-size-18 font-bold text-gray-900">
                    {formatAmountWithCommas(
                      Number(mockData.summary.claimableMaturedToken)
                    )}{' '}
                    K2
                  </div>
                  <div className="text-size-14 text-gray-500">
                    {formatPriceUSDWithCommas(
                      Number(mockData.summary.claimableMaturedFiat)
                    )}{' '}
                    K2
                  </div>
                </div>
              </StatusCard>
              <StatusCard>
                <StatusCardTitle badge="gray">In Position</StatusCardTitle>
                <div className="space-y-1">
                  <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                    {formatAmountWithCommas(
                      Number(mockData.summary.totalPrincipalToken)
                    )}{' '}
                    K2
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
                symbol="K2"
                totalPosition={Number(mockData.summary.totalPrincipalToken)}
                tooltip="Total principal (units): sum of Claimable + Pending + In position (principal only)."
              />
              <HoldingEstimatedValue
                estimatedValue={Number(mockData.summary.totalPrincipalFiat)}
                tooltip="Total value (fiat, incl. accrued est.): principal + accrued rewards converted at the current reference price (estimate)."
              />
            </div>
            {totalLocks > 0 && (
              <TokenLocks
                isOpen={tokenLocksOpen}
                onOpenChange={setTokenLocksOpen}
              />
            )}
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
            aprValue="17.97%"
            aprTooltip="The annual percentage rate of the variable rewards."
          />
          <VariableRewardsItemContent>
            <div className="flex flex-1 flex-col">
              <span className="text-gray-900 font-medium">14.82 K2</span>
              <span className="text-size-12 text-gray-500">$44.52</span>
              <span className="text-size-12 text-gray-500">
                Accrued to date: 12.34 K2 • Accruing: 2.50 K2
              </span>
            </div>
          </VariableRewardsItemContent>
        </VariableRewardsItem>
        <VariableRewardsItem>
          <VariableRewardsItemTitle
            title="Protocol Distribution (kVCM)"
            tooltip="Incentives (K2) earned by your time-locked kVCM. K2 amounts are variable and may change, including to 0. Claim anytime; doesn’t change Base Accrual or your lock terms."
          />
          <VariableRewardsItemContent>
            <div className="flex flex-1 flex-col">
              <span className="text-gray-900 font-medium">0.00 K2</span>
              <span className="text-size-12 text-gray-500">$0.00</span>
              <span className="text-size-12 text-gray-500">
                Accrued to date: 0.00 K2 • Accruing: 0.00 K2
              </span>
            </div>
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
