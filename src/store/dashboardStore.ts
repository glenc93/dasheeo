import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { syncAllStores } from '@/lib/configSync';

export interface Widget {
  id: string;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
  config?: Record<string, any>;
}

interface DashboardStore {
  widgets: Widget[];
  addWidget: (widget: Widget) => void;
  removeWidget: (id: string) => void;
  updateWidget: (id: string, updates: Partial<Widget>) => void;
  updateLayout: (widgets: Widget[]) => void;
  loadWidgets: (widgets: Widget[]) => void;
}

export const useDashboardStore = create<DashboardStore>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        widgets: [],
        addWidget: (widget) => set((state) => ({ widgets: [...state.widgets, widget] })),
        removeWidget: (id) => set((state) => ({ widgets: state.widgets.filter((w) => w.id !== id) })),
        updateWidget: (id, updates) =>
          set((state) => ({
            widgets: state.widgets.map((w) => (w.id === id ? { ...w, ...updates } : w)),
          })),
        updateLayout: (widgets) => set({ widgets }),
        loadWidgets: (widgets) => set({ widgets }),
      }),
      {
        name: 'dashboard-storage',
      }
    )
  )
);

if (typeof window !== 'undefined') {
  useDashboardStore.subscribe(
    (state) => state.widgets,
    () => syncAllStores()
  );
}
