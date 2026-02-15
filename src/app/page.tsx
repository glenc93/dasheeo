'use client';

import { Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeStore } from '@/store/themeStore';
import { DashboardGrid } from '@/components/DashboardGrid';

export default function Home() {
  const { mode, toggleMode } = useThemeStore();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
          Dasheeo
        </Typography>
        <IconButton onClick={toggleMode} color="inherit">
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
      <Container maxWidth={false}>
        <DashboardGrid />
      </Container>
    </Box>
  );
}
