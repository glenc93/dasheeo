'use client';

import { useDashboardStore } from '@/store/dashboardStore';
import { Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { WidgetCard } from './WidgetCard';

export function DashboardGrid() {
  const { widgets, updateLayout, addWidget } = useDashboardStore();

  const handleLayoutChange = (layout: any[]) => {
    const updatedWidgets = widgets.map((widget) => {
      const layoutItem = layout.find((l) => l.i === widget.id);
      return layoutItem ? { ...widget, x: layoutItem.x, y: layoutItem.y, w: layoutItem.w, h: layoutItem.h } : widget;
    });
    updateLayout(updatedWidgets);
  };

  const handleAddWidget = () => {
    const newWidget = {
      id: `widget-${Date.now()}`,
      type: 'example',
      x: 0,
      y: Infinity,
      w: 4,
      h: 2,
    };
    addWidget(newWidget);
  };

  return (
    <Box>
      <Button startIcon={<Add />} variant="contained" onClick={handleAddWidget} sx={{ mb: 2 }}>
        Add Widget
      </Button>
      <GridLayout
        className="layout"
        layout={widgets.map((w) => ({ i: w.id, x: w.x, y: w.y, w: w.w, h: w.h }))}
        cols={12}
        rowHeight={100}
        width={1200}
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
