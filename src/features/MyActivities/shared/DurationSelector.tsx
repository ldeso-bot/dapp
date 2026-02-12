'use client';

import { Tooltip } from '@/shared/components/Tooltip/Tooltip';
import { ONE_DAY } from '@/shared/constants/protocol.constants';
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
import { findClosestMaturityByDays } from '@/shared/utils/protocol.utils';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { DurationFormFields } from './DurationStepper';

const getPresetDurations = (daysBetweenMaturities: number) => {
  return [
    { days: daysBetweenMaturities, description: 'Shortest' },
    { days: daysBetweenMaturities * 4, description: 'Short' },
    { days: daysBetweenMaturities * 12, description: 'Medium' },
    { days: daysBetweenMaturities * 40, description: 'Longest' },
  ] as const;
};

export const DurationSelector = <T extends DurationFormFields>({
  control,
  name,
}: FormControlProps<T>) => {
  const lockableMaturities = useLockableMaturities();
  const currentTimestamp = useCurrentTimestamp();
  const { data: protocolData } = useProtocolData();

  const daysBetweenMaturities =
    (protocolData?.protocolState?.maturityPeriod ?? 0) / ONE_DAY;

  const PRESET_DURATIONS = getPresetDurations(daysBetweenMaturities);

  const firstMaturity = protocolData?.maturities[0] ?? null;
  const firstMaturityTimestamp = firstMaturity?.maturationTimestamp ?? 0;
  const nextResetDate = new Date(firstMaturityTimestamp * 1000);
  const daysUntilReset = firstMaturity
    ? getDaysFromTimestamp(firstMaturity.maturationTimestamp)
    : 0;

  const presetDurations = useMemo(() => {
    const shortestDays = firstMaturity
      ? getDaysFromTimestamp(firstMaturity.maturationTimestamp, true)
      : PRESET_DURATIONS[0].days;

    const lastMaturity =
      lockableMaturities[lockableMaturities.length - 1] ?? null;
    const longestDays = lastMaturity
      ? getDaysFromTimestamp(lastMaturity.maturationTimestamp, true)
      : (PRESET_DURATIONS[PRESET_DURATIONS.length - 1]?.days ?? 0);

    return PRESET_DURATIONS.map((preset, index) => {
      const isFirst = index === 0;
      const isLast = index === PRESET_DURATIONS.length - 1;
      const daysToUse = isFirst
        ? shortestDays
        : isLast
          ? longestDays
          : preset.days;

      const maturity = findClosestMaturityByDays(daysToUse, lockableMaturities);
      const timestamp = maturity?.maturationTimestamp
        ? maturity.maturationTimestamp
        : currentTimestamp + daysToUse * ONE_DAY;

      return {
        ...preset,
        days: daysToUse,
        label: formatDateDDMMYYYY(timestamp),
        baseAPY: maturity?.syntheticYieldZeroCouponYieldCurve ?? 3,
        approxDuration: calculateApproxDuration(timestamp),
      };
    });
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
      <p className="text-size-12 text-void-40">
        Select one of the following presets or choose a custom duration below.
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
            name={name}
            key={preset.days}
            control={control}
            render={({ field }) => {
              const isSelected = field.value === preset.days;
              return (
                <Tooltip
                  trigger={
                    <button
                      type="button"
                      onClick={() => field.onChange(preset.days)}
                      className={cn(
                        'w-full flex flex-col items-center px-3 py-2 border-2 rounded-xl text-center',
                        isSelected
                          ? 'border-gray-200 bg-green-10 text-green-80'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <div className="text-size-14 font-medium">
                        {preset.label}
                      </div>
                      <div className="text-size-12 text-gray-500">
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
