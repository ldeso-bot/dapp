import { Progress as ProgressPrimitive } from 'radix-ui';

type Props = {
  progressPercent: number;
};

export default function Progress({ progressPercent }: Props) {
  return (
    <ProgressPrimitive.Root
      value={progressPercent}
      max={1}
      className="relative h-[0.8rem] bg-green-10 overflow-hidden"
    >
      <ProgressPrimitive.Indicator
        className="w-full h-full bg-green-40 rounded-full"
        style={{
          transform: `translateX(-${Math.floor((1 - progressPercent) * 100)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
}
