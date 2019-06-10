import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import theme from './theme'

import App from './containers/App'
import * as serviceWorker from './serviceWorker'
import configureStore from './store'

// import { thunkWorld } from './containers/ScreensContainer/logic'

import { GlobalStyle } from './config/init'

const { store, persistor } = configureStore()
// store.dispatch(thunkWorld())
const rootEl = document.getElementById('root')

if (rootEl !== null) {
	ReactDOM.render(
		<Provider store={store}>
			<PersistGate loading={<h3>Loading</h3>} persistor={persistor}>
				<CssBaseline />
				<MuiThemeProvider theme={theme}>
					<App />
					<GlobalStyle />
				</MuiThemeProvider>
			</PersistGate>
		</Provider>,
		rootEl,
	)
	serviceWorker.unregister()
}
