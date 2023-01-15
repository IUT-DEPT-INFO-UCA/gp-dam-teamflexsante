import { Provider as ReduxProvider } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'

import Layout from './Layout'
import { store } from './redux/store'
import './i18n/i18n'
import { theme } from './themes/themes'

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Layout />
      </ThemeProvider>
    </ReduxProvider>
  )
}

export default App
