import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#f4eeff',
      dark: '#c1bccc',
      contrastText: '#000'
    },
    secondary: {
      light: '#6f73a3',
      main: '#424874',
      dark: '#162148',
      contrastText: '#FFF'
    },
    background: {
      default: '#F7f7f7'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h6: {
      fontWeight: 600
    }
  }
})
