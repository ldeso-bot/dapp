'use client';

import { YieldRate } from '@/shared/models/ProtocolData';

type Props = {
  amount: number;
  selectedMaturity: YieldRate;
};

export default function YieldBreakdownCard({
  amount,
  selectedMaturity,
}: Props) {
  // todo - replace with actual calculations
  const totalYield =
    selectedMaturity.yieldPercent ??
    3 + (selectedMaturity.incentivesYield ?? 0);
  const baseYieldFormatted = (selectedMaturity.yieldPercent * 100).toFixed(2);
  const totalYieldFormatted = (totalYield * amount).toFixed(2);
  const incentivesYieldFormatted = (
    selectedMaturity.incentivesYield ?? 0 * amount
  ).toFixed(2);

  return (
    <>
      <label className="text-size-14 font-medium">Final Yield Breakdown</label>
      <section className="grid grid-cols-1 gap-4">
        <div className="flex flex-col box-shadow border-1 border-green-40 rounded-xl bg-green-10 p-4">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <div className="text-size-14 text-void-50 space-y-1">
                Base Yield¹ (Guaranteed)
              </div>
              <div className="text-size-16 text-void-50 space-y-1 font-semibold">
                {baseYieldFormatted}% APR
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-size-12 text-void-50 space-y-1">
                At maturity:
              </div>
              <div className="text-size-12 text-void-50 space-y-1">+0 kVCM</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-size-12 text-void-50 space-y-1">
                Yearly rate:
              </div>
              <div className="text-size-12 text-void-50 space-y-1">
                +{baseYieldFormatted} kVCM/year
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col box-shadow border-1 border-void-20 rounded-xl bg-[#EFEFEF] p-4">
          <div className="flex flex-col gap-2 h-full">
            <div className="flex flex-col gap-[0.15rem]">
              <div className="flex justify-between items-center mb-1">
                <div className="text-size-14 text-void-50 space-y-1 tracking-tight">
                  Incentives K2 Tokens² (Variable)
                </div>
                <div className="text-size-14 text-void-50 space-y-1 tracking-tight">
                  K2 rewards
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-size-12 text-void-50 space-y-1">
                  Daily K2:
                </div>
                <div className="text-size-12 text-void-50 space-y-1">
                  +{incentivesYieldFormatted} K2
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-size-12 text-void-50 space-y-1">
                  Yearly rate:
                </div>
                <div className="text-size-12 text-void-50 space-y-1">
                  +{incentivesYieldFormatted} K2/year
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-void-80 rounded-xl text-center">
          <h3 className="text-size-14 font-medium text-void-20 mb-1">
            Total Value at Maturity
          </h3>
          <p className="text-white font-semibold text-size-18">
            {totalYieldFormatted} kVCM
          </p>
          <p className="text-void-20 mt-1">+ 0 K2 tokens</p>
        </div>
      </section>
    </>
  );
}
