import Footer from '@/shared/components/Footer/footer';
import DesktopNavBar from '@/shared/components/NavBar/DesktopNavBar';
import MobileNavBar from '@/shared/components/NavBar/MobileNavBar';
import '@/shared/css/cards.css';
import '@/shared/css/global.css';
import { Inter } from 'next/font/google';
import { Providers } from '../providers';

const inter = Inter({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col lg:flex-row">
            <DesktopNavBar />
            <MobileNavBar />
            <div className="flex flex-col flex-1">
              <div className="flex-1 bg-void-10 p-6">{children}</div>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
