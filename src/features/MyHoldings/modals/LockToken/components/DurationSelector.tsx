'use client';

import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { Control, Controller } from 'react-hook-form';
import { findClosestMaturityByDays, LockTokenFields } from '../lockToken.utils';

const PRESET_DURATIONS = [
  { label: '3 months', days: 90 },
  { label: '1 year', days: 365 },
  { label: '3 years', days: 1095 },
  { label: '5 years', days: 1825 },
];

type Props = {
  control: Control<LockTokenFields>;
};

// @todo - replace with actual data...
const getNextResetInfo = () => {
  const today = new Date();
  const nextResetDate = new Date('2025-12-14');
  const daysUntilReset = Math.ceil(
    (nextResetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return { nextResetDate, daysUntilReset };
};

export default function DurationSelector({ control }: Props) {
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
    <div className="flex flex-col gap-2">
      <label className="text-size-14 font-medium">Maturity</label>
      <p className="text-size-12 text-void-40">
        Duration between maturities is 90 days. Choose from 40 supported dates.
        Next roll over in{' '}
        <span className="font-bold" style={{ color: '#00cc33' }}>
          {daysUntilReset} days
        </span>{' '}
        (
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
                  className={`flex flex-col px-3 py-2 border-2 rounded-xl text-left ${
                    field.value === preset.days
                      ? 'border-void-20 bg-green-10 text-green-80'
                      : 'border-void-20 hover:border-[#999999]'
                  }`}
                >
                  <div className="text-size-12 font-medium">{preset.label}</div>
                  <div className="text-size-12 text-[#777777]">
                    {(preset.baseAPY * 100).toFixed(2)}% base yield
                  </div>
                </button>
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}
