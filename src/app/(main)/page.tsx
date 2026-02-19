import OverviewPage from '@/features/Overview/OverviewPage';
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
  return <OverviewPage />;
}
