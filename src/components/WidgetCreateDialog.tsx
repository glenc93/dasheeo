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
  onCreate: (widgetData: { name: string; type: string; apiUrl?: string; apiKey?: string }) => void;
}

export function WidgetCreateDialog({ open, onClose, onCreate }: WidgetCreateDialogProps) {
  const [name, setName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleCreate = () => {
    if (name && serviceType) {
      onCreate({ name, type: serviceType, apiUrl, apiKey });
      setName('');
      setServiceType('');
      setApiUrl('');
      setApiKey('');
      onClose();
    }
  };

  const handleClose = () => {
    setName('');
    setServiceType('');
    setApiUrl('');
    setApiKey('');
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
          <TextField
            label="API URL"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            fullWidth
            helperText="e.g., http://192.168.1.100:8989"
            sx={{
              '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
              '& .MuiFormHelperText-root': { color: 'rgba(255, 255, 255, 0.7)' },
            }}
          />
          <TextField
            label="API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            fullWidth
            type="password"
            helperText="Optional: API key or token"
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
