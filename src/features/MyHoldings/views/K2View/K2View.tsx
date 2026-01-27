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
import { useHasPreviouslyConnected } from '@/shared/hooks/useHasPreviouslyConnected';
import {
  formatAmountWithCommas,
  formatCurrentTime,
  formatPercentage,
} from '@/shared/utils/string.utils';
import { useSetAtom } from 'jotai';
import { useAccount } from 'wagmi';
import { useTokenHoldingsData } from '../../hooks/useHoldingsData';
import { claimTokenDialogAtom } from '../../modals/ClaimToken/claimToken.utils';
import { depositK2TokenDialogAtom } from '../../modals/DepositK2Token/depositK2Token.utils';
import { HoldingEstimatedValue } from '../../shared/HoldingEstimatedValue';
import { HoldingTotalPosition } from '../../shared/HoldingTotalPosition';
import { K2Onboarding } from './K2Onboarding';

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
            buttonLabel="Deposit"
            onButtonClick={() => setDepositK2TokenDialog({ open: true })}
            description="Lock K2 to become eligible for variable K2 incentives and a share of kVCM incentives. After 24 hours, you can request an unlock. Your locked tokens become claimable at the daily cutoff. You can also allocate locked K2 tokens to carbon classes."
            content={<K2Overview />}
          />
          <K2VariableRewards />
          <RecentActivity />
        </>
      )}
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
              </div>
              {k2Data.k2ClaimableValue > 0 && (
                <button
                  onClick={() =>
                    setClaimTokenDialog({
                      open: true,
                      amount: k2Data.k2ClaimableAmount,
                      token: 'k2',
                      lockId: null,
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
              </div>
            </>
          )}
        </StatusCard>
        <StatusCard>
          {k2Data && (
            <>
              <StatusCardTitle badge="gray">Tokens locked</StatusCardTitle>
              <div className="space-y-1">
                <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                  {formatAmountWithCommas(k2Data.lockedAmount)} K2
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
              tooltip="Sum of Claimable + Pending + Tokens Locked."
            />
            <HoldingEstimatedValue
              estimatedValue={k2Data.positionValue}
              tooltip="Estimate of the USD equivalent value of your K2 tokens plus incentives according to current market conditions."
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
            description="K2 incentives received from your locked K2 tokens. These incentives depend on protocol parameters, are variable, non-guaranteed, and may be zero."
          />
          <VariableRewardsItem>
            <VariableRewardsItemTitle
              title="Incentives (K2)"
              aprValue={formatPercentage(
                protocolData.midnightInfos.k2ApyForK2 ?? 0
              )}
              aprTooltip="The annual percentage rate of the variable rewards. This is an estimate, is not guaranteed, can change, and may be zero."
            />
            <VariableRewardsItemContent>
              <div className="flex flex-1 flex-col">
                <span className="text-gray-900 font-medium">
                  {formatAmountWithCommas(k2Data.k2ClaimableAmount)} K2
                </span>
                <span className="text-size-12 text-gray-500">
                  Accrued to date:{' '}
                  {formatAmountWithCommas(k2Data.k2AccruedClaimableAmount)} K2
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
                  {formatAmountWithCommas(k2Data.kvcmClaimableAmount)} kVCM
                </span>
                <span className="text-size-12 text-gray-500">
                  Accrued to date:{' '}
                  {formatAmountWithCommas(
                    k2Data.kvcmAccruedClaimableAmount
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
