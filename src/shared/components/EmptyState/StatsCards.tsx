'use client';

import { type StatsCardsProps } from '@/shared/utils/emptyState.utils';

export const StatsCards = (props: StatsCardsProps) => {
  const { stats } = props;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-8 pt-8 border-t border-[#f0f0f0]/60">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-5xl font-bold text-[#00994a]">{stat.value}</div>
          <div className="text-xl text-gray-600 mt-1.5">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};
