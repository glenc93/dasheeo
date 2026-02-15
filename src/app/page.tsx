'use client';

import { Box, Container, IconButton, Toolbar, Typography, Button } from '@mui/material';
import { Settings, Add } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useSettingsStore } from '@/store/settingsStore';
import { useDashboardStore } from '@/store/dashboardStore';
import { DashboardGrid } from '@/components/DashboardGrid';
import { useState } from 'react';
import { WidgetCreateDialog } from '@/components/WidgetCreateDialog';

export default function Home() {
  const router = useRouter();
  const { pageTitle } = useSettingsStore();
  const addWidget = useDashboardStore((state) => state.addWidget);
  const [createOpen, setCreateOpen] = useState(false);

  const handleCreateWidget = (widgetData: { name: string; type: string }) => {
    const newWidget = {
      id: `widget-${Date.now()}`,
      type: widgetData.type,
      x: 0,
      y: Infinity,
      w: 4,
      h: 2,
      config: {
        name: widgetData.name,
      },
    };
    addWidget(newWidget);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
          {pageTitle}
        </Typography>
        <Button startIcon={<Add />} variant="contained" onClick={() => setCreateOpen(true)} sx={{ mr: 2 }}>
          Add Widget
        </Button>
        <IconButton onClick={() => router.push('/settings')} color="inherit">
          <Settings />
        </IconButton>
      </Toolbar>
      <Container maxWidth={false}>
        <DashboardGrid />
      </Container>
      <WidgetCreateDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateWidget}
      />
    </Box>
  );
}
