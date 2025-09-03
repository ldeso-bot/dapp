'use client';

import { Control, Controller } from "react-hook-form";
import { LockTokenFields } from "../lockToken.utils";

const formatLockDuration = (days: number) => {
  const years = days / 365
  if (days < 30) {
    return `${days}d`
  } else if (days < 365) {
    const months = Math.round(days / 30)
    return `~${months}mo`
  } else {
    return `~${Math.round(years * 10) / 10}y`
  }
}

type Props = {
  control: Control<LockTokenFields>;
};

export default function DurationStepper({ control }: Props) {
  return (
    <>
      <label className="text-size-14 font-medium">Custom Duration</label>
      <Controller
        name="duration"
        control={control}
        render={({ field }) => {
          const duration = Number(field.value);
          return (
            <div className="flex items-center justify-center space-x-4 p-4 bg-[#EFEFEF] rounded-lg">
              <button
                disabled={duration <= 90}
                onClick={() => field.onChange([Math.max(90, duration - 90)])}
                className="cursor-pointer flex items-center justify-center w-12 h-12 border-2 border-void-20 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none hover:border-void-40 bg-white active:bg-[#EFEFEF] transition-all"
                aria-label="Decrease duration by 90 days"
              >
                <svg className="w-5 h-5 text-void-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <div className="flex-1 text-center">
                <div className="text-size-16 font-bold text-black">{formatLockDuration(duration)}</div>
                <div className="text-size-12 text-void-40">Step {Math.floor(duration / 90)} of 40</div>
              </div>
              <button
                disabled={duration >= 3600}
                onClick={() => field.onChange([Math.min(3600, duration + 90)])}
                className="cursor-pointer flex items-center justify-center w-12 h-12 bg-white border-2 border-void-20 rounded-lg disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed hover:border-void-40 active:bg-[#EFEFEF] transition-all"
                aria-label="Increase duration by 90 days"
              >
                <svg className="w-5 h-5 text-void-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          )
        }}
      />
    </>
  );
}