'use client';

import { ONE_DAY } from '@/shared/constants/protocol.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { FormControlProps } from '@/shared/utils/form.types';
import { Controller } from 'react-hook-form';

export type DurationFormFields = {
  duration?: number;
  [key: string]: unknown;
} & Record<string, unknown>;

export const formatLockDuration = (days: number) => {
  if (days < 30) {
    return `≈ ${days} days`;
  } else if (days < 365) {
    const months = Math.round(days / 30);
    return `≈ ${months} mo`;
  } else {
    const years = Math.floor(days / 365);
    const remainingDays = days - years * 365;
    const months = Math.round(remainingDays / 30);
    if (months === 0) {
      return `≈ ${years} yr`;
    }
    return `≈ ${years} yr ${months} mo`;
  }
};

const getDaysFromTimestamp = (timestamp: number): number => {
  const now = Math.floor(Date.now() / 1000);
  const diff = timestamp - now;
  return Math.max(0, Math.floor(diff / ONE_DAY));
};

const formatMaturityDate = (timestamp: number): string => {
  const dateObj = new Date(timestamp * 1000);
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const DurationStepper = <T extends DurationFormFields>({
  name,
  control,
}: FormControlProps<T>) => {
  const { data: protocolData } = useProtocolData();
  const maturities = protocolData?.lockedkVcmYieldRates ?? [];

  const currentMaturityDays =
    maturities?.map((maturity) => ({
      maturity,
      days: getDaysFromTimestamp(maturity.maturationTimestamp),
    })) ?? [];

  return (
    <>
      <label className="text-size-14 font-medium">Custom Maturity</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const currentDuration = Number(field.value);

          if (maturities.length === 0) {
            return (
              <div className="flex items-center justify-center space-x-4 p-4 bg-[#EFEFEF] rounded-lg">
                <div className="flex-1 text-center text-size-14 text-void-40">
                  No maturities available
                </div>
              </div>
            );
          }

          let currentMaturity = currentMaturityDays.find(
            (m) => Math.abs(m.days - currentDuration) <= 1
          )?.maturity;

          if (!currentMaturity) {
            const closest = currentMaturityDays.reduce((closest, current) => {
              return Math.abs(current.days - currentDuration) <
                Math.abs(closest.days - currentDuration)
                ? current
                : closest;
            });
            currentMaturity = closest.maturity;
          }

          const currentIndex = maturities.findIndex(
            (m) => m.maturityId === currentMaturity.maturityId
          );
          const hasPrevious = currentIndex > 0;
          const hasNext = currentIndex < maturities.length - 1;

          const handlePrevious = () => {
            if (hasPrevious) {
              const prevMaturity = maturities[currentIndex - 1];
              const days = getDaysFromTimestamp(
                prevMaturity.maturationTimestamp
              );
              field.onChange(days);
            }
          };

          const handleNext = () => {
            if (hasNext) {
              const nextMaturity = maturities[currentIndex + 1];
              const days = getDaysFromTimestamp(
                nextMaturity.maturationTimestamp
              );
              field.onChange(days);
            }
          };

          const displayDate = formatMaturityDate(
            currentMaturity.maturationTimestamp
          );
          const displayDuration = formatLockDuration(
            getDaysFromTimestamp(currentMaturity.maturationTimestamp)
          );

          return (
            <div className="flex items-center justify-center space-x-4 p-4 bg-[#EFEFEF] rounded-lg">
              <button
                type="button"
                disabled={!hasPrevious}
                onClick={handlePrevious}
                className="cursor-pointer flex items-center justify-center w-12 h-12 border-2 border-void-20 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none hover:border-void-40 bg-white active:bg-[#EFEFEF] transition-all"
                aria-label="Previous maturity"
              >
                <svg
                  className="w-5 h-5 text-void-60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <div className="flex-1 text-center">
                <div className="text-size-16 font-bold text-black">
                  {displayDate}
                </div>
                <div className="text-size-12 text-void-40">
                  {displayDuration}
                </div>
              </div>
              <button
                type="button"
                disabled={!hasNext}
                onClick={handleNext}
                className="cursor-pointer flex items-center justify-center w-12 h-12 bg-white border-2 border-void-20 rounded-lg disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed hover:border-void-40 active:bg-[#EFEFEF] transition-all"
                aria-label="Next maturity"
              >
                <svg
                  className="w-5 h-5 text-void-60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          );
        }}
      />
    </>
  );
};
