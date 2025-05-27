import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { SwrProvider } from '@/providers/SwrProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PatchWrite - AI-Powered Writing Tool',
  description: 'An intelligent writing assistant that helps you create and edit content with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <AuthProvider>
          <SwrProvider>
            {children}
          </SwrProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 