import Alert from '@/features/Alert/Alert';
import Footer from '@/shared/components/Footer/Footer';
import DesktopNavBar from '@/shared/components/NavBar/DesktopNavBar';
import MobileNavBar from '@/shared/components/NavBar/MobileNavBar';
import { WalletConnectionHistoryProvider } from '@/shared/contexts/WalletCookieContext';
import '@/shared/css/globals.css';
import { canaryTokenTrackingScript } from '@/shared/utils/canary-token.utils';
import { WALLET_CONNECTION_HISTORY_COOKIE } from '@/shared/utils/cookie.utils';
import { isProduction } from '@/shared/utils/environment.utils';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { cookies } from 'next/headers';
import Script from 'next/script';
import { Providers } from '../providers';

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
      <Head>
        {isProduction && (
          <Script
            id="canary"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{ __html: canaryTokenTrackingScript }}
          />
        )}
      </Head>
      <body className={inter.className}>
        <Providers>
          <WalletConnectionHistoryProvider
            hasPreviouslyConnected={hasPreviouslyConnected}
          >
            <div className="flex flex-col lg:flex-row">
              <DesktopNavBar />
              <MobileNavBar />
              <div className="flex flex-col flex-1 relative overflow-x-hidden">
                <Alert />
                <div className="flex-1 bg-void-10 p-6">{children}</div>
                <Footer />
              </div>
            </div>
          </WalletConnectionHistoryProvider>
        </Providers>
      </body>
    </html>
  );
}
