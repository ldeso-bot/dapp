import RetireCarbonPage from '@/features/Retire/RetireCarbonPage';
import type { Metadata } from 'next';

const description =
  'Retire carbon credits permanently and receive a verified retirement certificate. Offset your carbon footprint through Klima Protocol and Carbonmark.';

export const metadata: Metadata = {
  title: 'Retire Carbon',
  description,
  alternates: {
    canonical: '/retire-carbon',
  },
  openGraph: {
    title: 'Retire Carbon | Klima Protocol',
    description,
    url: '/retire-carbon',
  },
};

export default function Page() {
  return <RetireCarbonPage />;
}
