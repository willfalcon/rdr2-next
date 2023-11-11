import Providers from '@/components/Providers';
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'RDR2 Checklist',
  description: `Keep track of materials you need, materials you've collected, who you've given them to, and what you've already crafted.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <Providers attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <div className="py-3">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
