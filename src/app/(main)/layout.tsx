import Alert from '@/features/Alert/Alert';
import { KycModal } from '@/features/Kyc/KycModal';
import { ContentContainer } from '@/shared/components/ContentContainer/ContentContainer';
import { DisclaimerModal } from '@/shared/components/Disclaimer/Disclaimer';
import Footer from '@/shared/components/Footer/Footer';
import { JsonLd } from '@/shared/components/JsonLd/JsonLd';
import DesktopNavBar from '@/shared/components/NavBar/DesktopNavBar';
import MobileNavBar from '@/shared/components/NavBar/MobileNavBar';
import { UserTracker } from '@/shared/components/UserTracker/UserTracker';
import { LUCKY_ORANGE_SITE_ID } from '@/shared/constants/config.constants';
import {
  organizationSchema,
  sharedMetadata,
  sharedViewport,
  webApplicationSchema,
  webSiteSchema,
} from '@/shared/constants/metadata.constants';
import { WALLET_CONNECTION_HISTORY_COOKIE } from '@/shared/constants/storage.constants';
import { WalletConnectionHistoryProvider } from '@/shared/contexts/WalletCookieContext';
import '@/shared/css/globals.css';
import { canaryTokenTrackingScript } from '@/shared/utils/canary-token.utils';
import { isProduction } from '@/shared/utils/environment.utils';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Script from 'next/script';
import { Providers } from '../providers';

export const metadata: Metadata = sharedMetadata;
export const viewport: Viewport = sharedViewport;

const inter = Inter({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const hasPreviouslyConnected = cookieStore.has(
    WALLET_CONNECTION_HISTORY_COOKIE
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (() => {
        try {
          const themes = ['light', 'dark'];
          const darkThemes = ['dark'];

          const storedTheme = localStorage.getItem('theme');
          const theme = themes.includes(storedTheme)
            ? storedTheme
            : 'light';

          document.documentElement.setAttribute('data-theme', theme);
          document.documentElement.classList.toggle(
            'dark',
            darkThemes.includes(theme)
          );
        } catch {}
      })();
    `,
          }}
        />
      </head>

      <body className={inter.className}>
        {isProduction && (
          <Script
            id="canary"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{ __html: canaryTokenTrackingScript }}
          />
        )}
        <DisclaimerModal />
        <Providers>
          <WalletConnectionHistoryProvider
            hasPreviouslyConnected={hasPreviouslyConnected}
          >
            <UserTracker />
            <div className="flex flex-col lg:flex-row">
              <DesktopNavBar />
              <MobileNavBar />
              <div className="flex flex-col flex-1 relative overflow-x-hidden">
                <Alert />
                <KycModal />
                <ContentContainer>{children}</ContentContainer>
                <Footer />
              </div>
            </div>
          </WalletConnectionHistoryProvider>
        </Providers>
        {LUCKY_ORANGE_SITE_ID && (
          <Script
            strategy="afterInteractive"
            src={`https://tools.luckyorange.com/core/lo.js?site-id=${LUCKY_ORANGE_SITE_ID}`}
          />
        )}
        <JsonLd data={organizationSchema} />
        <JsonLd data={webApplicationSchema} />
        <JsonLd data={webSiteSchema} />
      </body>

      {LUCKY_ORANGE_SITE_ID && (
        <Script
          strategy="afterInteractive"
          src={`https://tools.luckyorange.com/core/lo.js?site-id=${LUCKY_ORANGE_SITE_ID}`}
        />
      )}
      <JsonLd data={organizationSchema} />
      <JsonLd data={webApplicationSchema} />
      <JsonLd data={webSiteSchema} />
    </html>
  );
}
