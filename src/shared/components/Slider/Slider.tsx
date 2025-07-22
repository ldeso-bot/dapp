import { Slider as SliderPrimitive } from "radix-ui";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  max?: number;
  step?: number;
  name: Path<T>;
  control: Control<T>;
};

export default function Slider<T extends FieldValues>({ name, control, max = 100, step = 1 }: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <SliderPrimitive.Root
            className="relative flex h-5 w-full touch-none select-none items-center"
            onValueChange={field.onChange}
            onChange={field.onChange}
            defaultValue={[field.value]}
            max={max}
            step={step}
          >
            <SliderPrimitive.Track className="relative h-[5px] grow bg-[#C3C3C3]">
              <SliderPrimitive.Range className="absolute h-full bg-[#464646]" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb
              className="block size-3 rounded-[10px] bg-[#464646] hover:transparent focus:none focus:outline-none"
            />
          </SliderPrimitive.Root>
        )
      }} />
  )
};
