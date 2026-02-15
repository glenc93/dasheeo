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
import { ArrowBack, ViewDay, ViewSidebar, ViewSidebarOutlined } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useSettingsStore } from '@/store/settingsStore';
import { useThemeStore } from '@/store/themeStore';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

export default function SettingsPage() {
  const router = useRouter();
  const { pageTitle, layout, setPageTitle, setLayout, resetSettings } = useSettingsStore();
  const { mode, setMode } = useThemeStore();
  const { enqueueSnackbar } = useSnackbar();
  
  const [localTitle, setLocalTitle] = useState(pageTitle);

  const handleSave = () => {
    setPageTitle(localTitle);
    enqueueSnackbar('Settings saved successfully', { variant: 'success' });
  };

  const handleRevert = () => {
    resetSettings();
    setMode('dark');
    setLocalTitle('Dasheeo');
    enqueueSnackbar('Settings reverted to defaults', { variant: 'info' });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <IconButton onClick={() => router.push('/')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" component="h1">
          Settings
        </Typography>
      </Toolbar>
      <Container maxWidth="md">
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
          <FormControlLabel
            control={
              <Switch
                checked={mode === 'light'}
                onChange={(e) => setMode(e.target.checked ? 'light' : 'dark')}
              />
            }
            label="Light Mode"
            sx={{ mb: 3, display: 'block' }}
          />
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
    </Box>
  );
}
