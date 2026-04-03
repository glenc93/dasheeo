'use client';

import { useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useThemeStore } from '@/store/themeStore';
import { loadConfig } from '@/lib/configSync';

export function ConfigLoader({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    loadConfig().then((config) => {
      if (config && (config.widgets?.length > 0 || config.settings || config.theme)) {
        if (config.widgets?.length > 0) {
          useDashboardStore.getState().loadWidgets(config.widgets);
        }
        if (config.settings && Object.keys(config.settings).length > 0) {
          useSettingsStore.getState().loadSettings(config.settings);
        }
        if (config.theme?.mode) {
          useThemeStore.getState().loadTheme(config.theme.mode);
        }
      }
    }).catch((err) => console.error('Failed to load config:', err));
  }, []);

  return <>{children}</>;
}
