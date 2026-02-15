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
import { Widget } from '@/store/dashboardStore';

interface WidgetEditDialogProps {
  open: boolean;
  widget: Widget;
  onClose: () => void;
  onSave: (updates: Partial<Widget>) => void;
}

export function WidgetEditDialog({ open, widget, onClose, onSave }: WidgetEditDialogProps) {
  const [name, setName] = useState(widget.config?.name || '');
  const [serviceType, setServiceType] = useState(widget.type);

  const handleSave = () => {
    onSave({
      type: serviceType,
      config: {
        ...widget.config,
        name,
      },
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { bgcolor: 'background.paper' } }}>
      <DialogTitle>Edit Widget</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Widget Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
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
            helperText="e.g., plex, sonarr, radarr"
            sx={{
              '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
              '& .MuiFormHelperText-root': { color: 'rgba(255, 255, 255, 0.7)' },
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
