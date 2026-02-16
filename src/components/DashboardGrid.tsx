'use client';

import { useDashboardStore } from '@/store/dashboardStore';
import { useSettingsStore } from '@/store/settingsStore';
import { Box } from '@mui/material';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { WidgetCard } from './WidgetCard';
import { useEffect, useRef, useState } from 'react';

export function DashboardGrid() {
  const { widgets, updateLayout } = useDashboardStore();
  const { gridCols, gridRowHeight } = useSettingsStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleLayoutChange = (layout: any[]) => {
    const updatedWidgets = widgets.map((widget) => {
      const layoutItem = layout.find((l) => l.i === widget.id);
      return layoutItem ? { ...widget, x: layoutItem.x, y: layoutItem.y, w: layoutItem.w, h: layoutItem.h } : widget;
    });
    updateLayout(updatedWidgets);
  };

  return (
    <Box ref={containerRef}>
      <GridLayout
        className="layout"
        layout={widgets.map((w) => ({ i: w.id, x: w.x, y: w.y, w: w.w, h: w.h }))}
        cols={gridCols}
        rowHeight={gridRowHeight}
        width={width}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".drag-handle"
      >
        {widgets.map((widget) => (
          <div key={widget.id}>
            <WidgetCard widget={widget} />
          </div>
        ))}
      </GridLayout>
    </Box>
  );
}
