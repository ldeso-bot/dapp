import Alert from '@/features/Alert/Alert';
import { KycModal } from '@/features/Kyc/KycModal';
import { DisclaimerModal } from '@/shared/components/Disclaimer/Disclaimer';
import Footer from '@/shared/components/Footer/Footer';
import DesktopNavBar from '@/shared/components/NavBar/DesktopNavBar';
import MobileNavBar from '@/shared/components/NavBar/MobileNavBar';
import { UserTracker } from '@/shared/components/UserTracker/UserTracker';
import { LUCKY_ORANGE_SITE_ID } from '@/shared/constants/config.constants';
import { WALLET_CONNECTION_HISTORY_COOKIE } from '@/shared/constants/storage.constants';
import { WalletConnectionHistoryProvider } from '@/shared/contexts/WalletCookieContext';
import '@/shared/css/globals.css';
import { canaryTokenTrackingScript } from '@/shared/utils/canary-token.utils';
import { isProduction } from '@/shared/utils/environment.utils';
import {
  sharedMetadata,
  sharedViewport,
} from '@/shared/constants/metadata.constants';
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
    <html lang="en">
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
                <div className="flex-1 bg-void-10 p-6">{children}</div>
                <Footer />
              </div>
            </div>
          </WalletConnectionHistoryProvider>
        </Providers>
      </body>
      {LUCKY_ORANGE_SITE_ID && (
        <Script
          strategy="afterInteractive"
          src={`https://tools.luckyorange.com/core/lo.js?site-id=${LUCKY_ORANGE_SITE_ID}`}
        />
      )}
    </html>
  );
}
