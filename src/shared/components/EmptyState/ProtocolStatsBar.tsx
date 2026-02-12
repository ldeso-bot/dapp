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
    <div className="w-full bg-white/50 py-4 my-12 md:my-16">
      <div className="max-w-8xl mx-auto px-6">
        <div className="flex flex-wrap items-end justify-center gap-x-8 gap-y-2 md:gap-x-12">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="text-gray-900 whitespace-nowrap flex items-end gap-1.5"
            >
              <div className="font-semibold text-[2rem]">{value}</div>{' '}
              <div className="text-gray-500 text-size-14 md:text-size-16">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
