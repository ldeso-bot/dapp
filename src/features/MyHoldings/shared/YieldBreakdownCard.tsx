'use client';

import {
  useIncentivesBreakdown,
  UseIncentivesBreakdownParams,
} from '@/features/MyHoldings/hooks/useIncentivesBreakdown';

export const IncentivesBreakdownCard = ({
  amount,
  duration,
  fullMaturity,
}: UseIncentivesBreakdownParams) => {
  const { baseYieldFormatted, incentivesYieldFormatted, lockDuration } =
    useIncentivesBreakdown({
      amount,
      duration,
      fullMaturity,
    });

  return (
    <>
      <label className="text-size-14 font-medium">Final Incentives Breakdown</label>
      <section className="grid grid-cols-1 gap-3">
        <div className="flex flex-col box-shadow border-1 border-gray-300 rounded-xl bg-gray-100 p-4">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <div className="text-size-14 text-gray-600">Base Accrual</div>
              <div className="text-size-16 text-gray-900 space-y-1 tracking-tight font-semibold">
                {baseYieldFormatted}% APR
              </div>
            </div>
            <div className="text-size-12 text-gray-500">
              Base accrual from kVCM inflation at maturity for your selected
              term.
            </div>
          </div>
        </div>
        <div className="flex flex-col box-shadow border-1 border-gray-300 rounded-xl bg-gray-100 p-4">
          <div className="flex flex-col gap-2 h-full">
            <div className="flex flex-col gap-[0.15rem]">
              <div className="flex justify-between items-center mb-1">
                <div className="text-size-14 text-gray-600">
                  K2 Incentives (Variable)
                </div>
                <div className="text-size-12 text-gray-900 space-y-1 tracking-tight">
                  ~ {incentivesYieldFormatted} K2 / kVCM / epoch
                </div>
              </div>
              <div className="text-size-12 text-gray-500">
                K2 Incentives earned by your time-locked kVCM. K2 amounts are
                variable and may change, including to 0.
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col box-shadow border-1 border-gray-300 rounded-xl bg-gray-100 p-4">
          <div className="flex flex-col gap-2 h-full">
            <div className="flex flex-col gap-[0.15rem]">
              <div className="text-size-14 text-gray-600 text-center">
                Enter token amount above to see your returns
              </div>
              <div className="text-size-12 text-gray-500 text-center">
                Lock duration - {lockDuration} • Base accrual:{' '}
                {baseYieldFormatted}%
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
