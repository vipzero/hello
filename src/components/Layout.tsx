import * as React from 'react'

import Head from 'next/head'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import theme from '../theme'
import { GlobalStyle } from '../config/init'
import NavBar from './NavBar'

type Props = {
	title?: string
}

const Layout: React.FunctionComponent<Props> = ({
	children,
	title = 'This is the default title',
}) => (
	<div>
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
		<CssBaseline />
		<GlobalStyle />
		<MuiThemeProvider theme={theme}>
			<main>{children}</main>
			<footer>
				<NavBar />
			</footer>
		</MuiThemeProvider>
	</div>
)

export default Layout
