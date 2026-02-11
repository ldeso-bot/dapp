'use client';

import { ONE_DAY } from '@/shared/constants/protocol.constants';
import { useLockableMaturities } from '@/shared/hooks/useLockableMaturities';
import { FormControlProps } from '@/shared/utils/form.types';
import { Slider as SliderPrimitive } from 'radix-ui';
import { Controller } from 'react-hook-form';
import { DurationFormFields } from './DurationStepper';

const getDaysFromTimestamp = (timestamp: number): number => {
  const now = Math.floor(Date.now() / 1000);
  const diff = timestamp - now;
  return Math.max(0, Math.floor(diff / ONE_DAY));
};

export const DurationSlider = <T extends DurationFormFields>({
  name,
  control,
}: FormControlProps<T>) => {
  const lockableMaturities = useLockableMaturities();
  const maturityDays =
    lockableMaturities?.map((m) =>
      getDaysFromTimestamp(m.maturationTimestamp)
    ) ?? [];

  return (
    <div className="px-1">
      <div className="flex justify-between text-size-12 text-void-40 mt-2 mb-1">
        <span>Shortest</span>
        <span>Longest</span>
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const currentDuration = Number(field.value);
          // Find the current maturity index based on duration
          // First try to find an exact match (within 1 day)
          let currentIndex = maturityDays.findIndex(
            (days) => Math.abs(days - currentDuration) <= 1
          );

          // If no exact match, find the closest
          if (currentIndex === -1) {
            currentIndex = maturityDays.reduce((closestIndex, days, index) => {
              const currentDiff = Math.abs(days - currentDuration);
              const closestMaturityDay = maturityDays[closestIndex];
              const closestDiff =
                closestMaturityDay !== undefined
                  ? Math.abs(closestMaturityDay - currentDuration)
                  : Infinity;
              return currentDiff < closestDiff ? index : closestIndex;
            }, 0);
          }

          const minIndex = 0;
          const maxIndex = lockableMaturities.length - 1;

          const handleValueChange = (values: number[]) => {
            const val = values[0];
            if (val === undefined) return;
            const newIndex = Math.round(val);
            const clampedIndex = Math.max(
              minIndex,
              Math.min(maxIndex, newIndex)
            );
            const selectedMaturity = lockableMaturities[clampedIndex];
            if (selectedMaturity) {
              const days = getDaysFromTimestamp(
                selectedMaturity.maturationTimestamp
              );
              field.onChange(days);
            }
          };

          return (
            <SliderPrimitive.Root
              max={maxIndex}
              min={minIndex}
              step={1}
              className="relative flex h-5 w-full touch-none select-none items-center"
              value={[currentIndex]}
              onValueChange={handleValueChange}
            >
              <SliderPrimitive.Track className="relative h-[5px] rounded-full grow bg-void-20">
                <SliderPrimitive.Range className="absolute h-full rounded-full bg-void-60" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb className="block size-3 rounded-[10px] bg-void-60 hover:transparent focus:none focus:outline-none" />
            </SliderPrimitive.Root>
          );
        }}
      />
    </div>
  );
};
