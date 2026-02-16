'use client';

import {
  useIncentivesBreakdown,
  UseIncentivesBreakdownParams,
} from '@/features/MyActivities/hooks/useIncentivesBreakdown';
import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { DEV_MODE } from '@/shared/constants/config.constants';

export const IncentivesBreakdownCard = ({
  amount,
  maturity,
}: UseIncentivesBreakdownParams) => {
  const { baseYieldFormatted, incentivesYieldFormatted, lockDuration } =
    useIncentivesBreakdown({
      amount,
      maturity,
    });

  if (!DEV_MODE) return null;

  return (
    <>
      <label className="text-size-14 font-medium">
        Indicative Protocol Parameters
      </label>
      <section className="grid grid-cols-1 gap-3">
        <div className="flex flex-col box-shadow border-1 border-gray-300 rounded-xl bg-gray-100 p-4">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <div className="text-size-14 text-gray-600">
                kVCM incentives (variable)
              </div>
              <div className="text-size-16 text-gray-900 tracking-tight font-semibold inline-flex items-center">
                <span>{baseYieldFormatted}%</span>
                <span className="inline-flex items-center ml-1 -translate-y-px">
                  <Tooltip content="The annual percentage rate of the variable rewards. This is an estimate, is not guaranteed, can change, and may be zero." />
                </span>
              </div>
            </div>
            <div className="text-size-12 text-gray-500">
              Indicative kVCM incentives from kVCM inflation. Available when
              your tokens become unlocked.
            </div>
          </div>
        </div>
        <div className="flex flex-col box-shadow border-1 border-gray-300 rounded-xl bg-gray-100 p-4">
          <div className="flex flex-col gap-2 h-full">
            <div className="flex flex-col gap-[0.15rem]">
              <div className="flex justify-between items-center mb-1">
                <div className="text-size-14 text-gray-600">
                  K2 incentives (variable)
                </div>
                <div className="text-size-12 text-gray-900 space-y-1 tracking-tight">
                  ~ {incentivesYieldFormatted} K2 / kVCM / epoch
                </div>
              </div>
              <div className="text-size-12 text-gray-500">
                K2 incentives received by your time-locked kVCM. K2 amounts are
                variable, depend on protocol parameters, and may be zero.
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col box-shadow border-1 border-gray-300 rounded-xl bg-gray-100 p-4">
          <div className="flex flex-col gap-2 h-full">
            <div className="flex flex-col gap-[0.15rem]">
              <div className="text-size-14 text-gray-600 text-center">
                Enter token amount to view indicative protocol parameters
              </div>
              <div className="text-size-12 text-gray-500 text-center">
                Lock duration - {lockDuration} • Indicative kVCM incentives:{' '}
                {baseYieldFormatted}%
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
