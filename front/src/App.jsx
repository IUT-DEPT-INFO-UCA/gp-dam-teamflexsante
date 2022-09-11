import { Provider as ReduxProvider } from 'react-redux'

import Layout from './Layout'
import { store } from './redux/store'
import './i18n/i18n'

function App() {
  return (
    <ReduxProvider store={store}>
      <Layout />
    </ReduxProvider>
  )
}

export default App
