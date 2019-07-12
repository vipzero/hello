import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import * as React from 'react'
import ReactDOM from 'react-dom'
import theme from './theme'

import App from './containers/App'
import * as serviceWorker from './serviceWorker'

// import { thunkWorld } from './containers/ScreensContainer/logic'

import { GlobalStyle } from './config/init'

// store.dispatch(thunkWorld())
const rootEl = document.getElementById('root')

if (rootEl !== null) {
	ReactDOM.render(
		<>
			<CssBaseline />
			<GlobalStyle />
			<MuiThemeProvider theme={theme}>
				<App />
			</MuiThemeProvider>
		</>,

		rootEl,
	)
	serviceWorker.unregister()
}
