import { TermsPage } from '@/features/Terms/TermsPage';
import type { Metadata } from 'next';

const description =
  'Review Klima Protocol terms of use, risk disclosures, and legal information for the decentralized carbon market platform.';

export const metadata: Metadata = {
  title: 'Terms & Disclosures',
  description,
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms & Disclosures | Klima Protocol',
    description,
    url: '/terms',
  },
};

export default function Page() {
  return <TermsPage />;
}
