import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsStore {
  pageTitle: string;
  setPageTitle: (title: string) => void;
  resetSettings: () => void;
}

const defaultSettings = {
  pageTitle: 'Dasheeo',
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,
      setPageTitle: (title) => set({ pageTitle: title }),
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'settings-storage',
    }
  )
);
