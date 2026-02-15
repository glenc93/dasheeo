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
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useSettingsStore } from '@/store/settingsStore';
import { useThemeStore } from '@/store/themeStore';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

export default function SettingsPage() {
  const router = useRouter();
  const { pageTitle, setPageTitle, resetSettings } = useSettingsStore();
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
            sx={{ mb: 3 }}
          />
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
