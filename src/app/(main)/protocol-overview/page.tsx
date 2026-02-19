import OverviewPage from '@/features/Overview/OverviewPage';
import type { Metadata } from 'next';

const description =
  'Explore Klima Protocol stats — total carbon locked, token supply, carbon credit prices, and strategies powering carbon markets.';

export const metadata: Metadata = {
  title: 'Protocol Overview',
  description,
  alternates: {
    canonical: '/protocol-overview',
  },
  openGraph: {
    title: 'Protocol Overview | Klima Protocol',
    description,
    url: '/protocol-overview',
  },
};

export default function Page() {
  return <OverviewPage />;
}
