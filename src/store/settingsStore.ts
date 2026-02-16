import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LayoutType = 'default' | 'sidebar-left' | 'sidebar-right';

interface SettingsStore {
  pageTitle: string;
  layout: LayoutType;
  showFooter: boolean;
  setPageTitle: (title: string) => void;
  setLayout: (layout: LayoutType) => void;
  setShowFooter: (show: boolean) => void;
  resetSettings: () => void;
}

const defaultSettings = {
  pageTitle: 'Dasheeo',
  layout: 'default' as LayoutType,
  showFooter: true,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,
      setPageTitle: (title) => set({ pageTitle: title }),
      setLayout: (layout) => set({ layout }),
      setShowFooter: (show) => set({ showFooter: show }),
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'settings-storage',
    }
  )
);
