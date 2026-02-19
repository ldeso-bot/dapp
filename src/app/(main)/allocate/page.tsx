import AllocatePage from '@/features/Allocate/AllocatePage';
import type { Metadata } from 'next';

const description =
  'Allocate carbon tokens to influence carbon credit pricing. Lock kVCM and K2 to direct protocol purchases toward the carbon classes you support.';

export const metadata: Metadata = {
  title: 'Allocate',
  description,
  alternates: {
    canonical: '/allocate',
  },
  openGraph: {
    title: 'Allocate | Klima Protocol',
    description,
    url: '/allocate',
  },
};

export default function Page() {
  return <AllocatePage />;
}
