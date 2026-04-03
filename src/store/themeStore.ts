import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { syncAllStores } from '@/lib/configSync';

interface ThemeStore {
  mode: 'light' | 'dark';
  toggleMode: () => void;
  setMode: (mode: 'light' | 'dark') => void;
  loadTheme: (mode: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeStore>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        mode: 'dark',
        toggleMode: () => set((state) => ({ mode: state.mode === 'dark' ? 'light' : 'dark' })),
        setMode: (mode) => set({ mode }),
        loadTheme: (mode) => set({ mode }),
      }),
      {
        name: 'theme-storage',
      }
    )
  )
);

if (typeof window !== 'undefined') {
  useThemeStore.subscribe(
    (state) => state.mode,
    () => syncAllStores()
  );
}
