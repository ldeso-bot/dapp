'use client';

import type { EmptyStateProps } from '@/shared/utils/emptyState.utils';
import { AnimatedLines } from './AnimatedLines';
import { DocsCallout } from './DocsCallout';
import { EmptyStateButton } from './EmptyStateButton';
import { FlowItems } from './FlowItems';
import { Header } from './Header';
import { InfoCards } from './InfoCards';
import { StatsCards } from './StatsCards';

export const EmptyState = ({
  title,
  description,
  flowItems,
  cta,
  stats,
  infoCards,
  docsCallout,
  customCalloutSection,
}: EmptyStateProps) => (
  <div className="min-h-screen -m-6">
    <div className="relative">
      <AnimatedLines />
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="text-center max-w-7xl mx-auto space-y-12 md:space-y-16 animate-fade-in-up">
          <Header title={title} description={description} />
          <FlowItems flowItems={flowItems} />
          <div className="flex flex-col items-center space-y-4">
            <EmptyStateButton cta={{ ...cta }} />
          </div>
          {stats && stats.length > 0 && <StatsCards stats={stats} />}
        </div>
      </div>
    </div>
    <div className="px-16">
      {infoCards && <InfoCards {...infoCards} />}
      {docsCallout && <DocsCallout {...docsCallout} />}
      {customCalloutSection && customCalloutSection}
    </div>
  </div>
);
