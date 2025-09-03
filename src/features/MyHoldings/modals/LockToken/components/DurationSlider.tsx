'use client';

import { Slider as SliderPrimitive } from "radix-ui";
import { Control, Controller } from "react-hook-form";
import { LockTokenFields } from '../lockToken.utils';

type Props = {
  control: Control<LockTokenFields>;
};

export default function DurationSlider({ control }: Props) {
  return (
    <div className="px-1">
      <div className="text-size-14 text-void-40 mb-2">Or drag to adjust:</div>
      <Controller
        name="duration"
        control={control}
        render={({ field }) => {
          return (
            <SliderPrimitive.Root
              max={3600}
              min={90}
              step={90}
              className="relative flex h-5 w-full touch-none select-none items-center"
              value={[Number(field.value)]}
              onValueChange={field.onChange}
            >
              <SliderPrimitive.Track className="relative h-[5px] grow bg-void-20">
                <SliderPrimitive.Range className="absolute h-full bg-void-60" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb
                className="block size-3 rounded-[10px] bg-void-60 hover:transparent focus:none focus:outline-none"
              />
            </SliderPrimitive.Root>
          )
        }}
      />
      <div className="flex justify-between text-size-14 text-void-40 mt-2">
        <span>90 days</span>
        <span>10 years</span>
      </div>
    </div>
  )
};
