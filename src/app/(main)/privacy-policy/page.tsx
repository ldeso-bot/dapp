import { PrivacyPolicyPage } from '@/features/PrivacyPolicy/PrivacyPolicyPage';
import type { Metadata } from 'next';

const description =
  'Klima Protocol privacy policy and data handling practices for the carbon markets platform.';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description,
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Klima Protocol',
    description,
    url: '/privacy-policy',
  },
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
