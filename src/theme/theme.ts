import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4b7bec',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#424242',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: 'rgba(0, 0, 0, 0.6)',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#4b7bec',
          },
          '& .MuiFormHelperText-root': {
            color: 'rgba(0, 0, 0, 0.6)',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.6)',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4b7bec',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#282a36',
      paper: '#44475a',
    },
    text: {
      primary: '#f8f8f2',
      secondary: '#6272a4',
    },
    error: {
      main: '#ff5555',
    },
    warning: {
      main: '#ffb86c',
    },
    info: {
      main: '#8be9fd',
    },
    success: {
      main: '#50fa7b',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: '#ffffff',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#ffffff',
          },
          '& .MuiFormHelperText-root': {
            color: '#ffffff',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
  },
});
