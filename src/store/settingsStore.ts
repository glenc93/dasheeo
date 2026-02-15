import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LayoutType = 'default' | 'sidebar-left' | 'sidebar-right';

interface SettingsStore {
  pageTitle: string;
  layout: LayoutType;
  setPageTitle: (title: string) => void;
  setLayout: (layout: LayoutType) => void;
  resetSettings: () => void;
}

const defaultSettings = {
  pageTitle: 'Dasheeo',
  layout: 'default' as LayoutType,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,
      setPageTitle: (title) => set({ pageTitle: title }),
      setLayout: (layout) => set({ layout }),
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'settings-storage',
    }
  )
);
