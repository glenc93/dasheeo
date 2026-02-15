'use client';

import { Card, CardContent, CardHeader, IconButton } from '@mui/material';
import { Close, DragIndicator } from '@mui/icons-material';
import { useDashboardStore, Widget } from '@/store/dashboardStore';

interface WidgetCardProps {
  widget: Widget;
}

export function WidgetCard({ widget }: WidgetCardProps) {
  const removeWidget = useDashboardStore((state) => state.removeWidget);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        avatar={
          <IconButton size="small" className="drag-handle" sx={{ cursor: 'move' }}>
            <DragIndicator />
          </IconButton>
        }
        action={
          <IconButton size="small" onClick={() => removeWidget(widget.id)}>
            <Close />
          </IconButton>
        }
        title={`Widget ${widget.type}`}
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <p>Widget ID: {widget.id}</p>
        <p>Type: {widget.type}</p>
      </CardContent>
    </Card>
  );
}
