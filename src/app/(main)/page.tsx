import { OverviewEmptyState } from '@/features/Overview/OverviewEmptyState';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: '/',
  },
};

export default function Home() {
  return <OverviewEmptyState />;
}
