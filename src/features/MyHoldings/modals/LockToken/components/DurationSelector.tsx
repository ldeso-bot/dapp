'use client';

import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { FormControlProps } from '@/shared/utils/form.types';
import type { FC } from 'react';
import { Controller } from 'react-hook-form';
import { findClosestMaturityByDays, LockTokenFields } from '../lockToken.utils';

const PRESET_DURATIONS = [
  { label: '3 months', days: 90, description: 'Shortest' },
  { label: '1 year', days: 365, description: 'Short' },
  { label: '3 years', days: 1095, description: 'Medium' },
  { label: '5 years', days: 1825, description: 'Longest' },
];

// @todo - replace with actual data...
const getNextResetInfo = () => {
  const today = new Date();
  const nextResetDate = new Date('2025-12-14');
  const daysUntilReset = Math.ceil(
    (nextResetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return { nextResetDate, daysUntilReset };
};

export const DurationSelector: FC<FormControlProps<LockTokenFields>> = ({
  control,
}) => {
  const { data: protocolData } = useProtocolData();
  const { nextResetDate, daysUntilReset } = getNextResetInfo();

  const presetDurations = PRESET_DURATIONS.map((preset) => ({
    ...preset,
    baseAPY:
      findClosestMaturityByDays(
        preset.days,
        protocolData?.lockedkVcmYieldRates ?? []
      )?.yieldPercent ?? 3,
  }));

  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex items-center gap-2">
        <label className="text-size-16 font-medium">Maturity</label>
        <Tooltip
          className="max-w-[30rem] text-size-12 p-3"
          content="Maturity is a fixed date. Remaining time shrinks daily until the roll, then dates roll forward."
        />
      </div>
      <p className="text-size-12 text-void-40">
        Duration between maturities is 90 days. Choose from supported dates.
        Next roll over in{' '}
        <span className="font-bold text-gray-900">{daysUntilReset} days</span> (
        {nextResetDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
        ).
      </p>
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
                  className={`flex flex-col items-center px-3 py-2 border-2 rounded-xl text-center ${
                    field.value === preset.days
                      ? 'border-gray-200 bg-green-10 text-green-80'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-size-14 font-medium">{preset.label}</div>
                  <div className="text-size-12 text-[#777777]">
                    {preset.description}
                  </div>
                </button>
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};
