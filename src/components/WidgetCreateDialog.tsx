'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import { useState } from 'react';

interface WidgetCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (widgetData: { name: string; type: string }) => void;
}

export function WidgetCreateDialog({ open, onClose, onCreate }: WidgetCreateDialogProps) {
  const [name, setName] = useState('');
  const [serviceType, setServiceType] = useState('');

  const handleCreate = () => {
    if (name && serviceType) {
      onCreate({ name, type: serviceType });
      setName('');
      setServiceType('');
      onClose();
    }
  };

  const handleClose = () => {
    setName('');
    setServiceType('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { bgcolor: 'background.paper' } }}>
      <DialogTitle>Add New Widget</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Widget Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            sx={{
              '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
              '& .MuiFormHelperText-root': { color: 'rgba(255, 255, 255, 0.7)' },
            }}
          />
          <TextField
            label="Service Type"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            fullWidth
            required
            helperText="e.g., plex, sonarr, radarr"
            sx={{
              '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
              '& .MuiFormHelperText-root': { color: 'rgba(255, 255, 255, 0.7)' },
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreate} variant="contained" disabled={!name || !serviceType}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
