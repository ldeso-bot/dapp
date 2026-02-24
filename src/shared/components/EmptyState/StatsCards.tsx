'use client';

import { type StatsCardsProps } from '@/shared/utils/emptyState.utils';

export const StatsCards = (props: StatsCardsProps) => {
  const { stats } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-8 pt-8 border-t border-[#f0f0f0]/60">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-[3.4rem] md:text-[3rem] font-bold text-[#00994a] leading-tight">
            {stat.value}
          </div>

          <div className="text-[1.2rem] md:text-[1.5rem] text-gray-600 mt-2 leading-snug">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};
