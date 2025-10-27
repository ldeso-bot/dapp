'use client';

import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { Control, Controller } from "react-hook-form";
import { findClosestMaturityByDays, LockTokenFields } from "../lockToken.utils";

const PRESET_DURATIONS = [
  { label: "3 months", days: 90 },
  { label: "1 year", days: 365 },
  { label: "3 years", days: 1095 },
  { label: "5 years", days: 1825 },
];

type Props = {
  control: Control<LockTokenFields>;
};

export default function DurationSelector({ control }: Props) {
  const { data: protocolData } = useProtocolData();

  const presetDurations = PRESET_DURATIONS.map((preset) => ({
    ...preset,
    baseAPY: findClosestMaturityByDays(
      preset.days,
      protocolData?.lockedkVcmYieldRates ?? []
    )?.yieldPercent ?? 3,
  }));

  return (
    <div className="flex flex-col gap-2">
      <label className="text-size-14 font-medium">Lock Duration</label>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {presetDurations.map((preset) => (
          <Controller
            key={preset.days}
            name="duration"
            control={control}
            render={({ field }) => {
              return (
                <button
                  key={preset.days}
                  onClick={() => field.onChange(preset.days)}
                  className={`flex flex-col px-3 py-2 border-2 rounded-xl text-left ${field.value === preset.days
                    ? "border-void-20 bg-green-10 text-green-80"
                    : "border-void-20 hover:border-[#999999]"
                    }`}
                >
                  <div className="text-size-12 font-medium">{preset.label}</div>
                  <div className="text-size-12 text-[#777777]">
                    {(preset.baseAPY * 100).toFixed(2)}% base yield
                  </div>
                </button>
              )
            }} />
        ))}
      </div>
    </div>
  );
}