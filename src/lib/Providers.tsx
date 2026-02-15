'use client';

import { ThemeProvider } from '@/theme/ThemeProvider';
import { QueryProvider } from '@/lib/QueryProvider';
import { SnackbarProvider } from 'notistack';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
