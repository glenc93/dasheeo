'use client';

import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  IconButton,
  Toolbar,
  Button,
  Stack,
  FormLabel,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { ArrowBack, ViewDay, ViewSidebar, ViewSidebarOutlined, LightMode, DarkMode, Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useSettingsStore } from '@/store/settingsStore';
import { useThemeStore } from '@/store/themeStore';
import { Footer } from '@/components/Footer';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

export default function SettingsPage() {
  const router = useRouter();
  const { pageTitle, layout, showFooter, gridCols, gridRowHeight, setPageTitle, setLayout, setShowFooter, setGridCols, setGridRowHeight, resetSettings } = useSettingsStore();
  const { mode, setMode } = useThemeStore();
  const { enqueueSnackbar } = useSnackbar();
  
  const [localTitle, setLocalTitle] = useState(pageTitle);
  const [localGridCols, setLocalGridCols] = useState(gridCols);
  const [localGridRowHeight, setLocalGridRowHeight] = useState(gridRowHeight);

  const handleSave = () => {
    setPageTitle(localTitle);
    setGridCols(localGridCols);
    setGridRowHeight(localGridRowHeight);
    enqueueSnackbar('Settings saved successfully', { variant: 'success' });
  };

  const handleRevert = () => {
    resetSettings();
    setMode('dark');
    setLocalTitle('Dasheeo');
    setLocalGridCols(14);
    setLocalGridRowHeight(100);
    enqueueSnackbar('Settings reverted to defaults', { variant: 'info' });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <IconButton onClick={() => router.push('/')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" component="h1">
          Settings
        </Typography>
      </Toolbar>
      <Container maxWidth="md" sx={{ flexGrow: 1 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            General Settings
          </Typography>
          <TextField
            label="Page Title"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            fullWidth
            sx={{ mb: 3 }}
          />
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Grid Settings
          </Typography>
          <TextField
            label="Grid Columns"
            type="number"
            value={localGridCols}
            onChange={(e) => setLocalGridCols(Number(e.target.value))}
            fullWidth
            inputProps={{ min: 6, max: 24 }}
            helperText="Number of columns (6-24)"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Row Height (px)"
            type="number"
            value={localGridRowHeight}
            onChange={(e) => setLocalGridRowHeight(Number(e.target.value))}
            fullWidth
            inputProps={{ min: 50, max: 300 }}
            helperText="Height of each row (50-300px)"
            sx={{ mb: 3 }}
          />
          <Box sx={{ mb: 3 }}>
            <FormLabel component="legend" sx={{ mb: 1 }}>
              Theme
            </FormLabel>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DarkMode />
              <Switch
                checked={mode === 'light'}
                onChange={(e) => setMode(e.target.checked ? 'light' : 'dark')}
              />
              <LightMode />
            </Box>
          </Box>
          <Box sx={{ mb: 3 }}>
            <FormLabel component="legend" sx={{ mb: 1 }}>
              Footer
            </FormLabel>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <VisibilityOff />
              <Switch
                checked={showFooter}
                onChange={(e) => setShowFooter(e.target.checked)}
              />
              <Visibility />
            </Box>
          </Box>
          <Box sx={{ mb: 3 }}>
            <FormLabel component="legend" sx={{ mb: 1 }}>
              Layout
            </FormLabel>
            <ToggleButtonGroup
              value={layout}
              exclusive
              onChange={(e, newLayout) => newLayout && setLayout(newLayout)}
              aria-label="layout"
            >
              <ToggleButton value="default" aria-label="default layout">
                <ViewDay sx={{ mr: 1 }} />
                Top Bar
              </ToggleButton>
              <ToggleButton value="sidebar-left" aria-label="sidebar left">
                <ViewSidebar sx={{ mr: 1 }} />
                Left
              </ToggleButton>
              <ToggleButton value="sidebar-right" aria-label="sidebar right">
                <ViewSidebarOutlined sx={{ mr: 1, transform: 'scaleX(-1)' }} />
                Right
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={handleRevert}>
              Revert to Defaults
            </Button>
          </Stack>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}
