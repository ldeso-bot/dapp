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
  protocolStatsBar,
  customFlowSection,
  infoCards,
  docsCallout,
  customCalloutSection,
}: EmptyStateProps) => (
  <div className="min-h-screen -m-2 text-text-1">
    <div className="relative">
      <AnimatedLines />
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-14 pb-12 md:pt-24 md:pb-16">
        <div className="w-full text-center max-w-7xl mx-auto space-y-10 md:space-y-16 animate-fade-in-up">
          <Header title={title} description={description} />
          {flowItems.length > 0 && (
            <div className="w-full">
              <FlowItems flowItems={flowItems} />
            </div>
          )}
          <div className="flex flex-col items-center space-y-4">
            <EmptyStateButton cta={{ ...cta }} />
          </div>
          {stats && stats.length > 0 && (
            <div className="w-full">
              <StatsCards stats={stats} />
            </div>
          )}
        </div>
      </div>
    </div>
    {customFlowSection && <div className="w-full">{customFlowSection}</div>}
    {protocolStatsBar}
    <div className="w-full px-4 sm:px-6 lg:px-16">
      <div className="w-full">
        {infoCards && <InfoCards {...infoCards} />}
        {docsCallout && <DocsCallout {...docsCallout} />}
        {customCalloutSection && customCalloutSection}
      </div>
    </div>
  </div>
);
