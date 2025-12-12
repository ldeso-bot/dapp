import Alert from '@/features/Alert/Alert';
import Footer from '@/shared/components/Footer/Footer';
import DesktopNavBar from '@/shared/components/NavBar/DesktopNavBar';
import MobileNavBar from '@/shared/components/NavBar/MobileNavBar';
import { wagmiConfig } from '@/shared/constants/networks.constants';
import '@/shared/css/globals.css';
import { canaryTokenTrackingScript } from '@/shared/utils/canary-token.utils';
import { isProduction } from '@/shared/utils/environment.utils';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { headers } from 'next/headers';
import Script from 'next/script';
import { cookieToInitialState } from 'wagmi';
import { Providers } from '../providers';

const inter = Inter({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const initialState = cookieToInitialState(
    wagmiConfig,
    headersList.get('cookie')
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
        <Providers initialState={initialState}>
          <div className="flex flex-col lg:flex-row">
            <DesktopNavBar />
            <MobileNavBar />
            <div className="flex flex-col flex-1">
              <Alert />
              <div className="flex-1 bg-void-10 p-6">{children}</div>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
