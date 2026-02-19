import type { Metadata, Viewport } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://app.klimaprotocol.com';

const SITE_NAME = 'Klima Protocol';
const DEFAULT_DESCRIPTION =
  'Open infrastructure for carbon markets. Track carbon credit prices, protocol metrics, and liquidity on Klima Protocol.';
const OG_IMAGE = '/og-image.png';

export const sharedMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Open Infrastructure for Carbon Markets`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Klima Protocol — Open Infrastructure for Carbon Markets',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@KlimaDAO',
    creator: '@KlimaDAO',
    images: [OG_IMAGE],
  },
};

export const sharedViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00cc33',
};
