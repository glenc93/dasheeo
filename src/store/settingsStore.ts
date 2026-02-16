import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LayoutType = 'default' | 'sidebar-left' | 'sidebar-right';

interface SettingsStore {
  pageTitle: string;
  layout: LayoutType;
  showFooter: boolean;
  gridCols: number;
  gridRowHeight: number;
  setPageTitle: (title: string) => void;
  setLayout: (layout: LayoutType) => void;
  setShowFooter: (show: boolean) => void;
  setGridCols: (cols: number) => void;
  setGridRowHeight: (height: number) => void;
  resetSettings: () => void;
}

const defaultSettings = {
  pageTitle: 'Dasheeo',
  layout: 'default' as LayoutType,
  showFooter: true,
  gridCols: 14,
  gridRowHeight: 100,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,
      setPageTitle: (title) => set({ pageTitle: title }),
      setLayout: (layout) => set({ layout }),
      setShowFooter: (show) => set({ showFooter: show }),
      setGridCols: (cols) => set({ gridCols: cols }),
      setGridRowHeight: (height) => set({ gridRowHeight: height }),
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'settings-storage',
    }
  )
);
