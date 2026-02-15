import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: 'dark',
      toggleMode: () => set((state) => ({ mode: state.mode === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'theme-storage',
    }
  )
);
