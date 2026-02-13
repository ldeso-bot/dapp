'use client';

import { useLockableMaturities } from '@/shared/hooks/useLockableMaturities';
import { FormControlProps } from '@/shared/utils/form.types';
import { Slider as SliderPrimitive } from 'radix-ui';
import { Controller } from 'react-hook-form';
import { DurationFormFields } from './DurationStepper';

export const DurationSlider = <T extends DurationFormFields>({
  name,
  control,
}: FormControlProps<T>) => {
  const lockableMaturities = useLockableMaturities();

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
          const currentMaturityId = Number(field.value);

          const minMaturityId = lockableMaturities[0]?.maturityId ?? 0;
          const maxMaturityId =
            lockableMaturities[lockableMaturities.length - 1]?.maturityId ?? 0;

          const handleValueChange = (values: number[]) => {
            const val = values[0];

            if (val === undefined) return;
            field.onChange(val);
          };

          return (
            <SliderPrimitive.Root
              min={minMaturityId}
              max={maxMaturityId}
              step={1}
              className="relative flex h-5 w-full touch-none select-none items-center"
              value={[currentMaturityId]}
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
