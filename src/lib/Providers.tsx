'use client';

import { ThemeProvider } from '@/theme/ThemeProvider';
import { QueryProvider } from '@/lib/QueryProvider';
import { SnackbarProvider } from 'notistack';
import { ConfigLoader } from '@/components/ConfigLoader';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <SnackbarProvider maxSnack={3}>
          <ConfigLoader>{children}</ConfigLoader>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
