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
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import {
  formatAmountWithCommas,
  formatCurrentTime,
  formatPercentage,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import { useTokenHoldingsData } from '../../hooks/useHoldingsData';
import { claimTokenDialogAtom } from '../../modals/ClaimToken/claimToken.utils';
import { topupLockDialogAtom } from '../../modals/TopupLock/topupLock.utils';
import { HoldingEstimatedValue } from '../../shared/HoldingEstimatedValue';
import { HoldingTotalPosition } from '../../shared/HoldingTotalPosition';

export const K2View = () => {
  const setTopupLockDialog = useSetAtom(topupLockDialogAtom);
  const { data: k2Data } = useTokenHoldingsData('k2');
  const { data: protocolData } = useProtocolData();
  return (
    <>
      <InfoCard
        title="K2 Position"
        tooltipId="k2-position"
        buttonLabel="Deposit"
        onButtonClick={() =>
          k2Data &&
          protocolData?.midnightInfos &&
          setTopupLockDialog({
            open: true,
            token: 'k2',
            currentLockAmount: k2Data.lockedAmount ?? 0,
            totalAccruingRewards: k2Data.k2AccruingClaimableAmount ?? 0,
            tokenSymbol: 'K2',
            baseApy: protocolData.midnightInfos.k2ApyForK2 ?? 0,
            maturityDate: k2Data.locks[0].lockedUntil ?? 0,
          })
        }
        description="Lock K2 to earn variable K2 incentives and a share of kVCM yield. After 24h you can request an unlock; principal becomes claimable at the daily cutoff. You can also allocate in-position K2 to carbon classes."
        content={<K2Overview />}
      />
      <K2VariableRewards />
      <RecentActivity />
    </>
  );
};

const K2Overview = () => {
  const { data: k2Data } = useTokenHoldingsData('k2');

  const { data: protocolData } = useProtocolData();
  const setClaimTokenDialog = useSetAtom(claimTokenDialogAtom);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatusCard skeletonClassName="h-[13.5rem]">
          {k2Data && protocolData?.midnightInfos && (
            <>
              <StatusCardTitle badge="green">Claimable</StatusCardTitle>
              <div className="space-y-1">
                <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                  {formatAmountWithCommas(k2Data.k2AccruedClaimableAmount)} K2
                </div>
                <div className="text-size-14 text-gray-500 tabular-nums">
                  {formatPriceUSDWithCommas(k2Data.k2AccruedClaimableValue)}
                </div>
              </div>
              {k2Data.k2ClaimableValue > 0 && (
                <button
                  onClick={() =>
                    setClaimTokenDialog({
                      open: true,
                      amount: k2Data.k2ClaimableAmount,
                      token: 'k2',
                    })
                  }
                  className="cursor-pointer mt-3 text-size-14 text-gray-900 hover:text-gray-700 underline underline-offset-2 font-medium"
                >
                  Claim locks
                </button>
              )}
            </>
          )}
        </StatusCard>
        <StatusCard>
          {k2Data && (
            <>
              <StatusCardTitle badge="yellow">Pending</StatusCardTitle>
              <div className="space-y-1">
                <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                  {formatAmountWithCommas(k2Data.k2AccruingClaimableAmount)} K2
                </div>
                <div className="text-size-14 text-gray-500 tabular-nums">
                  {formatPriceUSDWithCommas(k2Data.k2AccruingClaimableValue)}
                </div>
              </div>
            </>
          )}
        </StatusCard>
        <StatusCard>
          {k2Data && (
            <>
              <StatusCardTitle badge="gray">In Position</StatusCardTitle>
              <div className="space-y-1">
                <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                  {formatAmountWithCommas(k2Data.lockedAmount)} K2
                </div>
                <div className="text-size-14 text-gray-500 tabular-nums">
                  {formatPriceUSDWithCommas(k2Data.lockedValue)}
                </div>
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
              tooltip="Total principal (units): sum of Claimable + Pending + In position (principal only)."
            />
            <HoldingEstimatedValue
              estimatedValue={k2Data.positionValue}
              tooltip="Total value (fiat, incl. accrued est.): principal + accrued rewards converted at the current reference price (estimate)."
            />
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
            description="Incentives (K2) earned by your time-locked K2. K2 amounts are variable and may change, including to 0. Claim anytime; doesn't change Base Accrual or your lock terms."
          />
          <VariableRewardsItem>
            <VariableRewardsItemTitle
              title="Incentives (K2)"
              tooltip="Incentives (K2) earned by your time-locked K2. K2 amounts are variable and may change, including to 0. Claim anytime; doesn't change Base Accrual or your lock terms."
              aprValue={formatPercentage(
                protocolData.midnightInfos.k2ApyForK2 ?? 0
              )}
              aprTooltip="The annual percentage rate of the variable rewards."
            />
            <VariableRewardsItemContent>
              <div className="flex flex-1 flex-col">
                <span className="text-gray-900 font-medium">
                  {formatAmountWithCommas(k2Data.k2ClaimableAmount)} K2
                </span>
                <span className="text-size-12 text-gray-500">
                  {formatPriceUSDWithCommas(k2Data.k2ClaimableValue)}
                </span>
                <span className="text-size-12 text-gray-500">
                  Accrued to date:{' '}
                  {formatAmountWithCommas(k2Data.k2AccruedClaimableAmount)} K2 •
                  Accruing:{' '}
                  {formatAmountWithCommas(k2Data.k2AccruingClaimableAmount)} K2
                </span>
              </div>
            </VariableRewardsItemContent>
          </VariableRewardsItem>
          <VariableRewardsItem>
            <VariableRewardsItemTitle
              title="Protocol Distribution (kVCM)"
              tooltip="kVCM rewards earned by your time-locked K2. kVCM amounts are variable and may change, including to 0. Claim anytime; doesn't change Base Accrual or your lock terms."
            />
            <VariableRewardsItemContent>
              <div className="flex flex-1 flex-col">
                <span className="text-gray-900 font-medium">
                  {formatAmountWithCommas(k2Data.kvcmClaimableAmount)} kVCM
                </span>
                <span className="text-size-12 text-gray-500">
                  {formatPriceUSDWithCommas(k2Data.kvcmClaimableValue)}
                </span>
                <span className="text-size-12 text-gray-500">
                  Accrued to date:{' '}
                  {formatAmountWithCommas(k2Data.kvcmAccruedClaimableAmount)}{' '}
                  kVCM • Accruing:{' '}
                  {formatAmountWithCommas(k2Data.kvcmAccruingClaimableAmount)}{' '}
                  kVCM
                </span>
              </div>
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
