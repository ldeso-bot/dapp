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
          <div className="flex flex-row w-full h-screen justify-center items-center bg-void-10">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
