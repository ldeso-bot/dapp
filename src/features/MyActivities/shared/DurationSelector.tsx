'use client';

import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { useCurrentTimestamp } from '@/shared/hooks/useCurrentTimestamp';
import { useLockableMaturities } from '@/shared/hooks/useLockableMaturities';
import { cn } from '@/shared/utils/component.utils';
import {
  calculateApproxDuration,
  formatDateDDMMYYYY,
  getDaysFromTimestamp,
} from '@/shared/utils/date.utils';
import { FormControlProps } from '@/shared/utils/form.types';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { isNonNullish } from 'remeda';
import { DurationFormFields } from './DurationStepper';

const getPresetDurations = () => {
  return [
    { index: 0, description: 'Shortest' },
    { index: 4, description: 'Short' },
    { index: 12, description: 'Medium' },
    { index: -1, description: 'Longest' },
  ] as const;
};

export const DurationSelector = <T extends DurationFormFields>({
  control,
  name,
}: FormControlProps<T>) => {
  const lockableMaturities = useLockableMaturities();
  const currentTimestamp = useCurrentTimestamp();
  const { data: protocolData } = useProtocolData();

  const PRESET_DURATIONS = getPresetDurations();

  const firstMaturity = protocolData?.maturities[0] ?? null;
  const firstMaturityTimestamp = firstMaturity?.maturationTimestamp ?? 0;
  const nextResetDate = new Date(firstMaturityTimestamp * 1000);
  const daysUntilReset = firstMaturity
    ? getDaysFromTimestamp(firstMaturity.maturationTimestamp)
    : 0;

  const presetDurations = useMemo(() => {
    return PRESET_DURATIONS.map((preset) => {
      const maturityListIndex =
        preset.index >= 0 ? preset.index : lockableMaturities.length - 1;
      const maturity = lockableMaturities[maturityListIndex];
      if (!maturity) return null;
      const timestamp = maturity.maturationTimestamp ?? 0;

      return {
        ...preset,
        maturity,
        label: formatDateDDMMYYYY(timestamp),
        baseAPY: maturity?.apys.kvcm.kvcmApy ?? 3,
        approxDuration: calculateApproxDuration(timestamp),
      };
    }).filter(isNonNullish);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lockableMaturities, currentTimestamp]);

  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex items-center gap-2">
        <label className="text-size-16 font-medium">Duration</label>
        <Tooltip
          className="max-w-[30rem] text-size-12 p-3"
          content="Duration is a fixed date. Remaining time shrinks daily until the roll, then dates roll forward."
        />
      </div>
      <p className="text-size-12 text-text-3">
        Select one of the following presets or choose a custom duration below.
        Next roll over in{' '}
        <span className="font-bold text-text-1">{daysUntilReset} days</span> (
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
            name={name}
            key={preset.maturity.maturityId}
            control={control}
            render={({ field }) => {
              const isSelected = field.value === preset.maturity.maturityId;
              return (
                <Tooltip
                  trigger={
                    <button
                      type="button"
                      onClick={() => field.onChange(preset.maturity.maturityId)}
                      className={cn(
                        'w-full flex flex-col items-center px-3 py-2 border-2 rounded-xl text-center',
                        isSelected
                          ? 'border-border-subtle bg-positive-bg text-text-highlight'
                          : 'border-border-subtle hover:border-border-default'
                      )}
                    >
                      <div className="text-size-14 font-medium">
                        {preset.label}
                      </div>
                      <div className="text-size-12 text-text-3">
                        {preset.description}
                      </div>
                    </button>
                  }
                  content={preset.approxDuration}
                  className="text-size-12 p-2"
                />
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};
