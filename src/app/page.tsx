'use client';

import { Box, Container, IconButton, Toolbar, Typography, Button, Drawer, List, ListItem } from '@mui/material';
import { Settings, Add, Menu } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useSettingsStore } from '@/store/settingsStore';
import { useDashboardStore } from '@/store/dashboardStore';
import { DashboardGrid } from '@/components/DashboardGrid';
import { Footer } from '@/components/Footer';
import { useState } from 'react';
import { WidgetCreateDialog } from '@/components/WidgetCreateDialog';

export default function Home() {
  const router = useRouter();
  const { pageTitle, layout, showFooter } = useSettingsStore();
  const addWidget = useDashboardStore((state) => state.addWidget);
  const [createOpen, setCreateOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleCreateWidget = (widgetData: { name: string; type: string; apiUrl?: string; apiKey?: string }) => {
    const newWidget = {
      id: `widget-${Date.now()}`,
      type: widgetData.type,
      x: 0,
      y: Infinity,
      w: 4,
      h: 2,
      config: {
        name: widgetData.name,
        apiUrl: widgetData.apiUrl,
        apiKey: widgetData.apiKey,
      },
    };
    addWidget(newWidget);
  };

  const sidebarContent = (
    <Box sx={{ width: 250, p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">
          {pageTitle}
        </Typography>
        <IconButton onClick={() => router.push('/settings')} color="inherit" size="small">
          <Settings />
        </IconButton>
      </Box>
      <List>
        <ListItem>
          <Button startIcon={<Add />} variant="contained" onClick={() => setCreateOpen(true)} fullWidth>
            Add Widget
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  if (layout === 'sidebar-left') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Drawer
            variant="permanent"
            sx={{
              width: 250,
              flexShrink: 0,
              '& .MuiDrawer-paper': { width: 250, boxSizing: 'border-box', bgcolor: 'background.paper' },
            }}
          >
            {sidebarContent}
          </Drawer>
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <DashboardGrid />
          </Box>
        </Box>
        {showFooter && <Footer />}
        <WidgetCreateDialog open={createOpen} onClose={() => setCreateOpen(false)} onCreate={handleCreateWidget} />
      </Box>
    );
  }

  if (layout === 'sidebar-right') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <DashboardGrid />
          </Box>
          <Drawer
            variant="permanent"
            anchor="right"
            sx={{
              width: 250,
              flexShrink: 0,
              '& .MuiDrawer-paper': { width: 250, boxSizing: 'border-box', bgcolor: 'background.paper' },
            }}
          >
            {sidebarContent}
          </Drawer>
        </Box>
        {showFooter && <Footer />}
        <WidgetCreateDialog open={createOpen} onClose={() => setCreateOpen(false)} onCreate={handleCreateWidget} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
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
      <Container maxWidth={false} sx={{ flexGrow: 1 }}>
        <DashboardGrid />
      </Container>
      {showFooter && <Footer />}
      <WidgetCreateDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateWidget}
      />
    </Box>
  );
}
