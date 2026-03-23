'use client';

import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import {
  formatPriceUSD,
  formatTonnesWithSuffix,
} from '@/shared/utils/string.utils';

export const ProtocolStatsBar = () => {
  const { data: protocolData } = useProtocolData();

  const carbonClasses = protocolData?.carbonClasses ?? [];
  const kvcmLockedUSD = protocolData?.metrics?.kvcm?.valueLockedUSD ?? 0;
  const k2LockedUSD = protocolData?.metrics?.k2?.valueLockedUSD ?? 0;
  const totalTonnes = carbonClasses.reduce(
    (sum, carbonClass) => sum + (carbonClass.supplyTonnes ?? 0),
    0
  );

  const stats = [
    {
      value: formatTonnesWithSuffix(totalTonnes),
      label: 'tonnes in curated carbon classes [t416]',
    },
    { value: formatPriceUSD(kvcmLockedUSD), label: 'kVCM locked [t417]' },
    { value: formatPriceUSD(k2LockedUSD), label: 'K2 deposited [t418]' },
    {
      value: String(carbonClasses.length),
      label: 'active carbon classes [t419]',
    },
  ];

  return (
    <div className="w-full bg-surface-1/50 py-6 my-12 md:my-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:flex-wrap md:items-end md:justify-center md:gap-x-12 md:gap-y-2">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="
            flex flex-col items-center text-center
            md:flex-row md:items-baseline md:text-left md:gap-1.5
          "
            >
              <div className="font-semibold text-[2.9rem] md:text-[2.1rem] leading-[0.95] md:leading-none">
                {value}
              </div>

              <div className="mt-1 text-text-3 text-size-14 md:mt-0 md:text-size-16 leading-tight md:leading-none">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
