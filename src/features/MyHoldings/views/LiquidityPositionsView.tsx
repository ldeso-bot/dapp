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
import { TokenLots } from '@/features/MyHoldings/shared/TokenLots';
import Button from '@/shared/components/Button/Button';
import { formatDurationFromTimestamp } from '@/shared/utils/date.utils';
import {
  formatCurrentTime,
  formatPriceUSDWithCommas,
} from '@/shared/utils/string.utils';
import { getTokenIcon, getTokenSymbol } from '@/shared/utils/token.utils';
import { useState } from 'react';
import { HoldingEstimatedValue } from '../shared/HoldingEstimatedValue';

export const LiquidityPositionsView = () => {
  const [tokenLotsOpen, setTokenLotsOpen] = useState(false);

  // @todo - replace with actual data
  const mockData = {
    positions: [
      {
        concentratedPool: true,
        estimatedValue: 1267.89,
        tokenSymbol: getTokenSymbol('kvcm-usdc'),
        matured: {
          lots: 2,
          amount: '540.0',
        },
        maturing: {
          amount: '240.0',
          unlockDateTimestamp: 1771933560,
        },
        dex: {
          amount: '420.0',
        },
        rewards: {
          incentives: {
            tokenSymbol: getTokenSymbol('k2'),
            accrualTokenSymbol: getTokenSymbol('k2'),
            amount: '14.82',
            apr: '17.97%',
            amountUSD: '44.52',
            accruedToDate: '12.34',
            accruing: '2.50',
          },
          protocolDistribution: {
            tokenSymbol: getTokenSymbol('kvcm'),
            accrualTokenSymbol: getTokenSymbol('k2'),
            amount: '9.37',
            amountUSD: '11.24',
            accruedToDate: '7.67',
            accruing: '2.50',
          },
        },
      },
      {
        concentratedPool: false,
        estimatedValue: 14.7,
        tokenSymbol: getTokenSymbol('kvcm-k2'),
        matured: {
          lots: 0,
          amount: '0.00',
        },
        maturing: {
          amount: '0.00',
        },
        dex: {
          amount: '14.70',
        },
        rewards: {
          incentives: {
            tokenSymbol: getTokenSymbol('k2'),
            accrualTokenSymbol: getTokenSymbol('k2'),
            amount: '14.82',
            amountUSD: '44.52',
            accruedToDate: '12.34',
            accruing: '2.50',
          },
          protocolDistribution: {
            tokenSymbol: getTokenSymbol('kvcm'),
            accrualTokenSymbol: getTokenSymbol('k2'),
            amount: '0.00',
            amountUSD: '0.00',
            accruedToDate: '0.00',
            accruing: '0.00',
          },
        },
      },
    ],
  };

  return (
    <div className="flex flex-col gap-4">
      <InfoCard
        title="Liquidity Positions"
        tooltipId="liquidity-positions"
        description="Deposit liquidity to earn trading fees. Stake your LP in Klima for a fixed term to earn an additional share of kVCM yield, plus K2 incentives. Unstake when your term ends."
        content={
          <div className="flex flex-col gap-4">
            {mockData.positions.map((position, index) => (
              <div
                key={`${position.tokenSymbol}-${index}`}
                className="flex flex-col gap-4 border border-gray-200 bg-gray-50 shadow-sm rounded-lg p-6 pb-8 pt-4"
              >
                <div className="flex justify-between items-center gap-2 my-2">
                  <div className="flex items-center gap-2">
                    {getTokenIcon('kvcm-usdc', 2.8)}
                    <h4 className="text-size-16 font-medium text-gray-900">
                      {position.tokenSymbol}
                    </h4>
                  </div>
                  <Button>Deposit</Button>
                </div>
                <div className="bg-white rounded-lg p-6 pb-0 shadow-sm border border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <StatusCard>
                      <StatusCardTitle
                        badge="green"
                        tooltip="LP lots that reached maturity and can be unstaked. Rewards are claimable."
                      >
                        Matured
                      </StatusCardTitle>
                      <div className="space-y-1">
                        <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                          {formatPriceUSDWithCommas(Number(540.0))}
                        </div>
                        <div className="text-size-14 text-gray-500 tabular-nums">
                          {position.matured.lots > 0 ? (
                            <>
                              {position.tokenSymbol} • {position.matured.lots}{' '}
                              lots
                            </>
                          ) : (
                            'No matured lots'
                          )}
                        </div>
                      </div>
                      {Number(position.matured.lots) > 0 && (
                        <button
                          onClick={() => setTokenLotsOpen(true)}
                          className="cursor-pointer mt-6 text-size-14 text-gray-900 hover:text-gray-700 underline underline-offset-2 font-medium"
                        >
                          Claim/unstake lots
                        </button>
                      )}
                    </StatusCard>
                    <StatusCard>
                      <StatusCardTitle
                        badge="yellow"
                        tooltip="LP lots that are still locked and accruing rewards. Cannot be unstaked until maturity."
                      >
                        Maturing
                      </StatusCardTitle>
                      <div className="space-y-1">
                        <div className="text-size-18 font-bold text-gray-900">
                          {formatPriceUSDWithCommas(
                            Number(position.maturing.amount)
                          )}
                        </div>
                        {position.maturing.unlockDateTimestamp && (
                          <div className="text-size-14 text-gray-500">
                            {position.tokenSymbol} • next unlock in{' '}
                            {formatDurationFromTimestamp(
                              position.maturing.unlockDateTimestamp
                            )}
                          </div>
                        )}
                      </div>
                    </StatusCard>
                    <StatusCard>
                      <StatusCardTitle
                        badge="blue"
                        tooltip="LP tokens deposited on the DEX but not staked in Klima. Not earning protocol rewards."
                      >
                        On Dex
                      </StatusCardTitle>
                      <div className="space-y-1">
                        <div className="text-size-18 font-bold text-gray-900 tabular-nums">
                          {formatPriceUSDWithCommas(
                            Number(position.dex.amount)
                          )}
                        </div>
                        <div className="text-size-14 text-gray-500 tabular-nums">
                          {position.tokenSymbol}
                        </div>
                      </div>
                      <Button className="mt-3 h-[3.8rem]">
                        Stake in Klima
                      </Button>
                    </StatusCard>
                  </div>
                  <div className="flex flex-col gap-2 my-4 mx-auto max-w-[60%]">
                    <HoldingEstimatedValue
                      estimatedValue={Number(position.estimatedValue)}
                      tooltip="Total value of your LP position including estimated accrued rewards."
                    />
                  </div>
                  {Number(position.matured.lots) > 0 && (
                    <TokenLots
                      isOpen={tokenLotsOpen}
                      onOpenChange={setTokenLotsOpen}
                    />
                  )}
                </div>
                <VariableRewardsCard>
                  <VariableRewardsHeader
                    title="Variable Rewards"
                    timestamp={formatCurrentTime()}
                    description="Incentives (K2) earned by your time-locked kVCM. K2 amounts are variable and may change, including to 0. Claim anytime; doesn’t change Base Accrual or your lock terms."
                  />
                  {position?.rewards?.incentives && (
                    <VariableRewardsItem>
                      <VariableRewardsItemTitle
                        title="Incentives (K2)"
                        tooltip="Programmatic K2 incentives. Accrues per lot and unlocks at maturity."
                        aprValue={position?.rewards?.incentives?.apr ?? null}
                        aprTooltip="The annual percentage rate of the variable rewards."
                      />
                      <VariableRewardsItemContent>
                        <div className="flex flex-1 flex-col">
                          <span className="text-gray-900 font-medium">
                            {position?.rewards?.incentives?.amount}{' '}
                            {position?.rewards?.incentives?.tokenSymbol}
                          </span>
                          <span className="text-size-12 text-gray-500">
                            {formatPriceUSDWithCommas(
                              Number(position?.rewards?.incentives?.amountUSD)
                            )}
                          </span>
                          <span className="text-size-12 text-gray-500">
                            Accrued to date:{' '}
                            {position?.rewards?.incentives?.accruedToDate}{' '}
                            {position?.rewards?.incentives?.accrualTokenSymbol}{' '}
                            • Accruing:{' '}
                            {position?.rewards?.incentives?.accruing}{' '}
                            {position?.rewards?.incentives?.accrualTokenSymbol}
                          </span>
                        </div>
                      </VariableRewardsItemContent>
                    </VariableRewardsItem>
                  )}

                  {position?.rewards?.protocolDistribution && (
                    <VariableRewardsItem>
                      <VariableRewardsItemTitle
                        title="Protocol Distribution (kVCM)"
                        tooltip="kVCM risk-premium routed by protocol parameters. Accrues per lot and unlocks at maturity."
                      />
                      <VariableRewardsItemContent>
                        <div className="flex flex-1 flex-col">
                          <span className="text-gray-900 font-medium">
                            {position?.rewards?.protocolDistribution?.amount}{' '}
                            {
                              position?.rewards?.protocolDistribution
                                ?.tokenSymbol
                            }
                          </span>
                          <span className="text-size-12 text-gray-500">
                            {formatPriceUSDWithCommas(
                              Number(
                                position?.rewards?.protocolDistribution
                                  ?.amountUSD
                              ) || 0.0
                            )}
                          </span>
                          <span className="text-size-12 text-gray-500">
                            Accrued to date:{' '}
                            {
                              position?.rewards?.protocolDistribution
                                ?.accruedToDate
                            }{' '}
                            {
                              position?.rewards?.protocolDistribution
                                ?.accrualTokenSymbol
                            }{' '}
                            • Accruing:{' '}
                            {position?.rewards?.protocolDistribution?.accruing}{' '}
                            {
                              position?.rewards?.protocolDistribution
                                ?.accrualTokenSymbol
                            }
                          </span>
                        </div>
                      </VariableRewardsItemContent>
                    </VariableRewardsItem>
                  )}
                </VariableRewardsCard>
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
};
