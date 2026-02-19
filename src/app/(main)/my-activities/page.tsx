import MyActivitiesPage from '@/features/MyActivities/MyActivitiesPage';
import type { Metadata } from 'next';

const description =
  'Manage your carbon portfolio. View real-time balances, locked positions, liquidity, and claimable rewards across kVCM, K2, and LP tokens.';

export const metadata: Metadata = {
  title: 'My Activities',
  description,
  alternates: {
    canonical: '/my-activities',
  },
  openGraph: {
    title: 'My Activities | Klima Protocol',
    description,
    url: '/my-activities',
  },
};

export default function Page() {
  return <MyActivitiesPage />;
}
