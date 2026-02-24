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
      label: 'tonnes in curated carbon classes',
    },
    { value: formatPriceUSD(kvcmLockedUSD), label: 'kVCM locked' },
    { value: formatPriceUSD(k2LockedUSD), label: 'K2 deposited' },
    {
      value: String(carbonClasses.length),
      label: 'active carbon classes',
    },
  ];

  return (
    <div className="w-full bg-white/50 py-6 my-12 md:my-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:flex-wrap md:items-end md:justify-center md:gap-x-12 md:gap-y-2">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="
              flex flex-col items-center text-center
              md:flex-row md:items-end md:text-left md:gap-1.5
            "
            >
              {/* Dynamic values */}
              <div className="font-semibold text-[2.9rem] md:text-[2.1rem] leading-none">
                {value}
              </div>
              {/* Fixed labels */}
              <div className="text-gray-500 text-size-14 md:text-size-16 leading-tight md:leading-none md:ml-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
