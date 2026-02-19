import SellCarbonPage from '@/features/SellCarbon/SellCarbonPage';
import type { Metadata } from 'next';

const description =
  'Sell carbon credits through Klima Protocol. Supply tokenized credits and receive kVCM tokens at transparent, market-driven prices — instant liquidity.';

export const metadata: Metadata = {
  title: 'Supply Carbon',
  description,
  alternates: {
    canonical: '/supply-carbon',
  },
  openGraph: {
    title: 'Supply Carbon | Klima Protocol',
    description,
    url: '/supply-carbon',
  },
};

export default function Page() {
  return <SellCarbonPage />;
}
