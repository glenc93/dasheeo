import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { syncAllStores } from '@/lib/configSync';

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
  loadSettings: (settings: Partial<SettingsStore>) => void;
}

const defaultSettings = {
  pageTitle: 'Dasheeo',
  layout: 'default' as LayoutType,
  showFooter: true,
  gridCols: 14,
  gridRowHeight: 100,
};

export const useSettingsStore = create<SettingsStore>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        ...defaultSettings,
        setPageTitle: (title) => set({ pageTitle: title }),
        setLayout: (layout) => set({ layout }),
        setShowFooter: (show) => set({ showFooter: show }),
        setGridCols: (cols) => set({ gridCols: cols }),
        setGridRowHeight: (height) => set({ gridRowHeight: height }),
        resetSettings: () => set(defaultSettings),
        loadSettings: (settings) => set(settings),
      }),
      {
        name: 'settings-storage',
      }
    )
  )
);

if (typeof window !== 'undefined') {
  useSettingsStore.subscribe(
    (state) => ({ pageTitle: state.pageTitle, layout: state.layout, showFooter: state.showFooter, gridCols: state.gridCols, gridRowHeight: state.gridRowHeight }),
    () => syncAllStores()
  );
}
