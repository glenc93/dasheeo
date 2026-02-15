import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { QueryProvider } from '@/lib/QueryProvider';
import { SnackbarProvider } from 'notistack';

export const metadata: Metadata = {
  title: 'Dasheeo - Homelab Dashboard',
  description: 'Personal customizable dashboard for homelab',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <QueryProvider>
            <ThemeProvider>
              <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
            </ThemeProvider>
          </QueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
