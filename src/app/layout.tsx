import type { Metadata } from 'next';
import { Providers } from '@/lib/Providers';

export const metadata: Metadata = {
  title: 'Dasheeo - Homelab Dashboard',
  description: 'Personal customizable dashboard for homelab',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
