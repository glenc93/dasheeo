import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#bd93f9',
    },
    secondary: {
      main: '#ff79c6',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: '#bd93f9',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#bd93f9',
          },
          '& .MuiFormHelperText-root': {
            color: '#bd93f9',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#bd93f9',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bd93f9',
    },
    secondary: {
      main: '#ff79c6',
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
            color: '#bd93f9',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#bd93f9',
          },
          '& .MuiFormHelperText-root': {
            color: '#bd93f9',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#bd93f9',
        },
      },
    },
  },
});
