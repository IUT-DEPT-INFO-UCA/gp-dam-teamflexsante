import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      light: '#81f5ff',
      main: '#45c2dd',
      dark: '#0091ab',
      contrastText: '#000'
    },
    secondary: {
      light: '#506d84',
      main: '#244257',
      dark: '#001b2e',
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
