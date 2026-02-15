import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
}

export const useDashboardStore = create<DashboardStore>()(
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
    }),
    {
      name: 'dashboard-storage',
    }
  )
);
