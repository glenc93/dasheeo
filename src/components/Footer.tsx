'use client';

import { Box, Typography } from '@mui/material';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        px: 2,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.default',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="#ffffff">
        © {new Date().getFullYear()} Dasheeo
      </Typography>
    </Box>
  );
}
