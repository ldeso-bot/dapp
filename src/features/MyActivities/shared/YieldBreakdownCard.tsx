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
  token,
}: UseIncentivesBreakdownParams) => {
  const { kvcmYieldFormatted, kvcmApyFormatted, k2ApyFormatted, lockDuration } =
    useIncentivesBreakdown({
      amount,
      maturity,
      token,
    });

  if (!DEV_MODE) return null;

  return (
    <>
      <label className="text-size-14 font-medium">
        Indicative Protocol Parameters
      </label>
      <section className="grid grid-cols-1 gap-3">
        <div className="flex flex-col box-shadow border-1 border-border-default rounded-xl bg-surface-2 p-4">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <div className="text-size-14 text-text-2">
                kVCM incentives (variable) kVCM
              </div>
              <div className="text-size-16 text-text-1 tracking-tight font-semibold inline-flex items-center">
                <span>~ {kvcmApyFormatted}</span>
                <span className="inline-flex items-center ml-1 -translate-y-px">
                  <Tooltip content="The annual percentage rate of the variable rewards. This is an estimate, is not guaranteed, can change, and may be zero." />
                </span>
              </div>
            </div>
            <div className="text-size-12 text-text-3">
              Indicative kVCM incentives from kVCM inflation. Available when
              your tokens become unlocked.
            </div>
          </div>
        </div>
        <div className="flex flex-col box-shadow border-1 border-border-default rounded-xl bg-surface-2 p-4">
          <div className="flex flex-col gap-2 h-full">
            <div className="flex flex-col gap-[0.15rem]">
              <div className="flex justify-between items-center mb-1">
                <div className="text-size-14 text-text-2">
                  K2 incentives (variable)
                </div>
                <div className="text-size-12 text-text-1 space-y-1 tracking-tight">
                  ~ {k2ApyFormatted}
                </div>
              </div>
              <div className="text-size-12 text-text-3">
                K2 incentives received by your time-locked kVCM. K2 amounts are
                variable, depend on protocol parameters, and may be zero.
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col box-shadow border-1 border-border-default rounded-xl bg-surface-2 p-4">
          <div className="flex flex-col gap-2 h-full">
            <div className="flex flex-col gap-[0.15rem]">
              <div className="text-size-14 text-text-2 text-center">
                Enter token amount to view indicative protocol parameters
              </div>
              <div className="text-size-12 text-text-3 text-center">
                Lock duration - {lockDuration} days • Indicative kVCM
                incentives: {kvcmYieldFormatted}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
