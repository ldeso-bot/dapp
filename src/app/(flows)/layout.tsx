import '@/shared/css/globals.css';
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
          <div className="flex flex-row w-full h-screen justify-center bg-void-10 px-4 pt-10 pb-10 items-start lg:items-center">
            <div className="w-[38.2rem]">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
