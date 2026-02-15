'use client';

import { Card, CardContent, CardHeader, IconButton, Chip, Box, CircularProgress } from '@mui/material';
import { Close, DragIndicator, Edit } from '@mui/icons-material';
import { useDashboardStore, Widget } from '@/store/dashboardStore';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import { WidgetEditDialog } from './WidgetEditDialog';

interface WidgetCardProps {
  widget: Widget;
}

export function WidgetCard({ widget }: WidgetCardProps) {
  const { removeWidget, updateWidget } = useDashboardStore();
  const [editOpen, setEditOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['widget-status', widget.id],
    queryFn: async () => {
      const response = await axios.get(`/api/proxy?service=${widget.type}`);
      return response.data;
    },
    refetchInterval: 30000,
    retry: 1,
  });

  const getStatusChip = () => {
    if (isLoading) {
      return <Chip label="Checking..." size="small" icon={<CircularProgress size={12} />} />;
    }
    if (isError) {
      return <Chip label="Offline" size="small" color="error" />;
    }
    return <Chip label="Online" size="small" color="success" />;
  };

  const handleSave = (updates: Partial<Widget>) => {
    updateWidget(widget.id, updates);
  };

  return (
    <>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pt: 2 }}>
          <IconButton size="small" className="drag-handle" sx={{ cursor: 'move' }}>
            <DragIndicator />
          </IconButton>
          <Box>
            <IconButton size="small" onClick={() => setEditOpen(true)}>
              <Edit />
            </IconButton>
            <IconButton size="small" onClick={() => removeWidget(widget.id)}>
              <Close />
            </IconButton>
          </Box>
        </Box>
        <CardHeader
          title={widget.config?.name || `${widget.type} Widget`}
          subheader={getStatusChip()}
          sx={{ pt: 1 }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Box>
            {isLoading && <p>Loading data...</p>}
            {isError && <p>Unable to connect to service</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
          </Box>
        </CardContent>
      </Card>
      <WidgetEditDialog
        open={editOpen}
        widget={widget}
        onClose={() => setEditOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}
